USE electionBuddy;

CREATE TABLE `electionBuddy`.`USER` (
  `ID` INT(8) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(15) NOT NULL,
  `fname` VARCHAR(20) NOT NULL,
  `lname` VARCHAR(45) NOT NULL,
  `passhash` VARCHAR(20) NOT NULL,
  `email` VARCHAR(30) NULL,
  PRIMARY KEY (`ID`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);


CREATE TABLE `electionBuddy`.`PARTY` (
  `partyCode` VARCHAR(8) NOT NULL,
  `partyName` VARCHAR(45) NULL,
  PRIMARY KEY (`partyCode`),
  UNIQUE INDEX `partyName_UNIQUE` (`partyName` ASC) VISIBLE);

CREATE TABLE `electionBuddy`.`CANDIDATE` (
  `userID` INT(8) NOT NULL,
  `partyCode` VARCHAR(8) NULL,
  `zipCode` VARCHAR(45) NULL,
  `state` VARCHAR(2) NULL,
  `city` VARCHAR(25) NULL,
  PRIMARY KEY (`userID`),
  INDEX `partyCode_idx` (`partyCode` ASC) VISIBLE,
  CONSTRAINT `userID`
    FOREIGN KEY (`userID`)
    REFERENCES `electionBuddy`.`USER` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `partyCode`
    FOREIGN KEY (`partyCode`)
    REFERENCES `electionBuddy`.`PARTY` (`partyCode`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `electionBuddy`.`VOTER` (
  `userID` INT(8) NOT NULL,
  `partyCode` VARCHAR(8) NULL,
  `zipCode` VARCHAR(45) NULL,
  `state` VARCHAR(2) NULL,
  `city` VARCHAR(25) NULL,
  PRIMARY KEY (`userID`),
  INDEX `partyCode_idx` (`partyCode` ASC) VISIBLE,
  CONSTRAINT `voterID`
    FOREIGN KEY (`userID`)
    REFERENCES `electionBuddy`.`USER` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `voterPartyCode`
    FOREIGN KEY (`partyCode`)
    REFERENCES `electionBuddy`.`PARTY` (`partyCode`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `electionBuddy`.`CANDIDATE_FAVORITE` (
  `user_ID` INT(8) NOT NULL,
  `candidate_ID` INT(8) NOT NULL,
  PRIMARY KEY (`user_ID`, `candidate_ID`),
  INDEX `candidateID_idx` (`candidate_ID` ASC) VISIBLE,
  CONSTRAINT `favoriterID`
    FOREIGN KEY (`user_ID`)
    REFERENCES `electionBuddy`.`USER` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `candidateID`
    FOREIGN KEY (`candidate_ID`)
    REFERENCES `electionBuddy`.`CANDIDATE` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `electionBuddy`.`ADMIN` (
  `userID` INT(8) NOT NULL,
  `adminLevel` INT(1) NULL,
  PRIMARY KEY (`userID`),
  CONSTRAINT `adminID`
    FOREIGN KEY (`userID`)
    REFERENCES `electionBuddy`.`USER` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `CANDIDATE_QUESTION` (
  `question_ID` int(11) NOT NULL AUTO_INCREMENT,
  `question_Time` datetime DEFAULT NULL,
  `asker_ID` int(8) DEFAULT NULL,
  `askee_ID` int(8) DEFAULT NULL,
  `question` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`question_ID`),
  UNIQUE KEY `uniqueQuestion` (`question_Time`,`asker_ID`,`question`,`askee_ID`),
  KEY `asker_ID_idx` (`asker_ID`),
  KEY `askee_ID_idx` (`askee_ID`),
  CONSTRAINT `askee_ID` FOREIGN KEY (`askee_ID`) REFERENCES `CANDIDATE` (`userID`),
  CONSTRAINT `asker_ID` FOREIGN KEY (`asker_ID`) REFERENCES `USER` (`ID`)
);

CREATE TABLE `CANDIDATE_COMMENT` (
  `commentID` int(11) NOT NULL AUTO_INCREMENT,
  `questionID` int(11) DEFAULT NULL,
  `commenterID` int(11) DEFAULT NULL,
  `commenteeID` int(11) DEFAULT NULL,
  `commentTime` datetime DEFAULT NULL,
  `comment` varchar(140) DEFAULT NULL,
  PRIMARY KEY (`commentID`),
  UNIQUE KEY `commentUniqueness` (`commenterID`,`comment`,`commentTime`,`questionID`),
  KEY `commenteeID_idx` (`commenteeID`),
  KEY `questionID_idx` (`questionID`),
  KEY `commenterID_idx` (`commenterID`),
  CONSTRAINT `commenteeID` FOREIGN KEY (`commenteeID`) REFERENCES `USER` (`ID`),
  CONSTRAINT `commenterID` FOREIGN KEY (`commenterID`) REFERENCES `USER` (`ID`),
  CONSTRAINT `questionID` FOREIGN KEY (`questionID`) REFERENCES `CANDIDATE_QUESTION` (`question_ID`)
);


CREATE TABLE `ELECTIONS` (
  `electionID` int(11) NOT NULL AUTO_INCREMENT,
  `level` varchar(30) NOT NULL,
  `location` varchar(45) NOT NULL,
  `time` datetime NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`electionID`),
  UNIQUE KEY `Unique Election` (`name`,`time`,`level`,`location`)
);

CREATE TABLE `ELECTION_CANDIDATES` (
  `electionID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  UNIQUE KEY `uniqueElectionDandidates` (`electionID`,`userID`),
  KEY `electionID_idx` (`electionID`),
  KEY `electionCandidate_idx` (`userID`),
  CONSTRAINT `electionCandidate` FOREIGN KEY (`userID`) REFERENCES `CANDIDATE` (`userID`),
  CONSTRAINT `electionID` FOREIGN KEY (`electionID`) REFERENCES `ELECTIONS` (`electionID`)
);
