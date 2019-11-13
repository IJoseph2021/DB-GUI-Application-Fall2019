

/**A simple node/express server that include communication with a 
 * mysql db instance. 
*/

//create main objects

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql');
const login = require('./login.js');
const voter = require('./voter.js');
const party = require('./party.js');
const admin = require('./admin.js');
const candidate = require('./candidate.js');
const session = require('express-session');
var fileReader = require('fs');
const questions = require('./questions.js');


//List of all potential route files.
const routes = [login,voter,party,admin,candidate, questions];

//create the mysql connection object.  
var connection = mysql.createConnection({
  //db is the host and that name is assigned based on the 
  //container name given in the docker-compose file
  host: '34.67.95.217',
  port: '3306',
  user: 'root',
  password: 'dbpassword',
  database: 'electionBuddy'
});

//Setup for connecting to the dev mysql connection
//Made by Steve Shoemaker
var devConnect = mysql.createConnection({
  host: 'backend-db',
  database: 'electionBuddy',
  port: '3306',
  user: 'user',
  password: 'password'
});

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

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
  for(var i = 0; i < routes.length; i++){
    routes[i].createConnection(connection);
  }
});

//Made by Steve
//Dev Connection
devConnect.connect(function(err){
  if(err){
    logger.error(err.message);
    logger.error("can't connect to dev DB!");
  }
});

//using session
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true
}));

/**     REQUEST HANDLERS        */

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to localhost:3000/setupdb first. Then Go to localhost:3000/checkdb');
});


//GET /setupdb
app.get('/setupdb', (req, res) => {
  connection.query('drop table if exists data2', function (err, rows, fields) {
    if (err)
      logger.error("Can't drop table");
  });
  connection.query('create table data2(id int, name varchar(50))', function (err, rows, fields) {
    if (err)
      logger.error("Problem creating the table data2");
  });
  connection.query('insert into data2 values(1, \'mark\')', function(err, rows, fields) {
      if(err)
        logger.error('adding row to table failed');
  });
  res.status(200).send('created the table');
});

//GET /checkdb
app.get('/checkdb', (req, res) => {
  //execute a query to select * from table named data. 
  connection.query('SELECT * from USER', function (err, rows, fields) {
    if (err) {
      logger.error("Error while executing Query");
    };
    logger.info(rows[0].name + ' ' + rows[0].id);
 
    //writing to the response object
    res.type('text/html');
    res.status(200);
    res.send('<h1>' + rows[0].id + ' ' + rows[0].name + '</h1>');
  })
});


//Loads the Dev mysql DB
app.get('/setupDevDb', function(req,res){
  for(var i = 0; i < routes.length; i++){
    routes[i].createConnection(devConnect);
  }
  fileReader.readdir("mysqlDev_init", function(err, filenames){
    if(err){
      res.send(err.message);
      return;
    }
    filenames.forEach(function(filename){
      fileReader.readFile("mysqlDev_init/" + filename, 'utf-8', function(err, contents) {
      var query = "";
      for(charCtr = 0; charCtr < contents.length; charCtr++){
        query += contents[charCtr];
        if(contents[charCtr] == ';'){
          devConnect.query(query, function(err,rows,fields){
            if(err){
              logger.error(err.message);
              }
            });
          query = "";
          }
        }
      })})}); 
  res.send("DevDataLoaded");
});

//Connect to Dev DB
//Made by Steve Shoemaker
app.get('/useDevDB', function(req,res){
  for(var i = 0; i < routes.length; i++){
    routes[i].createConnection(devConnect);
  }
  res.send("using dev db");
});

//Route to use prod db
app.get('/useProdDB', function(req,res){
  for(var i = 0; i < routes.length; i++){
    routes[i].createConnection(connection);
  }
  res.send("using prodDB");
});

//Login Routes

//Create Account
app.get('/login/create/:user/:fname/:lname/:pass/:email', login.createAccount);

//login
app.get('/login/login/:user/:pass', login.login);

//updating Email
app.get('/login/updateEmail/:user/:email', login.isLoggedIn, login.updateEmail);

//Get Email
app.get('/login/getEmail/:user', login.isLoggedIn, login.getEmail);

//Get User ID
app.get('/login/getUserId/:user', login.getUserID);

//Get User ID Session
app.get('/login/session/getUserId', login.isLoggedIn, login.getSessionUserId);

//Update Session Password
app.get('/login/session/updatePassword/:newPass', login.isLoggedIn,login.changePassword);



//Voter Routes

//Making the current session a voter
app.get('/voter/session/setVoter', login.isLoggedIn, voter.setVoter);

//Updates the city of the voter
app.get('/voter/session/updateCity/:city', login.isLoggedIn, voter.updateCitySession);

//Gets the voters session
app.get('/voter/session/getCitySession', login.isLoggedIn, voter.getCitySession);

//Updates the voter county
app.get('/voter/session/updateCounty/:county', login.isLoggedIn, voter.updateCountySession);

//Gets the voter county
app.get('/voter/session/getCountySession', login.isLoggedIn, voter.getCountySession);

//Updates the voter Party
app.get('/voter/session/updateParty/:partyName', login.isLoggedIn, voter.sessionUpdateParty);

//Gets voter list based on location
app.get('/voter/session/getVoterList/:partyCode/:state/:city/:zipCode', login.isLoggedIn, voter.getVoterList);

//Get zip code of current user
app.get('/voter/session/getZipCodeSession', login.isLoggedIn, voter.getZipCodeSession);


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


//Candidate Routes

//Allows a user to become a candidate
app.get('/candidate/session/becomeCandidate', login.isLoggedIn, candidate.becomeCandidate);

//Getting the candidate favorite
app.get('/candidate/session/getcandidateFavorite/:userID', login.isLoggedIn, candidate.getcandidateFavorite);

//Update the canidate favorite
app.get('/candidate/session/updateCandidateFavorite/:candidateID', login.isLoggedIn, candidate.updateCandidateFavorite);

//Get candidate by state
app.get('/candidate/session/getcandidateList/:state/:zipCode/:city/:partyCode', login.isLoggedIn, candidate.getCandidateList);





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



//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

