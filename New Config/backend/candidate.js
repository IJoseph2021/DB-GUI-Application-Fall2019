/*
This file stores all the candidate routes
*/
const mysqlConnection = require('./oursql.js');
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

//Baohua Yu
// user can have more than one favorite candiates
exports.getcandidateFavorite = function (req, res) {
    mysqlConnection.query(`SELECT candidateID FROM CANDIDATE_FAVORITE WHERE userID = '${req.session.userId}'`, function (err, rows, fields) {
        if (rows[0] == undefined) {
            res.send("Not Found");
        } else {
            res.send(rows[0].candidateID);
        }
    });
}


// update the candidate favorite
exports.updateCandidateFavorite = function (req, res) {
    mysqlConnection.query(`UPDATE CANDIDATE_FAVORITE SET candidateID = '${req.params.candidateID}' WHERE userID = '${req.session.userId}';`, function (err, rows, fields) {
        if (err) {
            res.send("err");

        } else {
            res.send("candidate favorite updated");
        }
    });
}
// Baohua Yu
//Isaac J.
// get candidate by state/zipcode/city/partyCode
exports.getCandidateList = function (req, res) {
    state = req.params.state
    zipCode = req.params.zipCode
    partyCode = req.params.partyCode
    city = req.params.city

    if (state != "0") {
        console.log(`SELECT USERID FROM CANDIDATE WHERE state = '${state}';`);
        mysqlConnection.query(`SELECT USERID FROM CANDIDATE WHERE state = '${state}';`, function (err, rows, fields) {
            
            if (rows[0] != undefined) {
                res.send(rows);
            } else {
                res.send("No candidate found base on the state reference");
            }
        });
    }
    else if (zipCode != "0") {
        console.log(`SELECT USERID FROM CANDIDATE WHERE zipCode = '${zipCode}';`);
        mysqlConnection.query(`SELECT USERID FROM CANDIDATE WHERE zipCode = '${zipCode}';`, function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send("No candidate found base on the zipCode reference");
            }
        });
    }

    else if (city != "0") {
        console.log(`SELECT USERID FROM CANDIDATE WHERE city = '${city}';`);
        mysqlConnection.query(`SELECT USERID FROM CANDIDATE WHERE city = '${city}';`, function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);
            } else {
                res.send("No candidate found base on the city reference");
            }
        });
    }
    else
    {
        console.log(`SELECT USERID FROM CANDIDATE WHERE partyCode = '${partyCode}';`);
        mysqlConnection.query(`SELECT USERID FROM CANDIDATE WHERE partyCode = '${partyCode}';`, function (err, rows, field) {
            if (rows[0] != undefined) {
                res.send(rows);
            } else {
                res.send("No candidate found base on the partyCode reference");
            }
        });
    }
}

//Isaac Joseph
exports.enterElection = function(req,res){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    electionID = req.params.electionID;
    level = req.params.user_level;
    location = req.params.location;
    time = dateTime;
 
    query = "INSERT INTO ELECTIONS (electionID, level, location, time)"+
    " VALUES(\""+ electionID + "\",\"" + level + "\",\"" + location + "\",\"" + time + "\");";

    console.log(query);
    mysqlConnection.query(query, 
        function(err,rows,fields){
            if(err){
                res.send("Candidate addition to election Failed");
                }
            else {
                res.send("Candidate addition to election Created");
            }
        });
}