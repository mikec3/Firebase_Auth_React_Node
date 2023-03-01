import React from 'react'
import {registerWithEmailAndPassword} from './firebase'


function SignUp(props) {


	const createAccountFormSubmitHandler = (event) => {
		event.preventDefault();
		registerWithEmailAndPassword(event.target.email.value, event.target.password.value)
	}

return (
				<div>
					<h3> Create Account </h3>
					<form onSubmit={createAccountFormSubmitHandler}>
						<p> E-mail </p> <input type='text' id='email'/>
						<p> Password </p> <input type='text' id='password'/>
						<button type="Submit"> Create Account </button>
					</form>
				</div>
		)
}

export default SignUp;