import React from 'react'
import {registerWithEmailAndPassword} from './firebase'


function SignUp(props) {


	const createAccountFormSubmitHandler = (event) => {
		event.preventDefault();
		registerWithEmailAndPassword(event.target.email.value, event.target.password.value)
	}

return (
				<div>
					<form onSubmit={createAccountFormSubmitHandler}>
						<input type='text' id='email' placeholder='E-mail'/>
						<input type='text' id='password' placeholder='Password'/>
						<button type="Submit"> Create Account </button>
					</form>
				</div>
		)
}

export default SignUp;