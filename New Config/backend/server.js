

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

const routes = [login,voter,party,admin,candidate];

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

var devConnect = mysql.createConnection({

  host: 'backend-db',
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
});

devConnect.connect(function(err){
  if(err)
    logger.error("can't connect to dev DB!");
})

app.get('./useDevServer')

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

app.get('/useDevDB', function(req,res){
  for(var i = 0; i < routes.length; i++){
    routes[i].createConnection(devConnect);
  }
  res.send("using dev db");
});

app.get('/useProdDB', function(req,res){
  for(var i = 0; i < routes.length; i++){
    routes[i].createConnection(connection);
  }
  res.send("using dev db");
});


app.get('/login/create/:user/:fname/:lname/:pass/:email', login.createAccount);


app.get('/login/login/:user/:pass', login.login);

app.get('/login/updateEmail/:user/:email', login.isLoggedIn, login.updateEmail);
app.get('/login/getEmail/:user', login.isLoggedIn, login.getEmail);

app.get('/login/getUserId/:user', login.isLoggedIn, login.getUserID);

app.get('/login/session/getUserId', login.isLoggedIn, login.getSessionUserId);

app.get('/login/session/updatePassword/:newPass', login.isLoggedIn,login.changePassword);

app.get('/voter/session/setVoter', login.isLoggedIn, voter.setVoter);

app.get('/voter/session/updateCity/:city', login.isLoggedIn, voter.updateCitySession);

app.get('/voter/session/getCitySession', login.isLoggedIn, voter.getCitySession);

app.get('/voter/session/updateCounty/:county', login.isLoggedIn, voter.updateCountySession);

app.get('/voter/session/getCountySession', login.isLoggedIn, voter.getCountySession);

app.get('/voter/session/updateParty/:partyName', login.isLoggedIn, voter.sessionUpdateParty);

app.get('/party/createParty/:party', login.isLoggedIn, party.createParty);
app.get('/party/getPartyName/:partyCode', party.getPartyName);
app.get('/party/getPartyCode/:partyName', party.getPartyCode);

app.get('/admin/session/getAdminLevel', login.isLoggedIn, admin.getAdminLevel);
app.get('/admin/session/verify/:ID',login.isLoggedIn,admin.isAdmin, admin.verifyCandidate);

app.get('/candidate/session/becomeCandidate',login.isLoggedIn, candidate.becomeCandidate);


//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

