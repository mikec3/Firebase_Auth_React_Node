# Firebase Auth

this app showcases a basic example of using firebase for auth in a react/node application.

##### deployment and api secrets
* https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
* https://www.youtube.com/watch?v=FcwfjMebjTU
* https://github.com/kubowania/crypto-dashboard-react/blob/main/index.js


## Overview to deploy React/Node app to Heroku

1. create a new project folder
2. `npm init -y`
3. alter the package.json file
```
"scripts": {
	"start" : "node server/index.js",
	"build" : "cd client && npm install && npm run build"
},
"engines": {
	"node" : "16.3.0" // REPLACE_WITH_YOUR_VERSION
}
```
4. Create a front end & remove the default git repo (we're using git at the root folder of this project)
```
  npx create-react-app client
  cd client
  rm -rf .git
```
5. Create an account on Heroku.com and create a new app
6. Install heroku command line tool
```
sudo npm i -g heroku `
heroku login `
git init
heroku git:remote -a insert-your-app-name-here
git add .
git commit -m "Deploy app to Heroku"
git push heroku master
```
7. Create a github repo as well and copy the URL. You can check which remotes to send repo to by using `git remote -v `
```
git remote add <custom_name_for_this_remote> <github-url>
git push <custom_name_for_this_remote> master 
```

## Firebase Auth

Create project on Firebase

Get configuration details

Get admin key file, save as a variable in .env file (eliminate whitespace line breaks so that
.env file reads the whole secret key file as one string)

add .env file to .gitignore file

Go to Auth - enable e-mail & Password sign in

API config & key is in client, set API permissions to restrict to either domain or IP.