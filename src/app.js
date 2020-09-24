console.log('App.js is running');

const app = {
	title: 'Indecision App',
	subtitle: 'This is some info',
	options: [],
};

const onFormSubmit = (event) => {
	event.preventDefault();

	const option = event.target.elements.option.value;

	if (option) {
		app.options.push(option);
		event.target.elements.option.value = '';
		renderApp();
	}
};

const removeAll = () => {
	app.options = [];
	renderApp();
};

const onMakeDecision = () => {
	const randomNum = Math.floor(Math.random() * app.options.length);
	const selectedOption = app.options[randomNum];
	alert(selectedOption);
};

const appRoot = document.getElementById('app');

const renderApp = () => {
	const template = (
		<div>
			<h1>{app.title}</h1>
			{app.subtitle && <p>{app.subtitle}</p>}
			<button onClick={removeAll}>Remove All</button>
			<p>
				{app.options.length > 0
					? 'Here are your options'
					: 'No options'}
			</p>
			<button disabled={app.options.length <= 0} onClick={onMakeDecision}>
				What should I do ?
			</button>

			<ol>
				{app.options.map((option) => (
					<li key={option}>{option}</li>
				))}
			</ol>

			<form onSubmit={onFormSubmit}>
				<input type="text" name="option" />
				<button>Add Option</button>
			</form>
		</div>
	);

	ReactDOM.render(template, appRoot);
};

renderApp();
