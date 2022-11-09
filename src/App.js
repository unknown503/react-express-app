import Navbar from './Components/Navbar';
import Index from './Components/Index';
import Notes from './Components/Notes/';
import Chat from './Components/Chat/';
import Notepad from './Components/Notepad/';
import Login from './Components/Users/Login';
import Signup from './Components/Users/Signup';
import Error404 from './Components/404';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext'
import Private from './Auth/Private';
import Public from './Auth/Public';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path="/" component={Index} />
					<Public path="/sign-up" component={Signup} />
					<Public path="/login" component={Login}/>
					<Private path="/notes" component={Notes}/>
					<Private path="/chat" component={Chat} />
					<Private path="/notepad" component={Notepad} />

					<Route component={Error404} />
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;
