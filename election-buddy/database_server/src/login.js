//This package is to handle all logins for the application

//storing the mysql query
var mysqlConnection;
var sessionCreater;
//Linking the mysql connection
exports.createConnection = function(newMysqlConnection){
    mysqlConnection = newMysqlConnection;
    
};

exports.setSessionCreater = function(session){
    sessionCreater = session;
}

exports.setApp = function(newApp){
    app = newApp;
}
//Creating an account function
exports.createAccount = function(req,res){
    
    //getting the paramaters
    user = req.params.user;
    fname = req.params.fname;
    lname = req.params.lname;
    pass = req.params.pass;
    email = req.params.email;

    //Making sure were using the right database
    //mysqlConnection.query('USE ELECTIONBUDDY;', function(err, rows, fields){});

    //Inseting the account into the db
    query = "INSERT INTO electionBuddy.USER (username,fname,lname,passhash,email)"+ 
    " VALUES(\"" +  user + "\",\"" +fname + "\",\"" + lname + "\",\"" + pass + "\",\"" + email + "\");";
    
    console.log(query);
    mysqlConnection.query(query, 
            function(err,rows,fields){
                if(err){
                    res.send("<p1> account already exists");
                    }
                else {
                    res.send("<p1> account made <\p1>");
                }
            });
        } 


exports.login = function(req,res){
    
    //assigning the values
    user = req.params.user;
    pass = req.params.pass;

    //Generating the query
    query = "SELECT ID FROM USER WHERE USER.username = \'" + user + "\'" +
            "AND USER.passhash = \"" +pass + "\";";
    
    //sending the query
    mysqlConnection.query(query,
            function(err,rows,fields){
                //If nothing is returned, login was unsuccessful
                if(err)
                    res.send("<p1> login unsuccessful <\p1>");
                //If something was returned, login was successful
                else{
                    
                    if(rows.length == 1){
                        req.session.user = user;
                        req.session.userId = rows[0].ID;
                        req.session.isLoggedIn = true;
                        req.session.adminLevel = getAdminLevel(req.session.userId);
                        
                        res.send("<p1> login successful <\p1>");
                    } 
                    else res.send("<p1> login unsuccessful <\p1>");
                }
            });
    
}

const getAdminLevel = function(userID){
    console.log(`SELECT adminLevel FROM ADMIN WHERE userID = '${userID};'`);
    mysqlConnection.query(`SELECT adminLevel FROM ADMIN WHERE userID = '${userID};'` ,function(iErr,iRow, iFields){
        if(!iErr){
            if(iRow == undefined || iRow[0] == undefined){
                return 0;
            }
            else{
                console.log(iRow[0].adminLevel);
                return iRow[0].adminLevel;
            }
        }
    });
}

exports.updateEmail = function(req,res){
    
    mysqlConnection.query("UPDATE USER SET USER.email = \'" + req.params.email + "\'  WHERE USER.username = \'" +  req.params.user + "\';",
        function(err,rows, fields){
            if(err){
                logger.error(err.message);
            }
        });

    res.send("Email Updated");

}

exports.getEmail = function(req,res){
    mysqlConnection.query("SELECT USER.EMAIL FROM USER WHERE USER.username = \'" + req.params.user + "\';",
                function(err, rows, fields){
                    if(err){
                        logger.error(err.message);
                    }
                    res.send(rows[0]);
                });
}

exports.getUserID = function(req,res){
    query = 'SELECT USER.USERID FROM USER WHERE USER.username = \'' + req.params.user + '\';';
    console.log(query);
    mysqlConnection.query('USE electionBuddy;', 
                    function(err,rows,fields){});
    mysqlConnection.query('SELECT USER.ID FROM USER WHERE USER.username = \'' + req.params.user + '\';',
                            function(err,rows,fields){
                                if(!err){
                                    if(rows[0]!= undefined){
                                        res.send(rows[0]);
                                    }
                                    else{
                                        res.send("<p1> Not Found </p1>")
                                    }
                                }
                                else{
                                    res.send("<p1>Not Found <p1>");
                                }
                            });
}

exports.getSessionUserId = function(req,res){
    console.log(req.session.userId);
    res.send(req.session.userId);
}

exports.isLoggedIn = function(req,res,next){
    if(req.session.isLoggedIn == true){
        return next();
    } else {
        res.sendStatus(401);
    }
}