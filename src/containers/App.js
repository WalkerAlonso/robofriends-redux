import React, { Component } from "react";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor(){
		super(); //Calling the constructor of Component
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	//Mounting
	componentDidMount(){
		//Fetch information Array of Objects from URL
		fetch('https://jsonplaceholder.typicode.com/users')
			.then(response => response.json()) //Convert the response to JSON
			.then(users => this.setState({robots: users})) //Set Fetched data as input to our program
	}

	//Change Input Event on Search Bar Handler
	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value}); //Update State
		//console.log(event.target.value); //Shows dynamic input of searchfield
	}

	//Rendering (Mounting , Updating)
	render(){
		const { robots,searchfield } = this.state;
		const filteredRobots = robots.filter(robot=>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})

		return !robots.length ?
			//In case the information to be fetched takes too long
			<h1 className='tc'>Loading</h1> :
			(
				<div className='tc'>
					<h1 className='f2'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange}/>
					<Scroll>
						<CardList robots={filteredRobots} />
					</Scroll>
				</div>
			);
	}
}

export default App;