This is the backend files for Election Buddy
There are two distinct parts, a mysql server, and an api express server which interacts with the mysql database

Here is the API Routes:

DEVELOPMENT ROUTES

/setupDB
This function loads the sample data into the local database and connects to the local database

/useDevDB
Connects to the local dev database

/useProdDB
connects to the external production database

ACCOUNT ROUTES

/login/create/:user/:fname/:lname/:pass/:email
Creates an account based on the input information

/login/login/:user/:pass
Tries to login into an account at that username and password

/login/updateEmail/:user/:email
updates the email of a the user

/login/getEmai/:user
gets the email of a specific username

/login/getUserId/:user
gets the userID of a username

/login/session/getUserId
gets the id of the logged in user

/login/session/updatePasword/:newPass
updates the login of the current user to newPassword

VOTER ROUTES

/voter/session/setVoter
Adds the currently logged in voter to the voter table

/voter/session/updateCity/:city
Adds the current voters city to the table

/voter/session/getCitySession
returns the current voters city

/voter/sesion/updateCounty/:county
Adds the current voters county to the table

/voter/session/getCountySession
Returns the current county to the table

/voter/session/getVoterList/:partyCode/:state/:city/:zipCode
If zip code is not Zero, returns a list of all voters that match that zip code and party Code.
If zip code is zero and city is not Zero, returns a list of all voters that match that city code and party Code
If zip code and cityCode is zero, returns a list of all voters that match that state and party code

/voter/sesson/getZipCodeSession
returns the current voters Zip Code Session

PARTY ROUTES

/party/createParty/:party
addas a party with that name to the table

/party/getPartyName/:partyCode
returns the partyCode that matches the party name

/party/getPartyCode/:partyName
returns the party code of that party name

ADMIN ROUTES
/admin/session/getAdminLevel
retursn the admin level of the current user

/admin/session/verify/:ID
verifies the candidate of the ID variable

CANDIDATE ROUTES
/candidate/session/becomeCandidate
the current user becomes a candidate

QUESTION ROUTES
/questions/session/createQuestion/:question_ID/:question_Time/:asker_ID/:askee_ID/:question
Adds a question to question to the table

/questions/session/getQuestion/:question_ID
returns the question at that question_ID

/questions/session/removeQuestion/:question_ID
removes a question at that Question_ID

/questions/session/updateQuestion/:question_ID/:update_Time/:question2
Updates the text and time of a question

/questions/session/createComment/:comment_Time/:commenter_ID/:commentee_ID/:user_ID/:comment
Creates a comment on the question at commentee_ID

/questions/session/getComment/:comment_ID
returns the comment at the comment_ID

/questions/session/removeQuestion/:comment_ID
soft removal of questions at the comment id

/questions/session/updateComment/:comment_ID/:update_Time/:comment2
updates the comment and comment ID

/questions/session/getQuestionTree/:question_ID
returns the comments on question_ID

/question/session/getCommentTree/:commentee_ID
returns the comment tree for a comment