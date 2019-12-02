/**A simple node/express server that include communication with a
 * mysql db instance.
*/

//create main objects
var nodemailer = require('nodemailer');
const https = require('https');
const fs = require('fs');
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
app.get('/login/getEmail/:user', login.getEmail);

//Get User ID
app.get('/getUserId/:user', login.getUserID);

//Get User Info
app.get('/login/getUserInfo/:user', login.getUserInfo);

//Get Username
app.get('/login/getUsername/:ID', login.getUsername);

//Get Fname
app.get('/login/getFname/:ID', login.getFname);

//Get Lname
app.get('/login/getLname/:ID', login.getLname);

//Get password
app.get('/login/getPassword/:ID', login.getPassword);

//Update Password
app.get('/updatePassword/:user/:newpass', login.changePassword);

//updating Email
app.get('/login/updateEmail/:user/:email', login.updateEmail);

//update fname
app.get('/login/updateFName/:user/:fname', login.updateFName);

//update lname
app.get('/login/updateLName/:user/:lname', login.updateLName);

//getAllRoles
app.get('/login/getAllRoles/:user', login.getRoles);

//Voter Routes

//Making the current session a voter
app.get('/voter/session/setVoter',  voter.setVoter);

//makes a specific user become a voter
app.get('/voter/becomeVoter/:user', voter.userBecomeVoter);

app.get('/voter/getVoterInfo/:voter', voter.getVoterInfo);

//Updates the city of the voter
app.get('/voter/session/updateCity/:city',  voter.updateCitySession);

//Gets the voters session
app.get('/voter/session/getCitySession',  voter.getCitySession);

//Updates the voter county
app.get('/voter/session/updateCounty/:county',  voter.updateCountySession);

//Updates zipcode
app.get('/voter/session/updateZipCodeSession/:zipCode',  voter.updateZipCodeSession);

//Gets the voter county
app.get('/voter/session/getCountySession',  voter.getCountySession);

//Updates the voter Party
app.get('/voter/session/updateParty/:partyName',  voter.sessionUpdateParty);

//Gets voter list based on zip Code
app.get('/voter/session/getVoterListZipCode/:partyCode/:zipCode',  voter.getVoterListZipCode);

//Gets voter list based on state
app.get('/voter/session/getVoterListState/:partyCode/:state',  voter.getVoterListState);

//Gets voter list based on city
app.get('/voter/session/getVoterListCity/:partyCode/:city',  voter.getVoterListCity);

//Get zip code of current user
app.get('/voter/session/getZipCodeSession',  voter.getZipCodeSession);

// Follow a Question
app.get('/voter/session/followTopic/:question_ID',  voter.followTopic);

// Unfollow a question
app.get('/voter/session/unfollowTopic/:question_ID',  voter.unfollowTopic);

// Get List of followed questions
app.get('/voter/session/getFollowList',  voter.getFollowList);

// Get List of electorates in elections based on location and party code
app.get('/voter/session/getCandidatesInElections/:partyCode/:location',  voter.getCandidatesInElections);

//Get list of eligible elections for voter
app.get('/voter/session/getEligibility/:userID',  voter.getEligibility);


//Party Routes

//Creates a party
app.get('/party/createParty/:party',  party.createParty);

//Create party and code
app.get('/party/createPartyAndCode/:partyCode/:partyName',  party.createPartyAndCode);

//Gets a party name
app.get('/party/getPartyName/:partyCode', party.getPartyName);

//Gets a party Code
app.get('/party/getPartyCode/:partyName', party.getPartyCode);


//Admin Routes

//Gets admin level #
app.get('/admin/session/getAdminLevel',  admin.getAdminLevel);

//Verifies a candidate
app.get('/admin/session/verify/:ID',admin.isAdmin, admin.verifyCandidate);

//adds an election
app.get('/admin/session/addElection/:level/:location/:time/:name',  admin.isAdmin, admin.addElection);

//makes a user an admin
app.get('/admin/addAdmin/:userAddingAdmin/:newAdmin/:adminLevel', admin.addAdmin);

//Candidate Routes

//Allows a user to become a candidate
app.get('/candidate/session/becomeCandidate',  candidate.becomeCandidate);

