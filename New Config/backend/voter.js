/*
Voter File
This file manages all the routes for the voters
*/

const mysqlConnection = require('./oursql.js');


//Steve Shoemaker
//This function makes a specific user a voter
exports.userBecomeVoter = function(req,res){
    mysqlConnection.query(`INSERT INTO VOTER(userID) VALUES ('${req.params.user}');`, function(err,rows,fields){
        if (err){
            res.send(404);
        } else {
            res.send(200);
        }
    })
}

//Steve Shoemaker
//This function gets all of a voters info
exports.getVoterInfo = function(req,res){
    mysqlConnection.query(`SELECT * FROM VOTER WHERE userID = '${req.params.voter}';`, function(err,rows,fields){
        if(err){
            res.send(404);
        } else {
            res.send(rows);
        }
    });
}

//Steve Shoemaker
//Updates the city of the session voter
exports.updateCitySession = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`UPDATE VOTER SET city = '${req.params.city}' WHERE userID = '${req.session.userId}';`, function(err,rows,fields){
        if(err) console.log(err.message);
    })
    res.send('update Attempted');
}

//Steve Shoemaker
//Gets the city of the current user
exports.getCitySession = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`SELECT CITY FROM VOTER WHERE userID = '${userID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].CITY);
        } else {
            res.send("City not found");
        }
    });
}

//Steve Shoemaker
//Updates the county of the current user
exports.updateCountySession = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`UPDATE VOTER SET County = '${req.params.county}' WHERE userID = '${req.session.userId}';`, function(err,rows,fields){
      if(err) console.log(err.message);
    })
    res.send('update Attempted');
}

//Written by Parker-- please check and see if correct
exports.updateZipCodeSession = function(req,res){
    userID = req.session.userID;
    mysqlConnection.query(`UPDATE VOTER SET zipCode = '${req.params.zipCode}' WHERE userID = '${req.session.userId}';`, function(err,rows,fields){

        if(err) console.log(err.message);
    })
    res.send('update Attempted');
}

//Steve Shoemaker
//Gets the county of the current user
exports.getCountySession = function(req,res){
    userID = req.session.userId;
    mysqlConnection.query(`SELECT COUNTY FROM VOTER WHERE userID = '${userID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].County);
        } else {
            res.send("City not found");
        }
    });
}

//Stephen Shoemaker
//This route updates the party of the voter
exports.sessionUpdateParty = function(req,res){
    userID = req.session.userId;
    
    mysqlConnection.query(`SELECT partyCode FROM PARTY WHERE partyName = '${req.params.partyName}'`,function(err,rows,fields){
        if(err){console.log("finding party name: " + err.message)};
        if(rows.length == undefined || rows[0] == undefined){
            res.send('Party Not Found');
        } else {
            mysqlConnection.query(`UPDATE VOTER SET partyCode = '${rows[0].partyCode}' WHERE userID = '${userID}';`, function(innerErr,innerRows,innerFields){
                if(innerErr) console.log(innerErr.message);
                else res.send('Party Updated');
            });
            
        }
    });
}

