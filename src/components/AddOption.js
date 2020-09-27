import React from 'react';

export default class AddOption extends React.Component {
	state = {
		error: undefined,
	};

	handleOptions = (e) => {
		e.preventDefault();

		const option = e.target.elements.option.value.trim();
		const error = this.props.handleAddOption(option);

		this.setState(() => ({
			error,
		}));

		if (!error) {
			e.target.elements.option.value = '';
		}
	};

	render() {
		return (
			<div>
				{this.state.error && (
					<p className="add-option-error">{this.state.error}</p>
				)}
				<form onSubmit={this.handleOptions} className="add-option">
					<input
						type="text"
						name="option"
						className="add-option__input"
					/>
					<button className="button">Add Options</button>
				</form>
			</div>
		);
	}
}
