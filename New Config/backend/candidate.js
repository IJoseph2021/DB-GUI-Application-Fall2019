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

    console.log(`SELECT candidateId FROM CANDIDATE_FAVORITE WHERE voterId = '${req.params.voterId}';`);
    mysqlConnection.query(`SELECT candidateId FROM CANDIDATE_FAVORITE WHERE voterId = '${req.params.voterId}'`, function (err, rows, fields) {
        if (rows[0] != undefined) {
            res.send(rows);
        } else {
            res.send("candidate favorite not found");
        }
    });
}

//Baohua Yu
// update the candidate favorite
exports.updateCandidateFavorite = function (req, res) {
    mysqlConnection.query(`UPDATE CANDIDATE_FAVORITE SET candidateId = '${req.params.candidateId}' WHERE voterId = '${req.params.voterId}';`, function (err, rows, fields) {
        if (err) {
            res.send("err");

        } else {
            res.send("candidate favorite updated");
        }
    });
}
// Baohua Yu
//Isaac Joseph
//get candidate by state
exports.getCandidatebyState = function (req, res) {
    console.log(`SELECT CANDIDATE.userId FROM CANDIDATE WHERE state = '${req.params.state}';`);
    mysqlConnection.query(`SELECT CANDIDATE.userId FROM CANDIDATE WHERE state = '${req.params.state}';`, function (err, rows, fields) {

        if (rows[0] != undefined) {
                res.send(rows);
            } else {
                res.send("No candidate found base on the state reference");
            }
        });
}

//Baohua Yu
//get candidate by zipcode
    exports.getCandidatebyzipCode = function (req, res) {
        zipCode = req.params.zipCode;
        console.log(`SELECT userId FROM CANDIDATE WHERE zipCode = '${zipCode}';`);
        mysqlConnection.query(`SELECT userId FROM CANDIDATE WHERE zipCode = '${zipCode}';`, function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send("No candidate found base on the zipCode reference");
            }
        });
}

//Baohua Yu
//getcandidate by city
    exports.getCandidatebyCity = function (req, res) {
        city = req.params.city;
        console.log(`SELECT userId FROM CANDIDATE WHERE city = '${city}';`);
        mysqlConnection.query(`SELECT userId FROM CANDIDATE WHERE city = '${city}';`, function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);
            } else {
                res.send("No candidate found base on the city reference");
            }
        });
}

 //Baohua Yu
//getcandidate by partycode
    exports.getCandidatebypartyCode = function (req, res) {
        partyCode = req.params.partyCode;
        console.log(`SELECT userId FROM CANDIDATE WHERE partyCode = '${partyCode}';`);
        mysqlConnection.query(`SELECT userId FROM CANDIDATE WHERE partyCode = '${partyCode}';`, function (err, rows, field) {
            if (rows[0] != undefined) {
                res.send(rows);
            } else {
                res.send("No candidate found base on the partyCode reference");
            }
        });
    }

exports.candidateEnterElection = function(req,res){
    mysqlConnection.query(`SELECT LEVEL, LOCATION FROM ELECTIONS WHERE '${req.params.electionID}' = ELECTIONS.electionID;`, function(ferr, frows,ffield){
        queryLocation = '';
        if(frows[0].LEVEL == 'city') queryLocation = 'city';
        if(frows[0].LEVEL == 'zipCode') queryLocation = 'zipCode';
        if(frows[0].LEVEL == 'state') queryLocation = 'state';

        mysqlConnection.query(`SELECT ${queryLocation} FROM CANDIDATE WHERE CANDIDATE.userID = ${req.params.candidate};`,function(serr, srows, sfields){
            if(srows != undefined){
                 mysqlConnection.query(`INSERT INTO ELECTION_CANDIDATES(electionID,userID) VALUES (${req.params.electionID}, ${req.params.candidate});`, function(err,rows,fields){
                     if(err){
                        res.sendStatus(404);
                     } else {
                         res.sendStatus(200);
                     }
                 });
             } else {
                 res.sendStatus(400);
             }
        });
    })
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
                res.send("Candidate addition to election Created");w
            }
        });
}

exports.addBio = function(req,res){
    mysqlConnection.query(`UPDATE CANDIDATE SET CANDIDATE.bio = '${req.params.bio}' WHERE CANDIDATE.userId = '${req.params.id}';`, function(err,rows,fields){
        if(err){
            console.log("ERROR: " + err.message);
            res.send(404);

        } else {
            res.send(200);
        }
    })
}

exports.getBio = function(req,res){
    mysqlConnection.query(`SELECT CANDIDATE.bio FROM CANDIDATE WHERE CANDIDATE.userId = ${req.params.id};`,function(err,rows,fields){
        if(!err && rows.length != 0){
            res.send(rows);
        } else {
            res.send(404);
        }
    })
}


exports.getCandidateParty = function(req,res){
    mysqlConnection.query(`SELECT PARTY.partyName FROM CANDIDATE JOIN PARTY ON PARTY.partyCode = CANDIDATE.partyCode WHERE CANDIDATE.userId = '${req.params.id}';`,function(err,rows,fields){
        if(err){
            res.send(404);
        } else {
            res.send(rows);
        }
    });
}
