import logo from './logo.svg';
import './App.css';
import LoginCard from './LoginCard'
import {UserProvider} from './UserContext'

function App() {
  return (
    <div className="App">
    	<UserProvider>
    		<LoginCard/>
    	</UserProvider>
    </div>
  );
}

export default App;
