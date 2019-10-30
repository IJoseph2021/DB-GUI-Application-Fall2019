USE electionBuddy;
CREATE TABLE USER (
	ID INT(8) PRIMARY KEY,
    username varchar(15) UNIQUE,
    fname varchar(20),
    lname varchar(20),
    passhash varchar(100),
    email varchar(30));
    
INSERT INTO USER VALUES
("12345678","ABC","Abe", "Atkins","password1","ABC@1213.com"),
("23456789","BCD","Brutus", "Broglio","password2","BCD@1214.com"),
("12456757","CDE","Corey", "Clark","password3","CDE@1215.com"),
("93285937","DEF","Dane", "Dabubu","password4","DEF@1216.com"),
("23894945","EFG","Elvis", "Eldorado","password5","EFG@1217.com"),
("93894587","FGH","Frederich", "Fontenot","password6","FGH@1218.com"),
("34353243","GHI","George", "Washington","password7","GHI@1219.com"),
("19829878","HIJ","John", "Adams","password8","HIJ@1311.com"),
("58769893","IJK","James", "Madison","password9","IJK@1312.com"),
("54899458","JKL","James", "Monroe","password10","JKL@1313.com");

CREATE TABLE CANDIDATE (
	userID INT(8),
    partyCode varchar(8),
    zipCode varchar(10),
    state varchar(2),
	city varchar(25)
);

INSERT INTO CANDIDATE VALUES
("99933933", "DEM", "40207", "Kentucky", "Louisville"),
("45454564", "REP", "40208", "Kentucky", "Louisville"),
("12312312", "IND", "40502", "Kentucky", "Lexington"),
("12678911", "DEM", "40507", "Kentucky", "Lexington"),
("89891212", "REP", "75205", "Texas", "Dallas"),
("45464748", "GREEN", "75206", "Texas", "Dallas"),
("12131456", "DEM", "75209", "Texas", "Dallas"),
("45453333", "REP", "75210", "Texas", "Dallas"),
("33445566", "DEM", "75211", "Texas", "Dallas");



CREATE TABLE ADMIN(
	userID INT(8),
    adminLevel INT(8)
);

INSERT INTO ADMIN VALUES
("12345678",0),
("23456789",3),
("12456757",0.5),
("93285937",2),
("23894945",3.5),
("93894587",4),
("34353243",1.5),
("19829878",3.5),
("58769893",2),
("54899458",1);

CREATE TABLE VOTER(
	userID INT(8),
    partyCode varchar(8),
    zipCode varchar(10),
    state varchar(2),
	city varchar(25)
);

INSERT INTO VOTER VALUES
("12345678", "REP", "40207", "Kentucky", "Louisville"),
("23456789", "REP", "40208", "Kentucky", "Louisville"),
("12456757", "DEM", "30301", "Georgia", "Atlanta"),
("93285937", "DEM", "40507", "Kentucky", "Lexington"),
("23894945", "IND", "75205", "Texas", "Dallas"),
("56478296", "DEM", "75206", "Texas", "Dallas"),
("16398635", "REP", "75209", "Texas", "Dallas"),
("21748269", "REP", "75229", "Texas", "Dallas"),
("92786541", "REP", "39506", "Mississippi", "Jackson"),
("28376937", "DEM", "39203", "Mississippi", "Jackson");

CREATE TABLE PARTY(
	partyCode varchar(8) PRIMARY KEY,
    partyName varchar(25)
);

INSERT INTO PARTY
("REP", "Republican"),
("DEM", "Democrat"),
("GREEN", "Green Party"),
("IND", "Independy"),
("LIB", "Libertarian");
    