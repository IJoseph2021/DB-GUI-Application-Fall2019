This is the backend files for Election Buddy
There are two distinct parts, a mysql server, and an api express server which interacts with the mysql database

Here is the API Routes:

LOGIN ROUTES

/login/create/:user/:fname/:lname/:pass/:email
Creates an account based on the input information

/login/login/:user/:pass
Tries to login into an account at that username and password

/login/getEmail/:user
gets the email of a user at a certain ID


/login/updateEmail/:user/:email
updates the email of a the user

login/getUserInfo/:user
gets all of the user info for a certain ID

/login/getUsername/:ID
gets the username of a certain ID

/login/getUserId/:user
gets the userID of a username

/login/getFname/:ID
gets the Fname of a user

/login/getLname/:ID
gets the lastname of a user

/login/getPassword/:ID
returns the password of the ID

/updatePassword/:user/:newpass
updates the password of the user at that ID

/login/updateEmail/:user/:email
updates the email of the user

/login/updateFName/:user/:fname
updates the first name of a user

/login/updateLName/:user/:lname
updates the last name of a user

/login/getAllRoles/:user
returns all of the roles the user fills


VOTER ROUTES

/voter/becomeVoter/:user
Adds the currently logged in voter to the voter table

/voter/getVoterInfo/:voter
Get the voter information

/voter/session/updateCity/:city
Adds the current voters city to the table

/voter/session/getCitySession
get the city session

/voter/sesion/updateCounty/:county
Adds the current voters county to the table

/voter/session/getCountySession
Returns the current county to the table

/voter/session/updateZipCodeSession/:zipCode
Update the zipcode

/voter/session/updateParty/:partyName
Updates the voter party

/voter/session/getVoterListZipCode/:partyCode/:zipCode
Gets voter list base on zipCode

/voter/session/getVoterListState/:partyCode/:state
Gets voter list bae on state

/voter/session/getVoterListCity/:partyCode/:city
Gets voter list base on city

/voter/sesson/getZipCodeSession
returns the current voters Zip Code Session

/voter/session/followTopic/:question_ID
Follow a question

/voter/session/unfollowTopic/:question_ID
Unfollow a question

voter/session/getFollowList
Get list of followed questions

voter/session/getCandidatesInElections/:partyCode/:locatio
Get List of electorates in elections based on location and party code

voter/session/getEligibility/:userID
Get list of eligible elections for voter

PARTY ROUTES

/party/createParty/:party
addas a party with that name to the table

/party/createPartyAndCode/:partyCode/:partyName
Create party and code

/party/getPartyName/:partyCode
returns the partyCode that matches the party name

/party/getPartyCode/:partyName
returns the party code of that party name

ADMIN ROUTES
/admin/session/getAdminLevel
retursn the admin level of the current user

/admin/session/verify/:ID
verifies the candidate of the ID variable

/admin/session/addElection/:level/:location/:time/:name
Adds an election with election information ofk level, location,time and name

/admin/addAdmin/:userAddingAdmin/:newAdmin/:adminLevel
Makes a user an admin

CANDIDATE ROUTES
/candidate/session/becomeCandidate
the current user becomes a candidate

/candidate/session/getcandidateFavorite/:voterId
Return the candidateId match the voter favorite

/candidate/session/updateCandidateFavorite/:voterId/:candidateId
Update candidate favorite

/candidate/session/getCandidatebyState/:state
Get candidate by state

/candidate/session/getCandidatebyzipCode/:zipCode
Get candidate by zipCode

/candidate/session/getCandidatebyCity/:city
Get candidate by city

candidate/session/getCandidatebypartyCode/:partyCode
Get candidate by partyCode

candidate/session/enterElection/:electionID/:level/:location
Candidate enter as election

/candidate/updateBio/:id/:bio
Updates a candidate bio

/candidate/getCandidateParty/:id
Get candidate party


QUESTION ROUTES
/questions/session/createQuestion/:asker_ID/:askee_ID/:question
Creates a questions

/questions/session/getQuestion/:question_ID
returns the question at that question_ID

/questions/session/removeQuestion/:question_ID
removes a question at that Question_ID

/questions/session/updateQuestion/:question_ID/:question2
Updates the text and time of a question

/questions/session/createComment/:commenter_ID/:user_ID/:comment
Creates a comment on the question

/questions/session/getComment/:commenter_ID
returns the comment at the commenter_ID

/questions/session/removeQuestion/:commenter_ID
soft removal of questions at the commenter_ID

/questions/session/updateComment/:commenter_ID/:comment2
updates the comment with new text an new time stamp

/questions/session/getQuestionTree/:question_ID
returns the comments on question_ID

/question/session/getCommentTree/:commentee_ID
returns the comment repiled for a comment

ELECTION ROUTES
/election/getElections/citiesWithElections
Gets city with the election

ISSUE ROUTES
/issues/createIssue/:name
Creates an issue with a specific name

/issues/markIssue/:user/:issue
allows a user to mark an issue as important to them

/issues/getUserIssues/:user
gets all issues a user has marked

/issues/addElectionIssue/:election/:issue
Adds a specific issue to an election

/issues/getELectionIssues/:election
gets all issues relevant to an election