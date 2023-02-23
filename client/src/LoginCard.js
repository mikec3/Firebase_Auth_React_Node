import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {  logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout, getCurrentUser} from './firebase'
import SignUp from './SignUp'
import Login from './Login'
import LoggedIn from './LoggedIn'


function LoginCard(props) {

	// current logged in user state
	const [user, setUser] = useState();
	const [displayName, setDisplayName] = useState();

	// receives the user during register/login
	// setting user using destructuring so that shallow equality check of react engine triggers re-render of componenets looking at user object
	const passUpUser = (user) => {
		if (!user){
			setUser(null);
		} else {
			setUser({...user});
		}
	}

return (
	<div>
		{user && 
			<LoggedIn user={user} passUpUser={passUpUser}/>
		}
		{!user &&
			<div>
				<Login passUpUser={passUpUser}/>
				<h2> Or </h2>
				<SignUp passUpUser={passUpUser}/>
			</div>
		}
	</div>);
}

export default LoginCard;