//Getting the candidate favorite
app.get('/candidate/session/getcandidateFavorite/:user_ID',  candidate.getcandidateFavorite);

//Update the canidate favorite
app.get('/candidate/session/updateCandidateFavorite/:user_ID/:candidate_ID',  candidate.updateCandidateFavorite);

//Get candidate by state
app.get('/candidate/session/getCandidatebyState/:state',  candidate.getCandidatebyState);

//Get candidate by zipcode
app.get('/candidate/session/getCandidatebyzipCode/:zipCode',  candidate.getCandidatebyzipCode);

//Get candidate by city
app.get('/candidate/session/getCandidatebyCity/:city',  candidate.getCandidatebyCity);

//Get candidate by partycode
app.get('/candidate/session/getCandidatebypartyCode/:partyCode',  candidate.getCandidatebypartyCode);

app.get('/candidate/session/enterElection/:electionID/:level/:location',  candidate.enterElection);





//Questions Routes

//Creates a questsion
app.get('/questions/session/createQuestion/:asker_ID/:askee_ID/:question', questions.createQuestion);

//Gets a question on ID
app.get('/questions/session/getQuestion/:question_ID',  questions.getQuestion);

//Removes a question on ID
app.get('/questions/session/removeQuestion/:question_ID',  questions.removeQuestion);

//Updates a question Time
app.get('/questions/session/updateQuestion/:question_ID/:question2',  questions.updateQuestion);

// Creates a comment
app.get('/questions/session/createComment/:commenter_ID/:user_ID/:comment',  questions.createComment);

// Gets comment based on the comment ID
app.get('/questions/session/getComment/:commenter_ID',  questions.getComment);

// Soft Removes comment based on the comment ID
app.get('/questions/session/removeQuestion/:commenter_ID',  questions.removeComment);

// Updates a comment with new text and new time stamp
app.get('/questions/session/updateComment/:commenter_ID/:comment2',  questions.updateComment);

// Outputs the tree of comments for a question
app.get('/questions/session/getQuestionTree/:question_ID',  questions.getQuestionTree);

// Outputs the comment replies to a comment
app.get('/question/session/getCommentTree/:commentee_ID',  questions.getCommentTree);

// reports a comment by sending email to EB team
app.get('/questions/session/reportComment/:comment_ID',login.isLoggedIn, questions.reportComment);

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

// /* --------- This sends an email to local authority ---------*/
// app.post('/sendEmail', (req, res) => {
//   //receive body.sender and body.content
// 	console.log(req.body)
// 	console.log(req.params)
// 	let transporter = nodemailer.createTransport({
// 	    host: 'smtp.gmail.com',
// 	    port: 587,
// 	    secure: false,
// 	    requireTLS: true,
// 	    // auth: {
// 	    //     user: 'skyler.linhtran@gmail.com',
// 	    //     pass: 'skyler1996'
// 	    // }
// 			auth: {
// 				user: 'electionbuddy.fa2019@gmail.com',
// 				pass: 'electionbuddy2019'
// 			}
// 	});
//
//
//   // var mailOptions = {
//   //   from: `${JSON.stringify(req.body.sender)} <electionbuddy.fa2019@gmail.com>`,
//   //   to: 'mfonten@lyle.smu.edu',
//   //   subject: `${JSON.stringify(req.body.sender)} + from Election Buddy Sent You A Messsage`,
//   //   text: JSON.stringify(req.body.content)
//   // };
//
// 	var mailOptions = {
// 	  from: `${JSON.stringify(req.body.sender)} <electionbuddy.fa2019@gmail.com>`,
// 	  to: 'skylert@smu.edu',
// 	  subject: `${JSON.stringify(req.body.sender)} + from Election Buddy Sent You A Messsage`,
// 	  text: JSON.stringify(req.body.content)
// 	};
//
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
// 			res.status(200).send('Email sent.');
//     }
//   });
// });
//
// //---------------------------------------------------------------------------------
// https.createServer({
// 	key: fs.readFileSync('./ssl_electionbuddy/private.key'),
// 	cert: fs.readFileSync('./ssl_electionbuddy/certificate.crt'),
// 	ca: fs.readFileSync('./ssl_electionbuddy/ca_bundle.crt')
// },app).listen(config.port, config.host);


//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

