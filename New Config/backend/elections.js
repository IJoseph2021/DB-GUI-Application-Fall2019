
mysqlconnection = require('./oursql.js');

exports.getElectionsInCities = function(req,res){
    mysqlconnection.query(`SELECT location FROM ELECTIONS WHERE level = 'city';`, function(err,rows,fields){
        res.send(rows);
    })
}

exports.returnElectionInfo = function(req,res){
    electionId = req.params.electionId
    mysqlconnection.query(`SELECT fname, lname, partyCode, bio 
    FROM ELECTION_CANDIDATES
    JOIN CANDIDATE
    ON ELECTION_CANDIDATES.userId = CANDIDATE.userId
    JOIN USER
    ON CANDIDATE.userId = USER.id 
    WHERE ELECTION_CANDIDATES.electionId = ${req.params.electionId};`,function(err,rows,fields){
        if(err){
            res.send(404);
        } else {
            res.send(rows);
        }
    })
}

exports.getElectionLocation = function(req,res){
    electionId = req.params.electionId
    mysqlconnection.query(`SELECT location 
    FROM ELECTIONS
    WHERE ELECTIONS.electionId = ${req.params.electionId};`,function(err,rows,fields){
        if(err){
            res.send(404);
        } else {
            res.send(rows);
        }
    })
}

exports.getElectionsByCandidate = function(req,res){
    userId =  req.params.userId
    mysqlconnection.query(`SELECT electionId 
    FROM ELECTION_CANDIDATES
    WHERE userId = ${req.params.userId};`,function(err,rows,fields){
        if(err){
            res.send(404);
        } else {
            res.send(rows);
        }
    })
}