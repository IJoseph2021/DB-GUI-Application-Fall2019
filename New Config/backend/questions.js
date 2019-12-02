
const mysqlConnection = require('./oursql.js');

//Creates a question

exports.createQuestion = function(req,res){

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    //question_ID = req.params.question_ID;
    question_Time = dateTime;
    asker_ID = req.params.asker_ID;
    askee_ID = req.params.askee_ID;
    question = req.params.question;
    active = 1;
    update_Time = dateTime;

    query = "INSERT INTO electionBuddy.CANDIDATE_QUESTION (question_ID, question_Time, asker_ID, askee_ID, question, active, update_Time)"+
    " VALUES(\""+ question_ID + "\",\"" + question_Time + "\",\"" + asker_ID + "\",\"" + askee_ID + "\",\"" + question + "\",\"" + active + "\",\"" + update_Time + "\" );";

    console.log(query);
    mysqlConnection.query(query, 
        function(err,rows,fields){
            if(err){
                res.send("Question Creation Failed");
                }
            else {
                res.send("Question Created");
            }
        });
    
}

exports.getQuestion = function(req, res){
    userID = req.session.userId;
    qID = req.params.question_ID;

    console.log(`SELECT question FROM CANDIDATE_QUESTION WHERE question_ID = '${qID}';`);
    mysqlConnection.query(`SELECT question FROM CANDIDATE_QUESTION WHERE question_ID = '${qID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].question);
        }
        else{
            res.send("question not found");
        }
    });
}

//soft remove
exports.removeQuestion = function(req, res){
    qID = req.params.question_ID
    console.log(`UPDATE CANDIDATE_QUESTION SET active = 0 WHERE question_ID = '${qID}';`);
    mysqlConnection.query(`UPDATE CANDIDATE_QUESTION SET active = 0 WHERE question_ID = '${qID}';`,function(err,rows,fields){
    
        if(err){
            res.send("Question Remove Failed");
            }
        else {
            res.send("Changed to inactive... soft remove");
        }        
    });
}

exports.updateQuestion = function(req, res){
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    qID = req.params.question_ID;
    question2 = req.params.question2;
    update_Time = dateTime;

    console.log(`UPDATE CANDIDATE_QUESTION SET question = '${question2}', update_Time = '${update_Time}' WHERE question_ID = '${qID}';`);
    mysqlConnection.query(`UPDATE CANDIDATE_QUESTION SET question = '${question2}', update_Time = '${update_Time}' WHERE question_ID = '${qID}';`,function(err,rows,fields){
        if(err){
            res.send("Error Updating Question");
        }
        else{
            res.send("Question updated with new time stamp");
        }
    });
}


//remove, reply, soft delete, time stamps for create and update

exports.createComment = function(req, res){
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    comment_Time = dateTime;
    //commenter_ID = req.params.commenter_ID;
    commentee_ID = req.params.commentee_ID;
    user_ID = req.params.user_ID;
    comment = req.params.comment;
    active = 1;
    update_Time = dateTime;

    query = "INSERT INTO electionBuddy.COMMENT (comment_Time, commenter_ID, commentee_ID, user_ID, comment, active, update_Time)"+
    " VALUES(\""+ comment_Time + "\",\"" + commenter_ID + "\",\"" + commentee_ID + "\",\"" + user_ID + "\",\"" + comment + "\",\"" + active + "\",\"" + update_Time + "\" );";

    console.log(query);
    mysqlConnection.query(query, 
        function(err,rows,fields){
            if(err){
                res.send("Comment Creation Failed");
                }
            else {
                res.send("Comment Created");
            }
        });
}

exports.getComment = function(req, res){
    cID = req.params.commenter_ID

    console.log(`SELECT comment FROM COMMENT WHERE commenter_ID = '${cID}';`);
    mysqlConnection.query(`SELECT comment FROM COMMENT WHERE commenter_ID = '${cID}';`,function(err,rows,fields){
        if(rows[0] != undefined){
            res.send(rows[0].comment);
        }
        else{
            res.send("comment not found");
        }
    });
}

exports.removeComment = function(req, res){
    cID = req.params.commenter_ID
    console.log(`UPDATE COMMENT SET active = 0 WHERE commenter_ID = '${cID}';`);
    mysqlConnection.query(`UPDATE COMMENT SET active = 0 WHERE commenter_ID = '${cID}';`,function(err,rows,fields){
    
        if(err){
            res.send("Comment Remove Failed");
            }
        else {
            res.send("Changed to inactive... soft remove");
        }        
    });
}

exports.updateComment = function(req, res){

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    cID = req.params.commenter_ID;
    comment2 = req.params.comment2;
    update_Time = dateTime;

    console.log(`UPDATE COMMENT SET comment = '${comment2}', update_Time = '${update_Time}' WHERE commenter_ID = '${cID}';`);
    mysqlConnection.query(`UPDATE COMMENT SET comment = '${comment2}', update_Time = '${update_Time}' WHERE commenter_ID = '${cID}';`,function(err,rows,fields){
        if(err){
            res.send("Error Updating Comment");
        }
        else{
            res.send("Comment updated with new time stamp");
        }
    });
}

exports.getQuestionTree = function(req, res){
    qID = req.params.question_ID
    query = "SELECT comment FROM COMMENT WHERE COMMENT.commentee_ID = \'" + qID + "\'" +
    "AND COMMENT.active = \"" + 1 + "\";";
    mysqlConnection.query(query,
        function(err,rows,fields){
            if(err){
                res.send("question not found");
            }
            else{
                //res.send(rows.comment);
                res.send(rows);
            }
        });
    }  
    
exports.getCommentTree = function(req, res){
    cID = req.params.commentee_ID
    query = "SELECT comment FROM COMMENT WHERE COMMENT.commentee_ID = \'" + cID + "\'" +
    "AND COMMENT.active = \"" + 1 + "\";";
    mysqlConnection.query(query,
        function(err,rows,fields){
            if(err){
                res.send("comment not found");
            }
            else{
                res.send(rows);
            }
        });
}

//not currently working do not use
exports.reportComment = function(req, res){
    cID = req.params.commentee_ID
    var email = 'electionbuddyReports@gmail.com';
    var subject = `'Report for ' + '${cID}'`;
    var emailBody = 'Hi EB Team,';

    //window.open("mailto:"+email+"?subject="+subject+"&body="+emailBody);
    
    window.location.href ="mailto:"+email+"?subject="+subject+"&body="+emailBody;

    if(err){
        res.send("Email Client Failed to Open");
    }
    else{
        res.send("Email Client Opened");
    }

}