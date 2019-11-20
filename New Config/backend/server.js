

/**A simple node/express server that include communication with a
 * mysql db instance.
*/

//create main objects

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const login = require('./login.js');
const voter = require('./voter.js');
const party = require('./party.js');
const admin = require('./admin.js');
const candidate = require('./candidate.js');
const session = require('express-session');
var fileReader = require('fs');
const questions = require('./questions.js');
const elections = require('./elections.js');
const issues = require('./issues.js');

const mysql = require('./oursql.js');


//set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 8000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console.
const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

//using session
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

/**     REQUEST HANDLERS        */


//Loads the Dev mysql DB
app.get('/setupDevDb', function(req,res){
  
  mysql.useDevDB();
  const files= [];
  filesCount = 0;
  console.log(process.cwd());
  fileReader.readFile("mysqlDev_init/SampleElectionBuddyData.sql",'utf-8', function(err, contents){
    if(err){
      console.log(err.message);
    } else {
      query = '';
      for(char = 0; char < contents.length; char++){
        if(contents[char] == ';'){
          mysql.query(query,function(err,rows,fields){
            if(err){
              console.log(err.message);
            }
          });}
        else {
          query += contents[char];
        }
      }
    }
  });
  res.send("DevDataLoaded");
});

//Route to use prod db
app.get('/useProdDB', function(req,res){
  mysql.useProdDB();
  res.send("using prodDB");
});

app.get('/useDevDB', function(req,res){
  mysql.useDevDB();
  res.send(200);
})

//Login Routes

//Create Account
app.get('/login/create/:user/:fname/:lname/:pass/:email', login.createAccount);

//login
app.get('/login/login/:user/:pass', login.login);

//Get Email
app.get('/login/getEmail/:user', login.isLoggedIn, login.getEmail);

//Get User ID
app.get('/login/getUserId/:user', login.getUserID);

//Get User Info
app.get('/login/getUserInfo/:user', login.getUserInfo);

//Get Username
app.get('/login/getUsername/:user', login.isLoggedIn, login.getUsername);

//Get Fname
app.get('/login/getFname/:user', login.isLoggedIn, login.getFname);

//Get Lname
app.get('/login/getLname/:user', login.isLoggedIn, login.getLname);

//Get password
app.get('/login/getPassword/:user', login.isLoggedIn, login.getPassword);

//Get User ID Session
app.get('/login/session/getUserId', login.isLoggedIn, login.getSessionUserId);

//Update Session Password
app.get('/login/session/updatePassword/:newPass', login.isLoggedIn,login.changePassword);

//updating Email
app.get('/login/updateEmail/:user/:email', login.isLoggedIn, login.updateEmail);

//Update fname
app.get('/login/session/changeFname/:user/:fname', login.isLoggedIn, login.changeFname);

//Update Lname
app.get('/login/session/changeLname/:user/:lname', login.isLoggedIn, login.changeLname);




//Voter Routes

//Making the current session a voter
app.get('/voter/session/setVoter', login.isLoggedIn, voter.setVoter);

//Updates the city of the voter
app.get('/voter/session/updateCity/:city', login.isLoggedIn, voter.updateCitySession);

//Gets the voters session
app.get('/voter/session/getCitySession', login.isLoggedIn, voter.getCitySession);

//Updates the voter county
app.get('/voter/session/updateCounty/:county', login.isLoggedIn, voter.updateCountySession);

//Updates zipcode
app.get('/voter/session/updateZipCodeSession/:zipCode', login.isLoggedIn, voter.updateZipCodeSession);

//Gets the voter county
app.get('/voter/session/getCountySession', login.isLoggedIn, voter.getCountySession);

//Updates the voter Party
app.get('/voter/session/updateParty/:partyName', login.isLoggedIn, voter.sessionUpdateParty);

//Gets voter list based on zip Code
app.get('/voter/session/getVoterListZipCode/:partyCode/:zipCode', login.isLoggedIn, voter.getVoterListZipCode);

//Gets voter list based on state
app.get('/voter/session/getVoterListState/:partyCode/:state', login.isLoggedIn, voter.getVoterListState);

//Gets voter list based on city
app.get('/voter/session/getVoterListCity/:partyCode/:city', login.isLoggedIn, voter.getVoterListCity);

//Get zip code of current user
app.get('/voter/session/getZipCodeSession', login.isLoggedIn, voter.getZipCodeSession);

// Follow a Question
app.get('/voter/session/followTopic/:question_ID', login.isLoggedIn, voter.followTopic);

