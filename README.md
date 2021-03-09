## wouldyourather-frontend
- React front end for the Would You Rather Application

## Installation
- Clone the app from the github repository using
```
https://github.com/oppongbaah/wouldyourather-frontend.git
```
- Navigate to the root directory of the app and install deppendencies using
```
npm intall
```
- Run ```npm start``` to launch the development server. If server doesn't start automatically in the browser, type **http://localhost:3000** to access the site

## Introduction
- User can sign up
![result](wouldyourather/src/utils/signup.png "Sign Up")
- Sign in and logout
![signin](wouldyourather/src/utils/signin.png "Sign In")
- A user has the ability to navigate betweem three catalogs. The dashboard, New Poll and the Leaderboard as shown below. The dashboard has has three diffrent categories. The first category contains a recommended question that is randomly selected from the unanswered questions based on the user logged in. 
![dashboard](wouldyourather/src/utils/dashboard.png "Dashboard")
![add-poll](wouldyourather/src/utils/addPoll.png "Add Poll")
![leaderboard](wouldyourather/src/utils/leaderboard.png "Leaderboard")
- A user is automatically navigated to the question details page upon viewing a question either from the recommended dashboard or from the unanswered questions dashboard. The questions detail page is shown below.
![question-page](wouldyourather/src/utils/qdp.png "Question Detail Page")
- On the question detail page, the user has the ability to cast a vote between two different options. Voting is done automatically after an option is selected. The user will then be taken to the results page as shown below
![result](wouldyourather/src/utils/result.png "Result Page")
- Also upon clicking on an poll under the answered dashboard, the user is navigated to the results page as compared to the ones described above under the other dashboard categories.

## Caution on Limited Functionalities
- Any image uploaded must be added to the paths ```/wouldyourather/public/usersAvatar``` in order for it to work properly.
- Image names must not contain spaces.
- Username is generated based on the firstname upon signing up.
- Password can take any format.
- Permission to use cookies is granted automatically upon logging in to the application.

### ADDITIONAL INFORMATION
1. The application has a backend written in nodejs hosted at a remote server. The Full stacked project can be accessed at *```https://wouldyouratherapplication.herokuapp.com```*
2. Also the repository for the backend can be accessed at ```https://github.com/oppongbaah/wouldyourather-backend.git```
2. User must login to access any page. Users login infomation can be accessed at **```https://wouldyouratherapplication.herokuapp.com/users/fetch-all```**
3. Cookies are used for better user experience. Login session may last for an hour to expire.

### Lincensing
- Both the freont end and back end repositories are open source. Therefore, any interested user can make collaborate on it if interested.


