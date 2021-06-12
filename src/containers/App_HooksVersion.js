import React, { useState, useEffect } from "react";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

function App() {
	//States
	const [robots, setRobots] = useState([]);
	const [searchfield, setsearchfield] = useState('');

	useEffect(() => {
		//Fetch information Array of Objects from URL
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json()) //Convert the response to JSON
			.then(users => {setRobots(users)}); //Set Fetched data as input to our program
	},[]) //The second argument [] stands for componentDidMount(), which makes run useEffect() just once

	//Change Input Event on Search Bar Handler
	const onSearchChange = (event) => {
		setsearchfield(event.target.value); //Update State
	}

	const filteredRobots = robots.filter(robot=>{
		return robot.name.toLowerCase().includes(searchfield.toLowerCase());
	})

	return !robots.length ?
		//In case the information to be fetched takes too long
		<h1 className='tc'>Loading</h1> :
		(
			<div className='tc'>
				<h1 className='f2'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<CardList robots={filteredRobots} />
				</Scroll>
			</div>
		);
}

export default App;
