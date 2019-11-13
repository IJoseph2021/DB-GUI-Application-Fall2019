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

CREATE TABLE `electionBuddy`.`CANDIDATE_QUESTION` (
  `question_ID` INT NOT NULL AUTO_INCREMENT,
  `question_Time` DATETIME NULL,
  `asker_ID` INT(8) NULL,
  `askee_ID` INT(8) NULL,
  `question` VARCHAR(120) NULL,
  PRIMARY KEY (`question_ID`),
  INDEX `asker_ID_idx` (`asker_ID` ASC) VISIBLE,
  INDEX `askee_ID_idx` (`askee_ID` ASC) VISIBLE,
  CONSTRAINT `asker_ID`
    FOREIGN KEY (`asker_ID`)
    REFERENCES `electionBuddy`.`USER` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `askee_ID`
    FOREIGN KEY (`askee_ID`)
    REFERENCES `electionBuddy`.`CANDIDATE` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `electionBuddy`.`CANDIDATE_COMMENT` (
  `root_ID` INT(8) NOT NULL,
  `questionRoot` TINYINT NOT NULL,
  `comment_ID` INT(8) NOT NULL AUTO_INCREMENT,
  `comment_Time` DATETIME NOT NULL,
  `commenter_ID` INT(8) NOT NULL,
  `commentee_ID` INT(8) NOT NULL,
  `comment` VARCHAR(140) NOT NULL,
  PRIMARY KEY (`comment_ID`),
  INDEX `commenterID_idx` (`commenter_ID` ASC) VISIBLE,
  INDEX `commenteeID_idx` (`commentee_ID` ASC) VISIBLE,
  CONSTRAINT `commenterID`
    FOREIGN KEY (`commenter_ID`)
    REFERENCES `electionBuddy`.`USER` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `commenteeID`
    FOREIGN KEY (`commentee_ID`)
    REFERENCES `electionBuddy`.`USER` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `electionBuddy`.`ELECTIONS` (
  `electionID` INT NOT NULL AUTO_INCREMENT,
  `level` VARCHAR(30) NOT NULL,
  `location` VARCHAR(45) NOT NULL,
  `time` DATETIME NOT NULL,
  PRIMARY KEY (`electionID`));

CREATE TABLE `electionBuddy`.`ELECTION_CANDIDATES` (
  `electionID` INT NOT NULL,
  `userID` INT NOT NULL,
  INDEX `electionID_idx` (`electionID` ASC) VISIBLE,
  INDEX `electionCandidate_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `electionID`
    FOREIGN KEY (`electionID`)
    REFERENCES `electionBuddy`.`ELECTIONS` (`electionID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `electionCandidate`
    FOREIGN KEY (`userID`)
    REFERENCES `electionBuddy`.`CANDIDATE` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
