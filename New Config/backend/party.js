var mysqlConnection;

exports.createConnection = function(newMysqlConnection){
    mysqlConnection = newMysqlConnection;
};

exports.createParty = function(req,res){
    mysqlConnection.query(`INSERT INTO PARTY(partyName) VALUE('${req.params.party}');`);
}

exports.getPartyName = function(req,res){
    req.lastPartyCode = req.params.partyCode;
    mysqlConnection.query(`SELECT partyName FROM PARTY WHERE partyCode = '${req.params.partyCode}'`,function(err,rows,fields){
        if(err){console.log(err.message)};
        if(rows.length == undefined){
            res.send('Not Found');
        } else {
            res.send(rows[0].partyName);
        }
    });
};

exports.getPartyCode = function(req,res){
    mysqlConnection.query(`SELECT partyCode FROM PARTY WHERE partyName = '${req.params.partyName}'`,function(err,rows,fields){
        if(err){console.log(err.message)};
        if(rows.length == undefined){
            res.send('Not Found');
        } else {
            res.send(`<p1> ${rows[0].partyCode} <\p1>`);
            req.session.lastPartyCode = rows[0].partyCode;
            
        }
    });
};