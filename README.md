# Job-Interview-Preperation
Job interview preparation questions system database and Frontend

[replit](https://Job-Interview-Preperation.amirangel.repl.co)

# Table of Contents
- [Job-Interview-Preperation](#job-interview-preperation)
  * [Features](#features)
  * [MongoDB Usage](#mongodb-usage)
  * [Security](#security)
    + [Administrator tools](#administrator-tools)
    + [delete endpoint](#delete-endpoint)
    + [Set Score Endpoint](#set-score-endpoint)
- [Incident Postmortem](#incident-postmortem)
  * [Admin Controls](#admin-controls)
  * [Set Score Endpoint Vulnerability](#set-score-endpoint-vulnerability)
  * [Create Question Vulnerability](#create-question-vulnerability)
  * [Update Question Vulnerability](#update-question-vulnerability)

## Features
* Short quiz of user written questions
* Save score to leaderboard
* Working leaderboard
* Question creation
* Administrator tools

## MongoDB Usage
All queries can be found in admin-features branch in back/scripts/mongo/queries here are some of my favorite functions   
Here is my function for adding or updating a players score,  
If the player does not exist it creates a new entry, and it only updates the score if it is greater than the previous.  
```js
async function addOrUpdate(name, score) {
  //If name not in db create, only update if score is larger than cur score
  return await User.updateOne({ name }, { $max: { score } }, { upsert: true });
}
```
Find all questions and sort them by difficulty  
```js
async function getAllQuestions() {
  return await Question.find({}).sort({ difficulty: 1 });
}
```

## Security
The security is very weak for this project as I do not know yet how to implement it well  
I did however though, add some small security features.  
### Administrator tools
The administrator tools page is protected by a password barrier, the page is only ever loaded when the server authorizes is via a password, but I am certain there is a awy around it.  
### delete endpoint
The delte endpoint is protected by an auth that is stored in the backend .env file, each delete must come with that auth otherwise it will return 401 error code  
```js
router.delete('', async (req, res, next) => {
  try {
    const id = req.body.id;
    const auth = req.headers.auth;
    if (auth !== process.env.PASSWORD) throw errorCodes.badAuth;
    if (!id) throw errorCodes.requestInputInvalid;
    const mongoRes = await questionQueries.deleteQuestionById(id);
    res.json({ message: mongoRes });
  } catch (error) {
    next(error);
  }
});
```
### Set Score Endpoint
You can no longer just send your score to the server, the server now tracks the users score with it's unique session id, and only save the score after it is validated.
This took a hell of a long time to implement.  
Some snippets:  
Creation of session UUID
```js
if (newSession) {
  //Create unique session
  newSession = uuidv4();
  sessions[newSession] = { score: 0, qIndex: 0 };
}
```  
Server tracks score  
```js
//Check answer
const { correct, diff } = await questionQueries.checkQuestion(id, answer);
const userSession = sessions[session];
if (!userSession) throw errorCodes.sessionDoesNotExists;
if (correct) {
  if ((await getMaxQ()) > userSession.qIndex) {
    userSession.score += diff;
  } else throw errorCodes.badAuth;
}
 ```
 Server Validates Score
 ```js
const userSession = sessions[session];
if(!userSession) throw errorCodes.sessionDoesNotExists;
if (score != userSession.score) throw errorCodes.niceTryScrub;
const mongoRes = await userQueries.addOrUpdate(name, score);
delete userSession;
 ```

# Incident Postmortem
The internet is a dangerous place with many malicous users. I was confident with my security so I challanged one of them.    
<img width="213" alt="challange" src="https://user-images.githubusercontent.com/36531255/141794433-80580487-748c-437f-b844-39a9ade27a84.PNG">

## Admin Controls
### Summary
The admin controls page could be visited by anyone, including malicious and regular users. A malicous user deleted all questions.
### Fault and Impact
The button was protected by a password however the page was not, users could just navigate to /admin.html as a result all questions were deleted  
### Response and Recovery  
I added a password to the admin page itself, and manually added the questions again  
### Leasons Learned  
Do not protect the DOM elements protect the entire page.
## Set Score Endpoint Vulnerability
### Summary
The set score endpoint did not validate the score whatsover as a result a malicuos users took advantage of that and gave himself a score of 49239213123  
### Fault and Impact
Due to the poor security of the set score endpoint a malicious user gave himself an unfair and impossible score.  
### Discovery  
I knew that this was possible before fixing I didn't think somebody would do it :P
### Response and Recovery  
Score was tracked by the backend server, checking each answer and counting the score, at the end comparing front end and back end scores and validating them, the malicous users score was manually set to -420 as a punishment.
### Leasons Learned  
All endpoints should be protected and validated.  
## Create Question Vulnerability
### Summary  
It is possible to create a question with a difficulty of 0 - 10, a malicous user created one with 42193193 difficulty resulting in a very high score.  
### Fault and Impact 
This was possible because the backend relied on valid input from the frontend (which capped difficulty at 10) however I didn;t take to account that a user can manually send requests to create questions.
### Discovery
I opened administrator tools and found the manipulated question.
### Response and Recovery 
I added input validation to the create question endpoint so that a difficulty over 10 is not possible. I decided to keep the malicous users score a reminder of how easy it is to make mistakes. 
### Leasons Learned  
Do not rely on the frontend for valid input, always validate input on the backend. 
## Update Question Vulnerability
### Summary  
In order to bypass the newly added validation of my create question endpoint a malicous users found a way to add a question with a high difficulty by using the update question endpoint.
### Fault and Impact
I completely forgot I had an update question endpoint, as a result when patching the previous vulnerability, I forgot to patch this endpoint, resulting in the malicious users beating me again :(
### Discovery
At first I could not find the vulnurability, so I asked the malicous person via an anonymous site https://xoyondo.com/mb/wxYehXDJyoGRXM5/2RnKFZHANY.   
<img width="219" alt="mercy" src="https://user-images.githubusercontent.com/36531255/141794690-51742ba3-ca83-4f44-8ff4-f7495ff84abf.PNG"><img width="309" alt="hacker" src="https://user-images.githubusercontent.com/36531255/141794731-32663b87-baa6-4968-aeb9-1dac8408e9db.png">  
After installing morgan I could see he was using my put request, which I forgot existed.
### Response and Recovery  
I removed the endpoint as I do not use it anyways, and decided to keep his score as another reminder.  
### Leasons Learned  
Never keep unused endpoints because you can forget them, if you must keep them make sure they are secure.  
Install morgan!!!
## Leasons Learned Summary:
* Do not protect the DOM elements protect the entire page.
* All endpoints should be protected and validated. 
* Do not rely on the frontend for valid input, always validate input on the backend. 
* Never keep unused endpoints because you can forget them, if you must keep them make sure they are secure.
* Install Morgan on backend on keep logs!


