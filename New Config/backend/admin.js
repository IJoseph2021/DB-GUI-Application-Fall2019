var mysqlconnection;

exports.createConnection = function(input){
    mysqlconnection = input;
}

exports.getAdminLevel = function(req,res){
    res.send(`${req.session.adminLevel}`);
}

exports.verifyCandidate = function(req,res){
    mysqlconnection.query(`UPDATE CANDIDATE SET verified = 1 WHERE userID = ${req.params.ID};`,function(err,row,fields){
        if(!err){
            res.send("updated");
        } else {
            res.send("err");
        }
    });
}

exports.isAdmin = function(req,res,next){
    userID = req.session.userId;
    mysqlconnection.query(`SELECT adminLevel FROM ADMIN WHERE userID = '${userID}';` ,function(err,row,fields){
        if(err || row[0] == undefined || row[0].adminLevel == undefined){
            req.session.adminLevel = false;
            req.session.save();
        } else {
            req.session.adminLevel = row[0].adminLevel;
            req.session.save();
        }
    });
    console.log("Admin Level: " + req.session.adminLevel);
    if(req.session.adminLevel == false){
        res.sendStatus(401);
    }else {
        return next();
    }
}