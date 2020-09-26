import React from 'react';

const Action = (props) => {
	return (
		<div>
			<button onClick={props.onPick} disabled={!props.hasOptions}>
				What Should I do?
			</button>
		</div>
	);
};

export default Action;
