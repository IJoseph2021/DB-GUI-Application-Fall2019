//This package is to handle all logins for the application

const mysqlConnection = require('./oursql.js');


exports.setSessionCreater = function(session){
    sessionCreater = session;
}

exports.setApp = function(newApp){
    app = newApp;
}


exports.getIDOnUsername = function(username){
    mysqlConnection.query(`SELECT ID FROM electionBuddy.USER WHERE username = '${username}';`, function(err,rows,fields){
        return rows[0];
    })
}

//Steve
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
                    res.send(404);
                    }
                else {
                    res.send(200);
                }
            });
        }

//Steve
//login function
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
                                res.send("<p1> login successful <\p1>");
                            }
                            else res.send("<p1> login unsuccessful <\p1>");
                        }
                    });

}



//Steve
//Gets the user
exports.getEmail = function(req,res){
    mysqlConnection.query("SELECT USER.EMAIL FROM USER WHERE USER.id = \'" + req.params.user + "\';",
                function(err, rows, fields){
                    if(err){
                        logger.error(err.message);
                    }
                    res.send(rows[0]);
                });
}

//Steve
//Gets the current user id
exports.getUserID = function(req,res){
    query = 'SELECT USER.id FROM USER WHERE USER.username = \'' + req.params.user + '\';';
    console.log(query);
    mysqlConnection.query('USE electionBuddy;',
                    function(err,rows,fields){});
    mysqlConnection.query('SELECT USER.ID FROM USER WHERE USER.username = \'' + req.params.user + '\';',
                            function(err,rows,fields){
                        if(err)
                        res.send(404);
                        //If something was returned, getUserID
                        else{
                            if(rows.length == 1){
                                res.status(200).json({userId: rows[0].ID})
                            }
                            else res.send(404);
                        }
                    });
}

//Skyler
//Get user Info
exports.getUserInfo = function (req, res) {
    mysqlConnection.query("SELECT * FROM USER WHERE USER.id = \'" + req.params.user+ "\';",
        function (err, rows, fields) {
            if (rows[0] == undefined) {
                logger.error(err.message);
            }
            res.send(rows);
        });
}

//Baohua Yu
// get username
exports.getUsername = function (req, res) {
    id = req.params.ID;
    mysqlConnection.query(`SELECT USER.username FROM USER WHERE USER.id = '${id}';`,
        function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send(404);
            }
            
        });
}

//Baohua Yu
//get fname
exports.getFname = function (req, res) {
    id = req.params.ID;
    mysqlConnection.query(`SELECT USER.fname FROM USER WHERE USER.ID = '${id}';`,
        function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send(404);
            }

        });
}     

//Baohua Yu
//get lname
exports.getLname = function (req, res) {
    id = req.params.ID;
    mysqlConnection.query(`SELECT USER.lname FROM USER WHERE USER.id = '${id}';`,
        function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send(404);
            }

        });
}
 

//Baohua Yu
//get password
exports.getPassword = function (req, res) {
    id = req.params.ID;
    mysqlConnection.query(`SELECT USER.passhash FROM USER WHERE USER.ID = '${id}';`,
        function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send(404);
            }

        });
}   

//Stephen Shoemaker
//Checks the session to see if the person is logged in
exports.isLoggedIn = function(req,res,next){
    if(req.session.isLoggedIn == true){
        return next();
    } else {
        res.sendStatus(401);
    }
}

//Steve Shoemaker
//Update email in user table route
exports.updateEmail = function (req, res) {

    mysqlConnection.query("UPDATE USER SET USER.email = \'" + req.params.email + "\'  WHERE USER.id = \'" + req.params.user + "\';",
        function (err, rows, fields) {
            if (err) {
                logger.error(err.message);
            }
        });

    res.send(200);
}


//Steve Shoemaker
//Changes the password
exports.changePassword = function(req,res){
    mysqlConnection.query(`UPDATE USER SET passhash = '${req.params.newpass}' WHERE USER.id = '${req.params.user}';`,function(err,rows,fields){
        if(err){
            res.send(404);
        } else {
            res.send(200);
        }
    });
}





//Stephen Shoemaker
//change Lname without session
exports.updateLName = function (req, res) {
    mysqlConnection.query("UPDATE USER SET USER.lname = \'" + req.params.lname + "\'  WHERE USER.id = \'" + req.params.user + "\';", function (err, rows, fields) {
        if (err) {
            res.send(404);
        } else {
            res.send(200);
        }
    });
}


//Stephen Shoemaker
//change Fname without session
exports.updateFName = function (req, res) {
    mysqlConnection.query("UPDATE USER SET USER.fname = \'" + req.params.fname + "\'  WHERE USER.id = \'" + req.params.user + "\';", function (err, rows, fields) {
        if (err) {
            res.send(404);
        } else {
            res.send(200);
        }
    });
}

exports.getRoles = function(req,res){
    
    response = {};

    var updateResponse = function(variable, value){
        response[variable] = value;
    }

    mysqlConnection.query(`SELECT * FROM VOTER WHERE userID = '${req.params.user}';`,function(err,rows,fields){
        if(rows != undefined && rows.length != 0){
            updateResponse("voter", true);
        }
        mysqlConnection.query(`SELECT * FROM CANDIDATE WHERE userID = '${req.params.user}';`,function(err,rows,fields){
            if(rows != undefined && rows.length != 0){
                updateResponse("candidate", true);
            }
            mysqlConnection.query(`SELECT * FROM ADMIN WHERE userID = '${req.params.user}';`,function(err,rows,fields){
                if(rows != undefined && rows.length != 0){
                    updateResponse("admin", true);
                    
                }
                
                res.send(response);
            });
        });
    });
    
    
    
}
