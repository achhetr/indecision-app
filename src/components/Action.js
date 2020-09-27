import React from 'react';

const Action = (props) => (
	<div>
		<button
			onClick={props.onPick}
			disabled={!props.hasOptions}
			className="big-button"
		>
			What Should I do?
		</button>
	</div>
);

export default Action;
