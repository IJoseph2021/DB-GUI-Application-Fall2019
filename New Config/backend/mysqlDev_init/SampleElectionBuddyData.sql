CREATE DATABASE  IF NOT EXISTS `electionBuddy` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `electionBuddy`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: electionBuddy
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ADMIN`
--

DROP TABLE IF EXISTS ADMIN;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ADMIN` (
  userID int(8) NOT NULL,
  adminLevel int(1) DEFAULT NULL,
  PRIMARY KEY (userID),
  CONSTRAINT adminID FOREIGN KEY (userID) REFERENCES `USER` (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ADMIN`
--

INSERT INTO ADMIN VALUES (5,3);

--
-- Table structure for table `CANDIDATE`
--

DROP TABLE IF EXISTS CANDIDATE;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE CANDIDATE (
  userID int(8) NOT NULL,
  partyCode varchar(8) DEFAULT NULL,
  zipCode varchar(45) DEFAULT NULL,
  state varchar(2) DEFAULT NULL,
  city varchar(25) DEFAULT NULL,
  PRIMARY KEY (userID),
  KEY partyCode_idx (partyCode),
  CONSTRAINT partyCode FOREIGN KEY (partyCode) REFERENCES PARTY (partyCode),
  CONSTRAINT userID FOREIGN KEY (userID) REFERENCES `USER` (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CANDIDATE`
--

INSERT INTO CANDIDATE VALUES (1,'DEM','72566','TX','Huoston');
INSERT INTO CANDIDATE VALUES (2,'FES','90278','CA','Los Angeles');
INSERT INTO CANDIDATE VALUES (3,'REP','75275','TX','Austin');
INSERT INTO CANDIDATE VALUES (6,'DEM','90038','CA','Los Angeles');
INSERT INTO CANDIDATE VALUES (8,'REP','90266','CA','Los Angeles');

--
-- Table structure for table `CANDIDATE_FAVORITE`
--

DROP TABLE IF EXISTS CANDIDATE_FAVORITE;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE CANDIDATE_FAVORITE (
  user_ID int(8) NOT NULL,
  candidate_ID int(8) NOT NULL,
  KEY candidateID_idx (candidate_ID),
  KEY favoriterID_idx (user_ID),
  CONSTRAINT candidateID FOREIGN KEY (candidate_ID) REFERENCES CANDIDATE (userID),
  CONSTRAINT favoriterID FOREIGN KEY (user_ID) REFERENCES VOTER (userID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CANDIDATE_FAVORITE`
--

INSERT INTO CANDIDATE_FAVORITE VALUES (4,2);
INSERT INTO CANDIDATE_FAVORITE VALUES (18,3);
INSERT INTO CANDIDATE_FAVORITE VALUES (18,6);
INSERT INTO CANDIDATE_FAVORITE VALUES (18,8);

--
-- Table structure for table `CANDIDATE_QUESTION`
--

DROP TABLE IF EXISTS CANDIDATE_QUESTION;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE CANDIDATE_QUESTION (
  question_ID int(11) NOT NULL AUTO_INCREMENT,
  question_Time datetime DEFAULT NULL,
  asker_ID int(8) DEFAULT NULL,
  askee_ID int(8) DEFAULT NULL,
  question varchar(120) DEFAULT NULL,
  `active` tinyint(4) DEFAULT '0',
  PRIMARY KEY (question_ID),
  UNIQUE KEY uniqueQuestion (question_Time,asker_ID,question,askee_ID),
  KEY asker_ID_idx (asker_ID),
  KEY askee_ID_idx (askee_ID),
  CONSTRAINT askee_ID FOREIGN KEY (askee_ID) REFERENCES CANDIDATE (userID),
  CONSTRAINT asker_ID FOREIGN KEY (asker_ID) REFERENCES `USER` (ID)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CANDIDATE_QUESTION`
--

INSERT INTO CANDIDATE_QUESTION VALUES (1,'2019-04-22 00:00:00',7,6,'How much wood could a woodchuck chuck if a woodchuck could chuck wood',0);
INSERT INTO CANDIDATE_QUESTION VALUES (2,'2019-05-21 00:00:00',11,2,'Is Flat Earth the real deal?',0);
INSERT INTO CANDIDATE_QUESTION VALUES (3,'2019-03-03 00:00:00',20,8,'What is your stance on the position of Constable?',0);
INSERT INTO CANDIDATE_QUESTION VALUES (4,'2019-11-13 00:00:00',19,8,'If you will go the end of the Earth for this position?',0);
INSERT INTO CANDIDATE_QUESTION VALUES (5,'2019-11-13 00:00:00',22,8,'What is the official survivor candy?',1);

--
-- Table structure for table `COMMENT`
--

DROP TABLE IF EXISTS COMMENT;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMMENT` (
  commentID int(11) NOT NULL AUTO_INCREMENT,
  questionID int(11) DEFAULT NULL,
  commenterID int(11) DEFAULT NULL,
  commenteeID int(11) DEFAULT NULL,
  commentTime datetime DEFAULT NULL,
  `comment` varchar(140) DEFAULT NULL,
  `active` tinyint(4) DEFAULT '0',
  PRIMARY KEY (commentID),
  UNIQUE KEY commentUniqueness (commenterID,`comment`,commentTime,questionID),
  KEY commenteeID_idx (commenteeID),
  KEY questionID_idx (questionID),
  KEY commenterID_idx (commenterID),
  CONSTRAINT commenteeID FOREIGN KEY (commenteeID) REFERENCES `USER` (ID),
  CONSTRAINT commenterID FOREIGN KEY (commenterID) REFERENCES `USER` (ID),
  CONSTRAINT questionID FOREIGN KEY (questionID) REFERENCES CANDIDATE_QUESTION (question_ID)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMMENT`
--

INSERT INTO COMMENT VALUES (1,1,3,7,'2019-04-23 00:00:00','some wood',0);
INSERT INTO COMMENT VALUES (2,2,6,11,'2019-04-24 00:00:00','the earth is flat, prove that its not lol',0);
INSERT INTO COMMENT VALUES (3,3,7,20,'2019-03-03 00:00:00','idk',1);

--
-- Table structure for table `ELECTIONISSUES`
--

DROP TABLE IF EXISTS ELECTIONISSUES;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE ELECTIONISSUES (
  issueId int(11) NOT NULL,
  electionId int(11) NOT NULL,
  KEY issueID_idx (issueId),
  KEY electionIssueId_idx (electionId),
  CONSTRAINT electionWithIssue FOREIGN KEY (electionId) REFERENCES ELECTIONS (electionID),
  CONSTRAINT issueBeingPressed FOREIGN KEY (issueId) REFERENCES ISSUES (idISSUES)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTIONISSUES`
--

INSERT INTO ELECTIONISSUES VALUES (4,1);
INSERT INTO ELECTIONISSUES VALUES (5,2);
INSERT INTO ELECTIONISSUES VALUES (6,3);

--
-- Table structure for table `ELECTIONS`
--

DROP TABLE IF EXISTS ELECTIONS;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE ELECTIONS (
  electionID int(11) NOT NULL AUTO_INCREMENT,
  `level` varchar(30) NOT NULL,
  location varchar(45) NOT NULL,
  `time` datetime NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (electionID),
  UNIQUE KEY `Unique Election` (`name`,`time`,`level`,location)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTIONS`
--

INSERT INTO ELECTIONS VALUES (1,'city','Los Angeles','2020-11-02 00:00:00','Los Angeles Mayor');
INSERT INTO ELECTIONS VALUES (3,'zip','90278','2019-12-05 00:00:00','Sherrif');
INSERT INTO ELECTIONS VALUES (2,'state','TX','2020-11-02 00:00:00','Texas Governer');

--
-- Table structure for table `ELECTION_CANDIDATES`
--

DROP TABLE IF EXISTS ELECTION_CANDIDATES;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE ELECTION_CANDIDATES (
  electionID int(11) NOT NULL,
  userID int(11) NOT NULL,
  UNIQUE KEY uniqueElectionDandidates (electionID,userID),
  KEY electionID_idx (electionID),
  KEY electionCandidate_idx (userID),
  CONSTRAINT electionCandidate FOREIGN KEY (userID) REFERENCES CANDIDATE (userID),
  CONSTRAINT electionID FOREIGN KEY (electionID) REFERENCES ELECTIONS (electionID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ELECTION_CANDIDATES`
--

INSERT INTO ELECTION_CANDIDATES VALUES (1,2);
INSERT INTO ELECTION_CANDIDATES VALUES (1,8);
INSERT INTO ELECTION_CANDIDATES VALUES (2,1);
INSERT INTO ELECTION_CANDIDATES VALUES (2,3);
INSERT INTO ELECTION_CANDIDATES VALUES (3,6);

--
-- Table structure for table `HOT_TOPIC`
--

DROP TABLE IF EXISTS HOT_TOPIC;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE HOT_TOPIC (
  user_ID int(8) NOT NULL,
  question_ID int(11) NOT NULL,
  KEY favoritedQuestion_idx (question_ID),
  KEY userWhoFavoritedQuestion_idx (user_ID),
  CONSTRAINT favoritedQuestion FOREIGN KEY (question_ID) REFERENCES CANDIDATE_QUESTION (question_ID),
  CONSTRAINT userWhoFavoritedQuestion FOREIGN KEY (user_ID) REFERENCES `USER` (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HOT_TOPIC`
--

INSERT INTO HOT_TOPIC VALUES (7,1);
INSERT INTO HOT_TOPIC VALUES (10,1);
INSERT INTO HOT_TOPIC VALUES (20,3);
INSERT INTO HOT_TOPIC VALUES (15,5);

--
-- Table structure for table `ISSUES`
--

DROP TABLE IF EXISTS ISSUES;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE ISSUES (
  idISSUES int(11) NOT NULL AUTO_INCREMENT,
  issueName varchar(45) DEFAULT NULL,
  PRIMARY KEY (idISSUES),
  UNIQUE KEY issueName_UNIQUE (issueName)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ISSUES`
--

INSERT INTO ISSUES VALUES (5,'Health Care');
INSERT INTO ISSUES VALUES (6,'Taxes');
INSERT INTO ISSUES VALUES (4,'Water');

--
-- Table structure for table `PARTY`
--

DROP TABLE IF EXISTS PARTY;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE PARTY (
  partyCode varchar(8) NOT NULL,
  partyName varchar(45) DEFAULT NULL,
  PRIMARY KEY (partyCode),
  UNIQUE KEY partyName_UNIQUE (partyName)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PARTY`
--

INSERT INTO PARTY VALUES ('DEM','Democrat');
INSERT INTO PARTY VALUES ('FES','Flat Earth Society');
INSERT INTO PARTY VALUES ('GREEN','Green Party');
INSERT INTO PARTY VALUES ('LBRT','Libertarian');
INSERT INTO PARTY VALUES ('REP','Republican');

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS USER;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  ID int(8) NOT NULL AUTO_INCREMENT,
  username varchar(15) NOT NULL,
  fname varchar(20) NOT NULL,
  lname varchar(45) NOT NULL,
  passhash varchar(20) NOT NULL,
  email varchar(30) DEFAULT NULL,
  PRIMARY KEY (ID),
  UNIQUE KEY username_UNIQUE (username)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

INSERT INTO USER VALUES (1,'ddavidson','Doug','Davidson','fido','ddavidson@gmail.com');
INSERT INTO USER VALUES (2,'theShoe','Stephen','Shoemaker','password','shoe@maker.com');
INSERT INTO USER VALUES (3,'theCruze','Ted','Cruz','zKiller','the@TedCruz.org');
INSERT INTO USER VALUES (4,'Superman','Clark','Kent','kryptonite','reporter@genericNewsSite.org');
INSERT INTO USER VALUES (5,'theEmancipator','Abraham','Lincoln','fourscore','abraham@gmail.com');
INSERT INTO USER VALUES (6,'daFoeee','William','Dafoe','liamHemsworth','william@daFoundation.com');
INSERT INTO USER VALUES (7,'smartestMan','Rick','Sanchez','pirates','spaceGuy@gmail.com');
INSERT INTO USER VALUES (8,'survivorGuy','Jeff','Probst','immunityIdol','jeff@abc.com');
INSERT INTO USER VALUES (9,'firstMan','Goerge','Washington','cherryTree','noLie@gmail.com');
INSERT INTO USER VALUES (10,'dimaVoter','Doug','Dimmadome','dimmapassword','doug@dimmadome.org');
INSERT INTO USER VALUES (11,'boyWhoLived','Harry','Potter','parseltounge','hpotter@hogwarts.edu');
INSERT INTO USER VALUES (12,'voldemort','Tom','Riddle','nagini','triddle@hogwarts.edu');
INSERT INTO USER VALUES (13,'RightIsRight','Arthur','Pendragon','Merlin','aPendragon@camelot.gov');
INSERT INTO USER VALUES (14,'MightIsRight','Mordred','Pendragon','Morgana','mPendragon@camelot.gov');
INSERT INTO USER VALUES (15,'oldMan','Merlyn','Merlyn','nimue','Merlyn@camelot.gov');
INSERT INTO USER VALUES (16,'jDoe','John','Doe','generic','jDoe@gmail.com');
INSERT INTO USER VALUES (17,'bridgeBoy','Kaladin','Stormborn','syl','kal@bridgeFour.gov');
INSERT INTO USER VALUES (18,'survivor','Kelsier','lowBorn','eleventh','kelsier@aol.com');
INSERT INTO USER VALUES (19,'jMat68','Jared','Matson','KendallJenner123','jdog@flatEarth.com');
INSERT INTO USER VALUES (20,'mickysweets','Maxwell','Case','yitties','maxwellCase@gmail.com');
INSERT INTO USER VALUES (21,'Jumbo','Juan','Arias','francis15','jArias@hotmail.com');
INSERT INTO USER VALUES (22,'Cubert','Carlos','Arazoza','pitterPatter','balls@tugg.com');

--
-- Table structure for table `USERISSUES`
--

DROP TABLE IF EXISTS USERISSUES;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE USERISSUES (
  issueId int(11) NOT NULL,
  userId int(11) NOT NULL,
  KEY issueID (issueId),
  KEY userWhoHasIssues_idx (userId),
  CONSTRAINT issueID FOREIGN KEY (issueId) REFERENCES ISSUES (idISSUES),
  CONSTRAINT userWhoHasIssues FOREIGN KEY (userId) REFERENCES `USER` (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERISSUES`
--

INSERT INTO USERISSUES VALUES (4,2);
INSERT INTO USERISSUES VALUES (4,3);
INSERT INTO USERISSUES VALUES (5,10);
INSERT INTO USERISSUES VALUES (5,5);
INSERT INTO USERISSUES VALUES (5,1);
INSERT INTO USERISSUES VALUES (5,7);
INSERT INTO USERISSUES VALUES (6,13);

--
-- Table structure for table `VOTER`
--

DROP TABLE IF EXISTS VOTER;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE VOTER (
  userID int(8) NOT NULL,
  partyCode varchar(8) DEFAULT NULL,
  zipCode varchar(45) DEFAULT NULL,
  state varchar(2) DEFAULT NULL,
  city varchar(25) DEFAULT NULL,
  PRIMARY KEY (userID),
  KEY partyCode_idx (partyCode),
  CONSTRAINT voterID FOREIGN KEY (userID) REFERENCES `USER` (ID),
  CONSTRAINT voterPartyCode FOREIGN KEY (partyCode) REFERENCES PARTY (partyCode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VOTER`
--

INSERT INTO VOTER VALUES (4,'FES','90278','CA','Los Angeles');
INSERT INTO VOTER VALUES (11,'DEM','90278','CA','Los Angeles');
INSERT INTO VOTER VALUES (13,'REP','72566','TX','Huoston');
INSERT INTO VOTER VALUES (17,'DEM','75266','TX','Huoston');
INSERT INTO VOTER VALUES (18,'REP','90278','CA','Los Angeles');
INSERT INTO VOTER VALUES (19,'FES','90266','CA','Los Angeles');
INSERT INTO VOTER VALUES (20,'DEM','90067','CA','Los Angeles');
INSERT INTO VOTER VALUES (21,'REP','75275','TX','Austin');
INSERT INTO VOTER VALUES (22,'FES','33468','CA','Los Angeles');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
