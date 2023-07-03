import React from "react";

import {isValid, getOperators, getNumOfOperators} from './SearchForArithmetic.js';

const Calculate = (props) => {

	// TODO: maybe complete () and ^

	const solve = (elements, operator) => {
		let value = 0;
		const num1 = Number(elements[0]);
		const num2 = Number(elements[1]);
		if (operator === '*') {
			value = num1 * num2;
		} else if (operator === '/') {
			value = num1 / num2;
		} else if (operator === '+') {
			value = num1 + num2;
		} else if (operator === '-') {
			value = num1 - num2;
		} 

		elements.shift();
		elements.shift();

		elements = [value.toString(), ...elements];

		return elements;
	}

	const breakDownElements = (elementObjects, operator1, operator2, countDown) => {
		let elements = elementObjects[0];
		let newElements = elementObjects[1];
		const elementsString = elementObjects[2];
		elementObjects.pop();
		elementObjects.pop();
		elementObjects.pop();

		let operatorsQueue = getOperators(elementsString);

		for (let i=0; i<countDown; i++) {
			let isOperator1 = (operatorsQueue[i] === operator1);
			let isOperator2 = (operatorsQueue[i] === operator2);

			if (isOperator1) {
				elements = solve(elements, operator1);
			} else if (isOperator2) {
				elements = solve(elements, operator2);
			}else {
				let firstElementString = elements[0];
				elements.shift();

                try {

				    for (let j=0; j < firstElementString.length; j++) {
					    newElements.push(firstElementString[j])
			        }
                    newElements.push(operatorsQueue[i]);
                    
                } catch (e) {
                    console.log(e)
                }
            }
		}
		const lastElement =  elements[elements.length - 1]
		for (let j=0; j < lastElement.length; j++) {
			newElements.push(lastElement[j]);
		}

		return newElements;
	}

	const evaluateOperations = (elements, operators) => {
		let elementsString = elements.toString().replace(/,/gi, "");
		let combineElements = elementsString.split(/[*:/]/).join(', ').split(/[+:-]/).join(', ').split(', ');
		let newElements = [];
		let elementObjects = [];
		let operator1, operator2 = '';

		const countDown = getNumOfOperators(elementsString);

		if (countDown === 0) {
			const onlyElement =  combineElements[0]
			for (let j=0; j < onlyElement.length; j++) {
				newElements.push(onlyElement[j]);
			}
			return newElements;
		}

		if (operators === '*/') {
			operator1 = '*';
			operator2 = '/';
		} else {
			operator1 = '+';
			operator2 = '-';
		}

		elementObjects.push(combineElements);
		elementObjects.push(newElements);
		elementObjects.push(elementsString);

		newElements = breakDownElements(elementObjects, operator1, operator2, countDown);

		return newElements;
	}


	const evaluateMultDiv = (elements) => {
		elements = evaluateOperations(elements, '*/');
		return elements;
	};

	const evaluateAddSub = (elements) => {
		elements = evaluateOperations(elements, '+-');
		return elements;
	}

	const evaluateElementsHandler = () => {
		let elements = [...props.elements];

		if (isValid(elements)) {
			elements = evaluateMultDiv(elements);
			elements = evaluateAddSub(elements);
			
			props.onEvaluateElements(elements);
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
