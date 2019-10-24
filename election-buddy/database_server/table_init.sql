USE electionBuddy;
CREATE TABLE USER (
	ID INT(8) PRIMARY KEY,
    username varchar(15) UNIQUE,
    fname varchar(20),
    lname varchar(20),
    passhash varchar(100),
    email varchar(30));
CREATE TABLE CANDIDATE (
	userID INT(8),
    partyCode INT(8),
    zipCode varchar(10),
    state varchar(2),
	city varchar(25)
);

CREATE TABLE ADMIN(
	userID INT(8),
    adminLevel INT(8)
);

CREATE TABLE VOTER(
	userID INT(8),
    partyCode INT(8),
    zipCode varchar(10),
    state varchar(2),
	city varchar(25)
);

CREATE TABLE PARTY(
	partyCode INT(8) PRIMARY KEY,
    partyName varchar(25)
);
    