USE ELECTIONBUDDY;
CREATE TABLE USER (
	ID INT(8) PRIMARY KEY,
    username varchar(15) UNIQUE,
    fname varchar(20),
    lname varchar(20),
    passhash varchar(100),
    email varchar(30));
    