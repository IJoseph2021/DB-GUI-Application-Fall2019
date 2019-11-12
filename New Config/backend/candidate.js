/*
This file stores all the candidate routes
*/
var mysqlConnection;

exports.createConnection = function(newConnect){
    mysqlConnection = newConnect;
}

//Steve
//This function adds a user to the candidate table
exports.becomeCandidate = function(req,res){
    mysqlConnection.query(`INSERT INTO CANDIDATE(USERID) VALUES(${req.session.userId})`,function(err,rows,fields){
        if(err){
            res.send("err");
        } else {
            res.send("candidate updated");
        }
    });
}

exports.getCandidateList = function(req,res){
    partyCode = req.params.partyCode;

    console.log(`SELECT USER.fname, USER.lname FROM USER INNER JOIN CANDIDATE ON USER.ID = CANDIDATE.userID WHERE partyCode = '${partyCode}';`);
    mysqlConnection.query(`SELECT USER.fname, USER.lname FROM USER INNER JOIN CANDIDATE ON USER.ID = CANDIDATE.userID WHERE partyCode = '${partyCode}';`, function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows);
        }
        else{
            res.send("no candidates found with that party");
        }
    });
    
}