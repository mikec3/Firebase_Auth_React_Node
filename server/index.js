// server/index.js

const express = require("express");
const path = require('path');
const bodyParser = require("body-parser")
require('dotenv').config();
const http = require('http');

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth, createUser, updateProfile, verifyIdToken } = require("firebase-admin/auth");

const PORT = process.env.PORT || 3001;

const app = express();

const server = http.createServer(app);

// using this for reading webhook and api posts
app.use(bodyParser.json())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// firebase admin key is saved in .env file all whitespace line breaks was erased so that the .env reads it as one continuous string
const serviceAccount = JSON.parse(process.env.fireBaseAdminKey);

initializeApp({
  credential: cert(serviceAccount)
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

// Initialize Firebase Firestore and get a reference to the service
const db = getFirestore();

// api for creating an account, send email & password to firebase, returns user
app.post("/api/createAccount", async function(req, res){
	console.log('api/createAccount has been called');
	console.log(req.body);
	console.log(req.body.email);
	console.log(req.body.password);

// return the parcel list to client
let firebaseResponse = await sendAccountToFirebase(req.body.email, req.body.password);
console.log(firebaseResponse);
res.json(firebaseResponse);

});

const sendAccountToFirebase = (email, password) => {
	console.log('sending created email/password account to Firebase');

	console.log([email, password]);

	return auth.createUser({email: email, password: password})
	  .then((userCredential) => {
	    // Signed in 
	    console.log(userCredential);
	    return userCredential;
	    // ...
	  })
	  .catch((error) => {
	  	// TODO return something so the front end can handle errors
	  	console.log(error);
	    const errorCode = error.code;
	    const errorMessage = error.message;
	    // ..
	  });
}

// api for updating user theme
app.post("/api/updateUserTheme", async function(req, res) {
	console.log('api/updateUserTheme called');

	// validate token
	auth.verifyIdToken(req.body.user.accessToken)
	.then((decodedToken)=> {
		//console.log(decodedToken.uid);

		// set db users/{uid}/theme
		uploadUserTheme(decodedToken.uid, req.body.theme)
		.then((response)=> {
			res.json(response);
		});
	})
	.catch((error)=> {
		console.log(error);
		res.json(error);
	})

	// return new theme or success message
});

const uploadUserTheme = async function (uid, theme) {

	const docRef = db.collection('users').doc(uid);

	docRef.set({theme: theme})
	.then(result => {
		console.log(result);
		// return the theme if write was successful
		return theme;
	}).catch(error => {
		console.log(error);
		return error;
	})
};

// api for getting user theme
app.post("/api/getUserTheme", async function(req, res) {
	console.log('api/getUserTheme called');
	console.log(req.body.user.stsTokenManager);
	console.log(req.body.user.accessToken);
	auth.verifyIdToken(req.body.user.stsTokenManager.accessToken)
	.then((decodedToken)=> {
		// get and return theme
		const docRef = db.collection('users').doc(decodedToken.uid);
		docRef.get()
		.then(result=>{
			// if there's a result, pass it back to client, otherwise pass null
			if (result.data()) {
				console.log(result);
				console.log(result.data().theme);
				res.json(result.data().theme);
			} else {
				res.json();
			}
		})
		.catch(error=>{
			console.log(error);
			res.json(error)
		})
	})
	.catch(error => {
		console.log(error);
		res.json(error);
	})
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});