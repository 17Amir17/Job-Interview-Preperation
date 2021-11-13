# Job-Interview-Preperation
Job interview preparation questions system database and Frontend

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

