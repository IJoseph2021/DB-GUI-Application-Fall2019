//This package is to handle all logins for the application

const mysqlConnection = require('./oursql.js');


exports.setSessionCreater = function(session){
    sessionCreater = session;
}

exports.setApp = function(newApp){
    app = newApp;
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
                    res.send("<p1> account already exists");
                    }
                else {
                    res.send("<p1> account made <\p1>");
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
                        req.session.user = user;
                        req.session.userId = rows[0].ID;
                        req.session.isLoggedIn = true;
                        res.send("<p1> login successful <\p1>");
                    }
                    else res.send("<p1> login unsuccessful <\p1>");
                }
            });

}



//Steve
//Gets the user
exports.getEmail = function(req,res){
    mysqlConnection.query("SELECT USER.EMAIL FROM USER WHERE USER.username = \'" + req.params.user + "\';",
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

//Steve
//gets the session user id
exports.getSessionUserId = function(req,res){
    console.log(req.session.userId);
    res.send(req.session.userId);
}

//Skyler
//Get user Info
exports.getUserInfo = function (req, res) {
    mysqlConnection.query("SELECT * FROM USER WHERE USER.username = \'" + req.params.user+ "\';",
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
    userID = req.params.ID;
    console.log(`SELECT USER.username FROM USER WHERE USER.ID = '${userID}';`);
    mysqlConnection.query(`SELECT USER.username FROM USER WHERE USER.ID = '${userID}';`,
        function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send("username not found");
            }
            
        });
}

//Baohua Yu
//get fname
exports.getFname = function (req, res) {
    userID = req.params.ID;
    console.log(`SELECT USER.fname FROM USER WHERE USER.ID = '${userID}';`);
    mysqlConnection.query(`SELECT USER.fname FROM USER WHERE USER.ID = '${userID}';`,
        function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send("fname not found");
            }

        });
}     

//Baohua Yu
//get lname
exports.getLname = function (req, res) {
    userID = req.params.ID;
    console.log(`SELECT USER.lname FROM USER WHERE USER.ID = '${userID}';`);
    mysqlConnection.query(`SELECT USER.lname FROM USER WHERE USER.ID = '${userID}';`,
        function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send("lname not found");
            }

        });
}
 

//Baohua Yu
//get password
exports.getPassword = function (req, res) {
    userID = req.params.ID;
    console.log(`SELECT USER.passhash FROM USER WHERE USER.ID = '${userID}';`);
    mysqlConnection.query(`SELECT USER.passhash FROM USER WHERE USER.ID = '${userID}';`,
        function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send("password not found");
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

    mysqlConnection.query("UPDATE USER SET USER.email = \'" + req.params.email + "\'  WHERE USER.username = \'" + req.params.user + "\';",
        function (err, rows, fields) {
            if (err) {
                logger.error(err.message);
            }
        });

    res.send("Email Updated");

}


//Steve Shoemaker
//Changes the password
exports.changePassword = function(req,res){
    mysqlConnection.query(`UPDATE USER SET passhash = '${req.params.newPass}' WHERE ID = '${req.session.userId}';`,function(err,rows,fields){
        if(err){
            res.send("error");
        } else {
            res.send("password updated");
        }
    });
}

//Baohua Yu
//changes the fname
exports.changeFname = function (req, res) {
    mysqlConnection.query("UPDATE USER SET USER.fname = \'" + req.params.fname + "\'  WHERE USER.username = \'" + req.session.userId + "\';", function (err, rows, fields) {
        if (err) {
            res.send("error");
        } else {
            res.send("fname update");
        }

    });
}

//Baohua Yu
//change the lname
exports.changeLname = function (req, res) {
    mysqlConnection.query("UPDATE USER SET USER.lname = \'" + req.params.lname + "\'  WHERE USER.username = \'" + req.session.userId + "\';", function (err, rows, fields) {
        if (err) {
            res.send("error");
        } else {
            res.send("lname update");
        }
    });
}

//Stephen Shoemaker
//change Lname without session
exports.updateLName = function (req, res) {
    mysqlConnection.query("UPDATE USER SET USER.lname = \'" + req.params.lname + "\'  WHERE USER.username = \'" + req.params.user + "\';", function (err, rows, fields) {
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
    mysqlConnection.query("UPDATE USER SET USER.lname = \'" + req.params.fname + "\'  WHERE USER.username = \'" + req.params.user + "\';", function (err, rows, fields) {
        if (err) {
            res.send(404);
        } else {
            res.send(200);
        }
    });
}

exports.getRoles = function(req,res){
    //res.json(null);
    mysqlConnection.query(`SELECT * FROM VOTER WHERE userID = '${req.params.user}';`,function(err,rows,fields){
        if(rows.length != 0){
            res.json({voter : 'true'});
        }
    });
    mysqlConnection.query(`SELECT * FROM CANDIDATE WHERE userID = '${req.params.user}';`,function(err,rows,fields){
        if(rows.length != 0){
            res.json({candidate : 'true'});
        }
    });
    mysqlConnection.query(`SELECT * FROM ADMIN WHERE userID = '${req.params.user}';`,function(err,rows,fields){
        if(rows.length != 0){
            res.json({admin : 'true'});
        }
    });
    
}
