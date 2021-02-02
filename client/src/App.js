import './App.css';
import GpuContainer from './components/GpuTable';
import Navbar from './components/Navbar';
import Login from './components/Login';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from './utils/AuthContext';

function App() {
	const { user, setUser, authenticated, setAuthenticated } = useContext(
		AuthContext
	);

	// console.log(user);
	// console.log(authenticated);

	return (
		<Router>
			<div>
				<Navbar />
				<Switch>
					<Route exact path='/' render={() => <GpuContainer saved={false} />} />
					<Route
						exact
						path='/saved'
						render={() => <GpuContainer saved={true} />}
					/>
					<Route exact path='/login' component={Login} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
