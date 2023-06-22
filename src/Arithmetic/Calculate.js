import React from 'react';

const Calculate = (props) => {

	// TODO: complete isValid to make sure there are no operators twice in a row or as the last element

	const isValid = (elements) => {
		const isFirstElementAnInt = (Number.isInteger(Number(elements[0])));

		console.log(isFirstElementAnInt)

		if (!isFirstElementAnInt) {
			return false
		}

		return true
	}

	// TODO: complete PEMDAS (will probably not include parenthesis or exponents)

	const evaluateMultDiv = (elements) => {
		let elementsString = elements.toString().replace(/,/gi, '');
		let startPoint = 0;
		let firstNum = 0;
		let secondNum = 0;

		console.log(parseInt(elementsString))
	
		for (let i = 0; i < elementsString.length; i++) {

			firstNum = parseInt(elementsString);
			
		}
	}

	const evaluateElementsHandler = () => {
		const elements = [...props.elements];

		if (isValid(elements)) {
			evaluateMultDiv(elements)
			props.onEvaluateElements("")
		} else {
			props.onEvaluateElements('error')
		}
	}

	const clearElementsHandler = () => {
		props.onEvaluateElements("0");
	}

	return (
		<div>
			<button onClick={evaluateElementsHandler}>=</button>
			<button onClick={clearElementsHandler}>C</button>
		</div>
	)
}

export default Calculate;