import React from 'react';

const ArithmeticButton = (props) => {
	const element = props.element

	
	return <button onClick={props.onAddElement} value={element}>{element}</button>
}

export default ArithmeticButton;