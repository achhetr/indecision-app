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

const appRoot = document.getElementById('app');

const renderApp = () => {
	const template = (
		<div>
			<h1>{app.title}</h1>
			{app.subtitle && <p>{app.subtitle}</p>}
			<button onClick={removeAll}>Remove</button>
			<p>
				{app.options.length > 0
					? 'Here are your options'
					: 'No options'}
			</p>
			<p>{app.options.length}</p>
			<form onSubmit={onFormSubmit}>
				<input type="text" name="option" />
				<button>Add Option</button>
			</form>
		</div>
	);

	ReactDOM.render(template, appRoot);
};

renderApp();
