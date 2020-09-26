import React from 'react';

import AddOption from './AddOption';
import Action from './Action';
import Header from './Header';

export default class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);

		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePickOptions = this.handlePickOptions.bind(this);
		this.handleAddOptions = this.handleAddOptions.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);

		this.state = {
			options: [],
		};
	}

	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if (options) {
				this.setState(() => ({
					options,
				}));
			}

			console.log('fetching data!, componentDidMount');
		} catch (err) {
			console.log('error catch');
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
			console.log('saving data, componentDidUpdate');
		}
	}

	componentWillUnmount() {
		console.log('Component will unmount, componentWillUnmount');
	}

	handleDeleteOptions() {
		this.setState(() => ({
			options: [],
		}));
	}

	handlePickOptions() {
		const randomNumber = Math.floor(
			Math.random() * this.state.options.length
		);
		console.log(this.state.options[randomNumber]);
	}

	handleAddOptions(option) {
		if (!option) return 'Enter valid value to add item';
		else if (this.state.options.indexOf(option) > -1)
			return 'This option already exists';

		this.setState((prevState) => ({
			options: prevState.options.concat(option),
		}));
	}

	handleDeleteOption(optionToRemove) {
		this.setState((prevState) => ({
			options: prevState.options.filter((opt) => opt !== optionToRemove),
		}));
	}

	render() {
		const subtitle = 'Put your life in the hands of a computer';
		return (
			<div>
				<Header subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					onPick={this.handlePickOptions}
				/>
				{this.state.options.length > 0 && (
					<Options
						options={this.state.options}
						handleDeleteOptions={this.handleDeleteOptions}
						handleDeleteOption={this.handleDeleteOption}
					/>
				)}
				<AddOption handleAddOption={this.handleAddOptions} />
			</div>
		);
	}
}
