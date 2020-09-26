class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);

		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePickOptions = this.handlePickOptions.bind(this);
		this.handleAddOptions = this.handleAddOptions.bind(this);

		this.state = {
			options: [],
		};
	}

	handleDeleteOptions() {
		this.setState(() => {
			return {
				options: [],
			};
		});
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

		this.setState((prevState) => {
			return {
				options: prevState.options.concat(option),
			};
		});
	}

	render() {
		const title = 'Indecision App';
		const subtitle = 'Put your life in the hands of a computer';
		return (
			<div>
				<Header title={title} subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					onPick={this.handlePickOptions}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
				/>
				<AddOption handleAddOption={this.handleAddOptions} />
			</div>
		);
	}
}

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			<h2>{props.subtitle}</h2>
		</div>
	);
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
				<Option key={option} optionText={option} />
			))}
			<Option optionsLen={props.options.length} />
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

		this.setState(() => {
			return {
				error,
			};
		});

		e.target.elements.option.value = '';
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
		</div>
	);
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
