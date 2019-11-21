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
    
    console.log(`SELECT candidate_ID FROM CANDIDATE_FAVORITE WHERE user_ID = '${req.params.user_ID}';`);
    mysqlConnection.query(`SELECT candidate_ID FROM CANDIDATE_FAVORITE WHERE user_ID = '${req.params.user_ID}'`, function (err, rows, fields) {
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
    mysqlConnection.query(`UPDATE CANDIDATE_FAVORITE SET candidate_ID = '${req.params.candidate_ID}' WHERE user_ID = '${req.params.user_ID}';`, function (err, rows, fields) {
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
    console.log(`SELECT CANDIDATE.userID FROM CANDIDATE WHERE state = '${req.params.state}';`);
    mysqlConnection.query(`SELECT CANDIDATE.userID FROM CANDIDATE WHERE state = '${req.params.state}';`, function (err, rows, fields) {

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
        console.log(`SELECT userID FROM CANDIDATE WHERE zipCode = '${zipCode}';`);
        mysqlConnection.query(`SELECT userID FROM CANDIDATE WHERE zipCode = '${zipCode}';`, function (err, rows, fields) {
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
        console.log(`SELECT userID FROM CANDIDATE WHERE city = '${city}';`);
        mysqlConnection.query(`SELECT userID FROM CANDIDATE WHERE city = '${city}';`, function (err, rows, fields) {
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
        console.log(`SELECT userID FROM CANDIDATE WHERE partyCode = '${partyCode}';`);
        mysqlConnection.query(`SELECT userID FROM CANDIDATE WHERE partyCode = '${partyCode}';`, function (err, rows, field) {
            if (rows[0] != undefined) {
                res.send(rows);
            } else {
                res.send("No candidate found base on the partyCode reference");
            }
        });
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