// Unfollow a question
app.get('/voter/session/unfollowTopic/:question_ID', login.isLoggedIn, voter.unfollowTopic);

// Get List of followed questions
app.get('/voter/session/getFollowList', login.isLoggedIn, voter.getFollowList);


//Party Routes

//Creates a party
app.get('/party/createParty/:party', login.isLoggedIn, party.createParty);

//Create party and code
app.get('/party/createPartyAndCode/:partyCode/:partyName', login.isLoggedIn, party.createPartyAndCode);

//Gets a party name
app.get('/party/getPartyName/:partyCode', party.getPartyName);

//Gets a party Code
app.get('/party/getPartyCode/:partyName', party.getPartyCode);


//Admin Routes

//Gets admin level #
app.get('/admin/session/getAdminLevel', login.isLoggedIn, admin.getAdminLevel);

//Verifies a candidate
app.get('/admin/session/verify/:ID',login.isLoggedIn,admin.isAdmin, admin.verifyCandidate);

//adds an election
app.get('/admin/session/addElection/:level/:location/:time/:name', login.isLoggedIn, admin.isAdmin, admin.addElection);


//Candidate Routes

//Allows a user to become a candidate
app.get('/candidate/session/becomeCandidate', login.isLoggedIn, candidate.becomeCandidate);

//Getting the candidate favorite
app.get('/candidate/session/getcandidateFavorite', login.isLoggedIn, candidate.getcandidateFavorite);

//Update the canidate favorite
app.get('/candidate/session/updateCandidateFavorite/:candidateID', login.isLoggedIn, candidate.updateCandidateFavorite);

//Get candidate by state
app.get('/candidate/session/getCandidatebyState/:state', login.isLoggedIn, candidate.getCandidatebyState);

//Get candidate by zipcode
app.get('/candidate/session/getCandidatebyzipCode/:zipCode', login.isLoggedIn, candidate.getCandidatebyzipCode);

//Get candidate by city
app.get('/candidate/session/getCandidatebyCity/:city', login.isLoggedIn, candidate.getCandidatebyCity);

//Get candidate by partycode
app.get('/candidate/session/getCandidatebypartyCode/:partyCode', login.isLoggedIn, candidate.getCandidatebypartyCode);

app.get('/candidate/session/enterElection/:electionID/:level/:location', login.isLoggedIn, candidate.enterElection);





//Questions Routes

//Creates a questsion
app.get('/questions/session/createQuestion/:asker_ID/:askee_ID/:question',login.isLoggedIn, questions.createQuestion);

//Gets a question on ID
app.get('/questions/session/getQuestion/:question_ID', login.isLoggedIn, questions.getQuestion);

//Removes a question on ID
app.get('/questions/session/removeQuestion/:question_ID', login.isLoggedIn, questions.removeQuestion);

//Updates a question Time
app.get('/questions/session/updateQuestion/:question_ID/:question2', login.isLoggedIn, questions.updateQuestion);

// Creates a comment
app.get('/questions/session/createComment/:commenter_ID/:user_ID/:comment', login.isLoggedIn, questions.createComment);

// Gets comment based on the comment ID
app.get('/questions/session/getComment/:commenter_ID', login.isLoggedIn, questions.getComment);

// Soft Removes comment based on the comment ID
app.get('/questions/session/removeQuestion/:commenter_ID', login.isLoggedIn, questions.removeComment);

// Updates a comment with new text and new time stamp
app.get('/questions/session/updateComment/:commenter_ID/:comment2', login.isLoggedIn, questions.updateComment);

// Outputs the tree of comments for a question
app.get('/questions/session/getQuestionTree/:question_ID', login.isLoggedIn, questions.getQuestionTree);

// Outputs the comment replies to a comment
app.get('/question/session/getCommentTree/:commentee_ID', login.isLoggedIn, questions.getCommentTree);

//election routes
app.get('/election/getElections/citiesWithElections', elections.getElectionsInCities);

//issueRoutes

//This function creates an issue
app.get('/issues/createIssue/:name', issues.createIssue);

//This function marks an issue as important to a user
app.get('/issues/markIssue/:user/:issue', issues.markIssue);

//this function gets a list of all important issues to an user
app.get('/issues/getUserIssues/:user', issues.getUserIssues);

//adds an issue to an election
app.get('/issues/addElectionIssue/:election/:issue', issues.addElectionIssue);

//gets all issues connected to an election
app.get('/issues/getElectionIssues/:election', issues.getElectionIssues);

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});