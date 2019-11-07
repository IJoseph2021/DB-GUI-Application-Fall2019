var mysqlConnection;

exports.createConnection = function(newMysqlConnection){
    mysqlConnection = newMysqlConnection;
};

//Creates a question

exports.createQuestion = function(req,res){

    question_ID = req.params.question_ID;
    question_Time = req.params.question_Time;
    asker_ID = req.params.asker_ID;
    askee_ID = req.params.askee_ID;
    question = req.params.question;
    active = 1;
    update_Time = req.params.question_Time

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
    qID = req.params.question_ID

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
    qID = req.params.question_ID
    question2 = req.params.question2
    update_Time = req.params.update_Time

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