//Steve Shoemaker
//Get Zip code of the current user
exports.getZipCodeSession = function(req,res){
    userID = req.session.userId;
    console.log(`SELECT zipCode FROM VOTER WHERE userID = '${userID}';`);
    mysqlConnection.query(`SELECT zipCode FROM VOTER WHERE userID = '${userID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].zipCode);
        } else {
            res.send("zipCode not found");
        }
    });

}

//Parker Smith
//Find list of voters by party and zipCode

exports.getVoterListZipCode = function(req,res){
    partyCode = req.params.partyCode
    zipCode = req.params.zipCode
   
    console.log(`SELECT USER.fname, USER.lname FROM USER INNER JOIN VOTER ON USER.ID = VOTER.userID WHERE partyCode = '${partyCode}' AND zipCode = '${zipCode}';`);
    mysqlConnection.query(`SELECT USER.fname, USER.lname FROM USER INNER JOIN VOTER ON USER.ID = VOTER.userID WHERE partyCode = '${partyCode}' AND zipCode = '${zipCode}';`, function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows);
        }
        else{
            res.send("no users found that match zip code preference");
        }
    });
}
    
exports.getVoterListCity = function(req,res){
    partyCode = req.params.partyCode
    city = req.params.city
    console.log(`SELECT USER.fname, USER.lname FROM USER INNER JOIN VOTER ON USER.ID = VOTER.userID WHERE partyCode = '${partyCode}' AND city = '${city}';`);
    mysqlConnection.query(`SELECT USER.fname, USER.lname FROM USER INNER JOIN VOTER ON USER.ID = VOTER.userID WHERE partyCode = '${partyCode}' AND city = '${city}';`, function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows);
        }
        else{
            res.send("no users found that match city preference");
        }
    });
}

exports.getVoterListState = function(req,res){
    partyCode = req.params.partyCode
    state = req.params.state
    console.log(`SELECT USER.fname, USER.lname FROM USER INNER JOIN VOTER ON USER.ID = VOTER.userID WHERE partyCode = '${partyCode}' AND state = '${state}';`);
    mysqlConnection.query(`SELECT USER.fname, USER.lname FROM USER INNER JOIN VOTER ON USER.ID = VOTER.userID WHERE partyCode = '${partyCode}' AND state = '${state}';`, function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows);
        }
        else{
            res.send("no users found that match state preference");
        }
    });
}

//follow, unfollow, get list of followed topics
exports.followTopic = function(req,res){
    qID = req.params.question_ID
    user_ID = req.session.userId
 
    console.log(`INSERT INTO electionBuddy.HOT_TOPIC VALUES(${qID}, ${user_ID}, 1)`);
    mysqlConnection.query(`INSERT INTO electionBuddy.HOT_TOPIC VALUES(${qID}, ${user_ID}, 1)`, function(err, rows, fields){
        if(err){
            res.send("Follow Question Failed");
            }
        else {
            res.send("Question Followed");
        }
    });
}

exports.unfollowTopic = function(req,res){
    qID = req.params.question_ID
    user_ID = req.session.userId
 
    console.log(`UPDATE HOT_TOPIC SET active = 0 WHERE question_ID = '${qID}' AND user_ID = '${user_ID}';`);
    mysqlConnection.query(`UPDATE HOT_TOPIC SET active = 0 WHERE question_ID = '${qID}' AND user_ID = '${user_ID}';`,function(err,rows,fields){
        if(err){
            res.send("Unable to Unfollow");
            }
        else {
            res.send("Question Unfollowed");
        }
    });
}

exports.getFollowList = function(req, res){
    user_ID = req.session.userId

    console.log(`SELECT question FROM HOT_TOPIC INNER JOIN CANDIDATE_QUESTION ON HOT_TOPIC question_ID = CANDIDATE_QUESTION.question_ID WHERE user_ID = '${user_ID}';`);
    mysqlConnection.query(`SELECT question
        FROM HOT_TOPIC 
        INNER JOIN CANDIDATE_QUESTION ON HOT_TOPIC.question_ID = CANDIDATE_QUESTION.question_ID
        WHERE user_ID = '${user_ID}';`, function(err, rows, fields){
        
            if(err){
            res.send("Unable to get follow list");
            }
            else {
            res.send(rows);
        }
    });
}

//searches based on a given party
exports.getCandidatesInElections = function(req, res){
    partyCode = req.params.partyCode
    location = req.params.location

    console.log(
        `SELECT USER.fname, USER.lname
        FROM USER
        INNER JOIN CANDIDATE ON USER.ID = CANDIDATE.userID
        INNER JOIN ELECTION_CANDIDATE ON CANDIDATE.userID = ELECTION_CANDIDATE.userID
        INNER JOIN ELECTIONS ON ELECTION_CANDIDATE.electionID = ELECTIONS.electionID
        WHERE CANDIDATE.partyCode = '${partyCode}' AND ELECTIONS.location = '${location}';`);

    mysqlConnection.query(
        `SELECT USER.fname, USER.lname
        FROM USER
        INNER JOIN CANDIDATE ON USER.ID = CANDIDATE.userID
        INNER JOIN ELECTION_CANDIDATES ON CANDIDATE.userID = ELECTION_CANDIDATES.userID
        INNER JOIN ELECTIONS ON ELECTION_CANDIDATES.electionID = ELECTIONS.electionID
        WHERE CANDIDATE.partyCode = '${partyCode}' AND ELECTIONS.location = '${location}';`, function(err, rows, fields){

            if(err){
                res.send("Unable to complete search to find candidates");
                console.log(err.message)
            }

            else{
                res.send(rows)
            }

        });
}

//Isaac J.
exports.getEligibility = function(req,res){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    userID = req.params.userID;
    time = dateTime;
 
    console.log(
        `SELECT ELECTIONS.electionID
        FROM ELECTIONS
        WHERE ELECTIONS.location IN(SELECT VOTER.city FROM VOTER WHERE VOTER.userID = '${userID}')
        OR ELECTIONS.location IN(SELECT VOTER.state FROM VOTER WHERE VOTER.userID = '${userID}')
        OR ELECTIONS.location IN(SELECT VOTER.zipCode FROM VOTER WHERE VOTER.userID = '${userID}')
        AND ELECTIONS.time >= '${time}';`);

    mysqlConnection.query(
        `SELECT ELECTIONS.electionID
        FROM ELECTIONS
        WHERE ELECTIONS.location IN(SELECT VOTER.city FROM VOTER WHERE VOTER.userID = '${userID}')
        OR ELECTIONS.location IN(SELECT VOTER.state FROM VOTER WHERE VOTER.userID = '${userID}')
        OR ELECTIONS.location IN(SELECT VOTER.zipCode FROM VOTER WHERE VOTER.userID = '${userID}')
        AND ELECTIONS.time >= '${time}';`, function(err, rows, fields){

            if(err){
                res.send("Unable to complete search to find eligible elections");
                console.log(err.message)
            }

            else{
                res.send(rows)
            }

        });
}
