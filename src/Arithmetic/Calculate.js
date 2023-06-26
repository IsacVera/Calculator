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
				return false;
			}
		}
		return true;
	};

	// TODO: complete PEMDAS (will probably not include parenthesis or exponents)

	const getOperators = (elementsString) => {
		let operatorsQueue = [];
		for (let i=0; i<elementsString.length; i++) {
			if (elementsString[i] === '+') {
				operatorsQueue.push('+');
			} else if (elementsString[i] === '-') {
				operatorsQueue.push('-');
			} else if (elementsString[i] === '*') {
				operatorsQueue.push('*');
			} else if (elementsString[i] === '/') {
				operatorsQueue.push('/');
			}
		}
		return operatorsQueue
	}

	const getNumOfOperators = (elements, elementsString) => {
		let countDown = 0;
		for (let i=0; i<elementsString.length; i++) {
			let isInteger = Number.isInteger(Number(elements[i]));
			if (isInteger !== true) {
				countDown++;
			}
		}
		return countDown;
	}

	const solve = (elements, operator) => {
		let value = 0;
		if (operator === '*') {
			value = elements[0] * elements[1];
		} else if (operator === '/') {
			value = elements[0] / elements[1];
		} else if (operator === '+') {
			value = elements[0] + elements[1];
		} else if (operator === '-') {
			value = elements[0] - elements[1];
		} 

		elements.shift();
		elements.shift();

		elements = [value.toString(), ...elements];

		return elements;
	}

	const evaluateMultDiv = (elements) => {
		let elementsString = elements.toString().replace(/,/gi, "");
		elements = elementsString.split(/[*:/]/).join(', ').split(/[+:-]/).join(', ').split(', ');
		let newElements = [];

		let operatorsQueue = getOperators(elementsString);

		const countDown = getNumOfOperators(elements, elementsString)

		for (let i=0; i<countDown; i++) {

			let isMultiply = (operatorsQueue[i] === "*");
			let isDivide = (operatorsQueue[i] === "/");

			if (isMultiply) {
	
				elements = solve(elements, '*');
				
			} else if (isDivide) {
				elements = solve(elements, '/');
			}else {
				let firstElementString = elements[0].toString();
				for (let j=0; j < elements[0].length; j++) {
					newElements.push(firstElementString[j])
				}
				elements.shift();

				newElements.push(operatorsQueue[i])

			}

		}
		const lastElement =  elements[elements.length - 1]
		for (let j=0; j < lastElement.length; j++) {
			newElements.push(lastElement[j])
		}
		
		console.log(newElements)
	};

	const evaluateElementsHandler = () => {
		let elements = [...props.elements];

		if (isValid(elements)) {
			elements = evaluateMultDiv(elements);
			
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
