var mysqlConnection;

exports.createConnection = function(newMysqlConnection){
    mysqlConnection = newMysqlConnection;
};

exports.setVoter = function(req,res){
    userID = req.session.userId;
    console.log(`SELECT USER.ID FROM USER WHERE ID = '${userID}';`);
    mysqlConnection.query(`SELECT USER.ID FROM USER WHERE ID = '${userID}';`,
                            function(OuterErr,OuterRows,OuterFields){
                                if(!OuterErr){
                                    console.log('Yo');
                                    console.log(`INSERT INTO VOTER(USERID) VALUES('${userID}');`);
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

exports.updateCitySession = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`UPDATE VOTER SET city = '${req.params.city}' WHERE userID = '${req.session.userId}';`, function(err,rows,fields){
        if(err) console.log(err.message);
    })
    res.send('update Attempted');
}

exports.getCitySession = function(req,res){
    userID = req.session.userId;
    console.log(`SELECT CITY FROM VOTER WHERE userID = '${userID}';`);
    mysqlConnection.query(`SELECT CITY FROM VOTER WHERE userID = '${userID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].CITY);
        } else {
            res.send("City not found");
        }
    });
}


exports.updateCountySession = function(req,res){
    userID = req.session.userId;
    console.log(`UPDATE VOTER SET County = '${req.params.County}' WHERE userID = '${req.session.userId}';`);
    mysqlConnection.query(`UPDATE VOTER SET County = '${req.params.county}' WHERE userID = '${req.session.userId}';`, function(err,rows,fields){
      if(err) console.log(err.message);
    })
    res.send('update Attempted');
}

exports.updateZipCodeSession = function(req,res){
    userID = req.session.userID;
    mysqlConnection.query(`UPDATE VOTER SET zipCode = '${req.params.zipCode}' WHERE userID = '${req.session.userId}';`, function(err,rows,fields){

        if(err) console.log(err.message);
    })
    res.send('update Attempted');
}


exports.getCountySession = function(req,res){
    userID = req.session.userId;
    console.log(`SELECT COUNTY FROM VOTER WHERE userID = '${userID}';`);
    mysqlConnection.query(`SELECT COUNTY FROM VOTER WHERE userID = '${userID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].County);
        } else {
            res.send("City not found");
        }
    });
}

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