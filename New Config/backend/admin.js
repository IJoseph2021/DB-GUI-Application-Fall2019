/*
This file handles the admin routes


*/
const mysqlconnection = require('./oursql.js');

//Steve
//Gets the admin level of the current user
exports.getAdminLevel = function(req,res){
    res.send(`${req.session.adminLevel}`);
}

//Verifies the candidate
exports.verifyCandidate = function(req,res){
    mysqlconnection.query(`UPDATE CANDIDATE SET verified = 1 WHERE userID = ${req.params.ID};`,function(err,row,fields){
        if(!err){
            res.send("updated");
        } else {
            res.send("err");
        }
    });
}

exports.addElection = function(req,res){
    console.log(`INSERT INTO ELECTIONS (level,location,time,name) VALUES ('${req.params.level}','${req.params.location}','${req.params.time}', '${req.params.name}');`);
    mysqlconnection.query(`INSERT INTO ELECTIONS (level,location,time,name) VALUES ('${req.params.level}','${req.params.location}','${req.params.time}', '${req.params.name}');`,function(err,rows,fields){
        if(err){
            console.log(err.message);
            res.send(err.message);
        }else res.send("succussful");
    })
}

//This function stores the admin level to the session
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

    if(req.session.adminLevel == false){
        res.sendStatus(401);
    }else {
        return next();
    }
}

exports.addAdmin = function(req,res){
    mysqlconnection.query(`SELECT adminLevel FROM ADMIN WHERE userId = ${req.params.userAddingAdmin};`, function(err,rows,fields){
        if(rows != undefined && rows.length!=0 && rows[0].adminLevel > 1 && rows[0].adminLevel >= req.params.adminLevel){
            mysqlconnection.query(`INSERT INTO ADMIN(userId, adminLevel) VALUES (${req.params.newAdmin}, ${req.params.adminLevel});`,function(err,rows,fields){
                if(!err){
                    res.send(200);
                } else res.send(404);
            })
        } else {
            res.send(404);
        }
    })

}