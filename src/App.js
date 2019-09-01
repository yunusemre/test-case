import './app.css';
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './containers/Home';
import Add from './containers/Add';
import NotFound from './containers/NotFound'

const App = () => (
	<BrowserRouter>
		<Layout>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/add" component={Add} />
				<Route path="*" component={NotFound} />
			</Switch>
		</Layout>
	</BrowserRouter>
);

export default App;
