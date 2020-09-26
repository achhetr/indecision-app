console.log('app.js is running');

class IndecisionApp extends React.Component {
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

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subtitle && <h2>{props.subtitle}</h2>}
		</div>
	);
};

Header.defaultProps = {
	title: 'Indecision App',
};

const Action = (props) => {
	return (
		<div>
			<button onClick={props.onPick} disabled={!props.hasOptions}>
				What Should I do?
			</button>
		</div>
	);
};

const Options = (props) => {
	return (
		<div>
			<button onClick={props.handleDeleteOptions}>Remove All</button>
			{props.options.map((option) => (
				<Option
					key={option}
					optionText={option}
					handleDeleteOption={props.handleDeleteOption}
				/>
			))}
		</div>
	);
};

class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleOptions = this.handleOptions.bind(this);
		this.state = {
			error: undefined,
		};
	}

	handleOptions(e) {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);

		this.setState(() => ({
			error,
		}));

		if (!error) {
			e.target.elements.option.value = '';
		}
	}
	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleOptions}>
					<input type="text" name="option" />
					<button>Add Options</button>
				</form>
			</div>
		);
	}
}
const Option = (props) => {
	return (
		<div>
			<p>{props.optionText}</p>
			<button
				onClick={(e) => {
					props.handleDeleteOption(props.optionText);
				}}
			>
				Remove
			</button>
		</div>
	);
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
