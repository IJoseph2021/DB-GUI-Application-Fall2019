var mysqlConnection;

exports.setConnection = function(newConnect){
    mysqlConnection = newConnect;
}


exports.becomeCandidate = function(req,res){
    mysqlConnection.query(`INSERT INTO CANDIDATE(USERID) VALUES(${req.session.userId})`,function(err,rows,fields){
        if(err){
            res.send("err");
        } else {
            res.send("candidate updated");
        }
    });
}

exports.getcandidateFavorite = function (req, res) {
    mysqlConnection.query(`SELECT candidateID FROM CANDIDATE_FAVORITE WHERE userID = '${req.params.userId}'`,function (err, rows, fields) {
        if (err) {
            res.send("Not Found");
        } else {
            res.send("candidate favorite found");
        }
    });
}

exports.updateCandidateFavorite = function (req, res) {
    mysqlConnection.query(`UPDATE CANDIDATE_FAVORITE SET candidateID = '${req.params.candidateID}' WHERE userID = '${req.session.userId}';`, function (err, rows, fields) {
        if (err) {
            res.send("err");
        
        }else {
            res.send("candidate favorite updated");
        }
    });
}

exports.getcandidatebyState = function (req, res) {
    mysqlConnection.query(`SELECT candidateID FROM CANDIDATE WHERE state = '${req.params.state}';`,function (err, rows,fields) {
        if (err) {
            res.send("Not Found.");
        } else {
            res.send(row[0].candidateID);
        }
    });
}
