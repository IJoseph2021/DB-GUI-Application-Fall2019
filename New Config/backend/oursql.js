const mysql = require('mysql');

var connection = mysql.createPool({
    //db is the host and that name is assigned based on the 
    //container name given in the docker-compose file
    connectionLimit : 10,
    host: '34.67.95.217',
    port: '3306',
    user: 'root',
    password: 'dbpassword',
    database: 'electionBuddy'
  });
  
  //Setup for connecting to the dev mysql connection
  //Made by Steve Shoemaker
var devConnect = mysql.createConnection({
    connectionLimit : 10,
    host: 'backend-db',
    database: 'electionBuddy',
    port: '3306',
    user: 'user',
    password: 'password'
  });

var currentConnection = connection;

exports.useDevDB = function(){
    currentConnection = devConnect;
}

exports.useProdDB = function(){
    currentConnection = connection;
}

exports.connection = currentConnection;