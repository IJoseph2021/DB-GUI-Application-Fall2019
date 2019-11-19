

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
const questions = require('./questions.js');

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


//sending login the mysql info
login.createConnection(connection);
login.setSessionCreater(session);

//sending voter the mysql info
voter.createConnection(connection);

//sending party the mysql info
party.createConnection(connection);

admin.setConnection(connection);

candidate.setConnection(connection);

questions.createConnection(connection);

//set up some configs for express.
const config = {
  name: 'sample-express-app',
  port: 3000,
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



app.get('/login/create/:user/:fname/:lname/:pass/:email', login.createAccount);


app.get('/login/login/:user/:pass', login.login);

app.get('/login/updateEmail/:user/:email', login.isLoggedIn, login.updateEmail);
app.get('/login/getEmail/:user', login.isLoggedIn, login.getEmail);

app.get('/login/getUserId/:user', login.isLoggedIn, login.getUserID);

app.get('/login/getUserInfo/:userId', login.getUserInfo);

app.get('/login/session/getUserId', login.isLoggedIn, login.getSessionUserId);

app.get('/login/session/updatePassword/:newPass', login.isLoggedIn,login.changePassword);

app.get('/voter/session/setVoter', login.isLoggedIn, voter.setVoter);

app.get('/voter/session/updateCity/:city', login.isLoggedIn, voter.updateCitySession);

app.get('/voter/session/getCitySession', login.isLoggedIn, voter.getCitySession);

app.get('/voter/session/updateCounty/:county', login.isLoggedIn, voter.updateCountySession);

app.get('/voter/session/getCountySession', login.isLoggedIn, voter.getCountySession);

app.get('/voter/session/updateParty/:partyName', login.isLoggedIn, voter.sessionUpdateParty);
app.get('/voter/session/updateZipCode/:zipCode', login.isLoggedIn, voter.updateZipCodeSession);
app.get('/voter/session/getZipCode/', login.isLoggedIn, voter.getZipCodeSession);


app.get('/party/createParty/:party', login.isLoggedIn, party.createParty);
app.get('/party/getPartyName/:partyCode', party.getPartyName);
app.get('/party/getPartyCode/:partyName', party.getPartyCode);

app.get('/admin/session/getAdminLevel', login.isLoggedIn, admin.getAdminLevel);
app.get('/admin/session/verify/:ID',login.isLoggedIn,admin.isAdmin, admin.verifyCandidate);

app.get('/questions/session/createQuestion/:question_ID/:question_Time/:asker_ID/:askee_ID/:question',login.isLoggedIn, questions.createQuestion);
app.get('/questions/session/getQuestion/:question_ID', login.isLoggedIn, questions.getQuestion);
app.get('/questions/session/removeQuestion/:question_ID', login.isLoggedIn, questions.removeQuestion);
app.get('/questions/session/updateQuestion/:question_ID/:update_Time/:question2', login.isLoggedIn, questions.updateQuestion);
app.get('/questions/session/createComment/:comment_Time/:commenter_ID/:commentee_ID/:user_ID/:comment', login.isLoggedIn, questions.createComment);
app.get('/questions/session/getComment/:commenter_ID', login.isLoggedIn, questions.getComment);
app.get('/questions/session/removeQuestion/:commenter_ID', login.isLoggedIn, questions.removeComment);
app.get('/questions/session/updateComment/:commenter_ID/:update_Time/:comment2', login.isLoggedIn, questions.updateComment);
app.get('/questions/session/getCommentTree/:question_ID', login.isLoggedIn, questions.getCommentTree);

app.get('/candidate/session/becomeCandidate', login.isLoggedIn, candidate.becomeCandidate);
app.get('/candidate/session/getcandidateFavorite/:userID', login.isLoggedIn, candidate.getcandidateFavorite);
app.get('/candidate/session/updateCandidateFavorite/:candidateID', login.isLoggedIn, candidate.updateCandidateFavorite);
app.get('/candidate/session/getcandidatebyState/:state', login.isLoggedIn, candidate.getcandidatebyState);

//connecting the express object to listen on a particular port as defined in the config object.
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
