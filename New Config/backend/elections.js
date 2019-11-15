
mysqlconnection = require('./oursql.js');

exports.getElectionsInCities = function(req,res){
    mysqlconnection.query(`SELECT location FROM ELECTIONS WHERE level = 'city';`, function(err,rows,fields){
        res.send(rows);
    })
}