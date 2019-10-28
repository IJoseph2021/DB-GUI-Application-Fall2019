//This package is to handle all logins for the application

//storing the mysql query
var mysqlConnection;

//Linking the mysql connection
exports.createConnection = function(newMysqlConnection){
    mysqlConnection = newMysqlConnection;
};

//Creating an account function
exports.createAccount = function(req,res){
    
    //getting the paramaters
    user = req.params.user;
    fname = req.params.fname;
    lname = req.params.lname;
    pass = req.params.pass;
    email = req.params.email;

    //Making sure were using the right database
    mysqlConnection.query('USE ELECTIONBUDDY;', function(err, rows, fields){});

    //Inseting the account into the db
    query = "INSERT INTO electionBuddy.USER (username,fname,lname,passhash,email)"+ 
    " VALUES(\"" +  user + "\",\"" +fname + "\",\"" + lname + "\",\"" + pass + "\",\"" + email + "\");";
    

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
                if(rows.length == 0)
                    res.send("<p1> login unsuccessful <\p1>");
                //If something was returned, login was successful
                else
                    res.send("<p1> login successful <\p1>");
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