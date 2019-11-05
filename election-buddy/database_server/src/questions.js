var mysqlConnection;

exports.setConnection = function(newMysqlConnection){
    mysqlConnection = newMysqlConnection;
};

//Creates a question



exports.createQuestion = function(req,res){

    question_ID = req.params.question_ID;
    question_Time = req.params.question_Time;
    asker_ID = req.params.asker_ID;
    askee_ID = req.params.askee_ID;
    question = req.params.question;

    query = "INSERT INTO electionBuddy.CANDIDATE_QUESTION (question_ID, question_Time, asker_ID, askee_ID, question)"+
    " VALUES(\""+ question_ID + "\",\"" + question_Time + "\",\"" + asker_ID + "\",\"" + askee_ID + "\",\"" + question + "\");";

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