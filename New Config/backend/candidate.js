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

<<<<<<< HEAD
<<<<<<< HEAD
// user can have more than one favorite candiates
exports.getcandidateFavorite = function (req, res) {
    mysqlConnection.query(`SELECT candidateID FROM CANDIDATE_FAVORITE WHERE userID = '${req.params.userId}'`, function (err, rows, fields) {
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

        } else {
            res.send("candidate favorite updated");
        }
    });
}
// get candidate by state/zipcode/partycode/city
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
        mysqlConnection.query(`SELECT USERID FROM CANDIDATE WHERE zipCode = '${zipCode}';`), function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);

            } else {
                res.send("No candidate found base on the zipCode reference");
            }
        });
    }

    else if (city != "0"){
        console.log(`SELECT USERID FROM CANDIDATE WHERE city = '${city}';`);
        mysqlConnection.query(`SELECT USERID FROM CANDIDATE WHERE city = '${city}';`), function (err, rows, fields) {
            if (rows[0] != undefined) {
                res.send(rows);
            } else {
                res.send("No candidate found base on he city reference")
            }
    }
}

=======
=======
>>>>>>> dece6a4c541fab547ed277832d8d18f3eb190625
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
    
<<<<<<< HEAD
}
=======
}
>>>>>>> dece6a4c541fab547ed277832d8d18f3eb190625
=======
}
>>>>>>> dece6a4c541fab547ed277832d8d18f3eb190625
