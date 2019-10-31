var mysqlconnection;

exports.setConnection = function(input){
    mysqlconnection = input;
}

exports.getAdminLevel = function(req,res){
    res.send(`${req.session.adminLevel}`);
}