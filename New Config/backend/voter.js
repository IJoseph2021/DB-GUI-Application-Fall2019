/*
Voter File
This file manages all the routes for the voters
*/

var mysqlConnection;

exports.createConnection = function(newMysqlConnection){
    mysqlConnection = newMysqlConnection;
};

//Steve Shoemaker
//This function makes someone a voter
exports.setVoter = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`SELECT USER.ID FROM USER WHERE ID = '${userID}';`,
                            function(OuterErr,OuterRows,OuterFields){
                                if(!OuterErr){
                                    mysqlConnection.query(`INSERT INTO VOTER(USERID) VALUES('${userID}');`,function(err,rows,fields){
                                        if(err){
                                            console.log(err.message);
                                        }
                                    });
                                }else{
                                    console.log(OuterErr.message);
                                }
                            });
    res.send("Voter Attempted");
}

//Steve Shoemaker
//Updates the city of the session voter
exports.updateCitySession = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`UPDATE VOTER SET city = '${req.params.city}' WHERE userID = '${req.session.userId}';`, function(err,rows,fields){
        if(err) console.log(err.message);
    })
    res.send('update Attempted');
}

//Steve Shoemaker
//Gets the city of the current user
exports.getCitySession = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`SELECT CITY FROM VOTER WHERE userID = '${userID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].CITY);
        } else {
            res.send("City not found");
        }
    });
}

//Steve Shoemaker
//Updates the county of the current user
exports.updateCountySession = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`UPDATE VOTER SET County = '${req.params.county}' WHERE userID = '${req.session.userId}';`, function(err,rows,fields){
      if(err) console.log(err.message);
    })
    res.send('update Attempted');
}

//Written by Parker-- please check and see if correct
exports.updateZipCodeSession = function(req,res){
    userID = req.session.userID;
    mysqlConnection.query(`UPDATE VOTER SET zipCode = '${req.params.zipCode}' WHERE userID = '${req.session.userId}';`, function(err,rows,fields){

        if(err) console.log(err.message);
    })
    res.send('update Attempted');
}

//Steve Shoemaker
//Gets the county of the current user
exports.getCountySession = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`SELECT COUNTY FROM VOTER WHERE userID = '${userID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].County);
        } else {
            res.send("City not found");
        }
    });
}

//Stephen Shoemaker
//This route updates the party of the voter
exports.sessionUpdateParty = function(req,res){
    userID = req.session.userId;
    
    mysqlConnection.query(`SELECT partyCode FROM PARTY WHERE partyName = '${req.params.partyName}'`,function(err,rows,fields){
        if(err){console.log("finding party name: " + err.message)};
        if(rows.length == undefined || rows[0] == undefined){
            res.send('Party Not Found');
        } else {
            mysqlConnection.query(`UPDATE VOTER SET partyCode = '${rows[0].partyCode}' WHERE userID = '${userID}';`, function(innerErr,innerRows,innerFields){
                if(innerErr) console.log(innerErr.message);
                else res.send('Party Updated');
            });
            
        }
    });
}

//Steve Shoemaker
//Get Zip code of the current user
exports.getZipCodeSession = function(req,res){
    userID = req.session.userId;
    console.log(`SELECT zipCode FROM VOTER WHERE userID = '${userID}';`);
    mysqlConnection.query(`SELECT zipCode FROM VOTER WHERE userID = '${userID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].zipCode);
        } else {
            res.send("zipCode not found");
        }
    });

}