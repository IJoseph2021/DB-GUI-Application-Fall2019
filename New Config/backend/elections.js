
mysqlconnection = require('./oursql.js');

exports.getElectionsInCities = function(req,res){
    mysqlconnection.query(`SELECT location FROM ELECTIONS WHERE level = 'city';`, function(err,rows,fields){
        res.send(rows);
    })
}

exports.returnElectionInfo = function(req,red){
    electionId = req.params.electionId
    mysqlConnection.query(`SELECT * 
    FROM USER 
    JOIN ELECTION_CANDIDATES 
    ON ELECTIONS.electionId = ELECTION_CANDIDATES.electionId  
    JOIN CANDIDATE
    ON ELECTION_CANDIDATES.electionId = CANDIDATE.userId
    JOIN USER
    ON CANDIDATE.userId = USER.id
    WHERE USER.id = ${req.params.electionId};`,function(err,rows,fields){
        if(err){
            res.send(404);
        } else {
            res.send(rows);
        }
    })
}