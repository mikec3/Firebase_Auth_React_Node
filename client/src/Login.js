import React, {useEffect, useState} from 'react'
import {signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset} from './firebase'


function Login(props) {


	const loginFormSubmitHandler = (event) => {
		event.preventDefault();
		logInWithEmailAndPassword(event.target.email.value, event.target.password.value)
		.then((response)=> {
			//console.log(response);
			// pass user up to parent component
			props.passUpUser(response);
		})
	}

	const loginWithgoogle = () => {
		signInWithGoogle()
		.then((response)=> {
			//console.log(response);
			// pass user up to parent component
			props.passUpUser(response);
		})
	}



return (
			<div>
				<div>
					<h3> Login </h3>
					<form onSubmit={loginFormSubmitHandler}>
						<p> E-mail </p> <input type='text' id='email'/>
						<p> Password </p> <input type='text' id='password'/>
						<button type="Submit"> Login </button>
					</form>
				</div>
				<div>
					<button onClick={loginWithgoogle}> Login with Google </button>
				</div>
			</div>
		)
}

export default Login;