/*
Functions for party routes

*/

var mysqlConnection;

exports.createConnection = function(newMysqlConnection){
    mysqlConnection = newMysqlConnection;
};

//Steve Shoemaker
//Creates a party
exports.createParty = function(req,res){
    mysqlConnection.query(`INSERT INTO PARTY(partyName) VALUE('${req.params.party}');`);
}

//Steve Shoemaker
//Gets the party name based on the party code
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

//Steve Shoemaker
//Gets the party code based on a party name
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

//Isaac Joseph
exports.createPartyAndCode = function(req,res){
    partyCode = req.params.partyCode;
    partyName = req.params.partyName;
    query = "INSERT INTO PARTY (partyCode, partyName) VALUES (\"" + partyCode + "\",\"" + partyName + "\");";
    console.log(query);
    mysqlConnection.query(query, 
        function(err,rows,fields){
            if(err){
                res.send("Question Creation Failed");
                }
            else {
                res.send("Question Created");
            }
        });
}