import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {logout, updateDisplayName} from './firebase'


function LoggedIn(props) {

	const [userTheme, setUserTheme] = useState();

	// run everytime the user prop changes
	useEffect(()=> {
		// get current user's theme only if user present
		if(props.user.accessToken){
			getUserTheme();
		}
	}, [props.user])

	const getUserTheme = async () => {
		//console.log(props.user);
		let data = JSON.stringify({
			"user": props.user,
		})

		let config = {
			method : 'post',
			url: '/api/getUserTheme',
			headers: {
				    'Content-Type': 'application/json', 
    				'Accept': 'application/json'
			},
			data : data
		};

		axios(config)
		.then((response) => {
			//console.log(JSON.stringify(response))
			if (response != 'error') {
			// if user theme update is successful, set the theme here.
			setUserTheme(response.data);
			} else {
			//setError('theme not found')
			}
		})
		.catch((error) => {
  		console.log(error);
		});
	}

	const handleLogOutButtonPress = async () => {
		// logout should return null, therefore setUser will set to null.
		props.passUpUser(await logout());
	}

	const nameChangeFormSubmit = async (event) => {
		event.preventDefault();
		
		let currUser = await updateDisplayName(event.target.name.value);
		props.passUpUser(currUser);
	}

	const updateUserThemeHandler = async (event) => {
		event.preventDefault();

		let data = JSON.stringify({
			"user": props.user,
			"theme": event.target.theme.value
		})

		let config = {
			method : 'post',
			url: '/api/updateUserTheme',
			headers: {
				    'Content-Type': 'application/json', 
    				'Accept': 'application/json'
			},
			data : data
		};

		axios(config)
		.then((response) => {
			if (response != 'error') {
			// if user theme update is successful, set the theme here.
			setUserTheme(event.target.theme.value);
			} else {
			//setError('theme not found')
			}
		})
		.catch((error) => {
  		console.log(error);
		});
	}

return (
			<div>
				<p> Welcome {props.user.displayName} </p>
				<p> Your theme is {userTheme} </p>
					<form onSubmit={nameChangeFormSubmit}>
						<p> New Display Name </p> <input type='text' id='name'/>
						<button type="Submit"> Change Display Name </button>
					</form>
					<form onSubmit={updateUserThemeHandler}>
						<p> New Theme </p> <input type='text' id='theme'/>
						<button type="Submit"> Change Theme </button>
					</form>
				<button onClick={handleLogOutButtonPress}> Log Out </button>
			</div>
		)
}

export default LoggedIn;