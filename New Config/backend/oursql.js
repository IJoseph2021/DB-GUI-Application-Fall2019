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
  

var currentConnection = connection;



exports.query = function(query, queryFunction){
  currentConnection.query(query,queryFunction);
}
