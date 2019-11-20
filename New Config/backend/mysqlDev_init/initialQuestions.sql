
use electionBuddy;

ALTER TABLE CANDIDATE_QUESTION AUTO_INCREMENT = 1;

INSERT INTO CANDIDATE_QUESTION(question_Time,asker_ID, askee_ID, question)
     VALUES
    ("2019-04-22", "7", "6", "How much wood could a woodchuck chuck if a woodchuck could chuck wood"),
    ("2019-05-21", "11", "2", "Is Flat Earth the real deal?"),
    ("2019-03-03", "20", "8", "What is your stance on the position of Constable?"),
    ("2019-11-13", "19","8", "If you will go the end of the Earth for this position?"),
    ("2019-11-13", "22", "8", "What is the official survivor candy?");
