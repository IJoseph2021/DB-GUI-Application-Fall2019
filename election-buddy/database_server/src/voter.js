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