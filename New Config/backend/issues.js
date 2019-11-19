const mysqlConnection = require('./oursql.js');

exports.createIssue = function (req,res){
    mysqlConnection.query(`INSERT INTO ISSUES(issueName) VALUES ('${req.params.name}');`, function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.send(404);
        } else {
            res.send(200);
        }
        
    })
}

exports.markIssue = function(req,res){
    mysqlConnection.query(`INSERT INTO USERISSUES(issueId, userId) VALUES('${req.params.issue}', '${req.params.user}');`,function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.send(404);
        } else{
            res.send(200);
        }
    })
}

exports.getUserIssues = function(req,res){
    mysqlConnection.query(`SELECT DISTINCT issueName FROM USERISSUES INNER JOIN ISSUES ON ISSUES.idISSUES = ELECTIONISSUES.issueId WHERE userId = '${req.params.user};'`,function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.send(404);
        } else {
            res.send(rows);
        }
    })
}

exports.addElectionIssue = function(req,res){
    mysqlConnection.query(`INSERT INTO ELECTIONISSUES(issueId, electionId) VALUES('${req.params.issue}', '${req.params.election}');`,function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.send(404);
        } else{
            res.send(200);
        }
    })
}


exports.getElectionIssues = function(req,res){
    mysqlConnection.query(`SELECT DISTINCT issueName FROM ELECTIONISSUES JOIN ISSUES ON ISSUES.idISSUES = ELECTIONISSUES.issueId WHERE electionId = '${req.params.election}';`,function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.send(404);
        } else {
            res.send(rows);
        }
    })
}
