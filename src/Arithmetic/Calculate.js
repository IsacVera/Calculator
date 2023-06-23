import React from "react";

const Calculate = (props) => {

	const isValid = (elements) => {
		const isFirstElementInt = Number.isInteger(Number(elements[0]));
		const isLastElementInt = Number.isInteger(
			Number(elements[elements.length - 1])
		);

		if (!isFirstElementInt) {
			return false;
		} else if (!isLastElementInt) {
			return false;
		}

		for (let i = 0; i < elements.length; i++) {
			const hasDoubleOperator =
				Number.isInteger(Number(elements[i])) === false &&
				Number.isInteger(Number(elements[++i])) === false;

			if (hasDoubleOperator) {
				console.log("here I am");
				return false;
			}
		}

		return true;
	};

	// TODO: complete PEMDAS (will probably not include parenthesis or exponents)

	const evaluateMultDiv = (elements) => {
		let elementsString = elements.toString().replace(/,/gi, "");
		let startPoint = 0;
		let firstNum = 0;
		let firstNumLength = 0;
		let secondNum = 0;

		for (let i = 0; i < elementsString.length; i++) {
			firstNum = parseInt(elementsString);
			console.log(elementsString)
		}
	};

	const evaluateElementsHandler = () => {
		const elements = [...props.elements];

		if (isValid(elements)) {
			evaluateMultDiv(elements);
			props.onEvaluateElements("");
		} else {
			props.onEvaluateElements("error");
		}
	};

	const clearElementsHandler = () => {
		props.onEvaluateElements("0");
	};

	return (
		<div>
			<button onClick={evaluateElementsHandler}>=</button>
			<button onClick={clearElementsHandler}>C</button>
		</div>
	);
};

export default Calculate;
