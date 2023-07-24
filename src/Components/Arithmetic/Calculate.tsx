import React from "react";

import {isValid, getOperators, getNumOfOperators, findInfinity} from './SearchForArithmetic';

interface CalculateProps {
    onEvaluateElements: (value: string[]) => void;
    ogElements: string[]
}

const Calculate = ({onEvaluateElements, ogElements}: CalculateProps) => {
    
	// TODO: maybe complete () and ^

	const solve = (elements: string[], operator: string): string[] => {
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

	const breakDownElements = 
    (elementObjects: any, elementsString: string, operator1: string, operator2: string, countDown: number): string[] => {
		let elements = elementObjects[0];
		let newElements = elementObjects[1];
		elementObjects.pop(); elementObjects.pop();

		let operatorsQueue = getOperators(elementsString);

		for (let i=0; i<countDown; i++) {
			let isOperator1 = (operatorsQueue[i] === operator1);
			let isOperator2 = (operatorsQueue[i] === operator2);

			if (isOperator1) {
				elements = solve(elements, operator1);
			} else if (isOperator2) {
				elements = solve(elements, operator2);
			}else {
                const hasInfinity = findInfinity(elements);
                if (hasInfinity === true) {
                    return ['error'];
                }
				let firstElementString = elements[0];
				elements.shift();

                for (let j=0; j < firstElementString.length; j++) {
                    newElements.push(firstElementString[j])
                }
                newElements.push(operatorsQueue[i]);
            }
		}
        const lastElement =  elements[elements.length - 1]
        for (let j=0; j < lastElement.length; j++) {
            newElements.push(lastElement[j]);
        }

		return newElements;
	}

	const evaluateOperations = (elements: string[], operators: string): string[] => {
		let elementsString = elements.toString().replace(/,/gi, "");
		let combineElements = elementsString.split(/[*:/]/).join(', ').split(/[+:-]/).join(', ').split(', ');
		let newElements: string[] = [];
		let elementArrays: string[][] = [];
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

		elementArrays.push(combineElements);
		elementArrays.push(newElements);

		newElements = breakDownElements(elementArrays, elementsString, operator1, operator2, countDown);

		return newElements;
	}


	const evaluateMultDiv = (elements: string[]): string[] => {
		elements = evaluateOperations(elements, '*/');
		return elements;
	};

	const evaluateAddSub = (elements: string[]): string[] => {
		elements = evaluateOperations(elements, '+-');
		return elements;
	}

	const evaluateElementsHandler = (): void => {
		let elements = [...ogElements];

		if (isValid(elements)) {
			elements = evaluateMultDiv(elements);
			elements = evaluateAddSub(elements);
			
			onEvaluateElements(elements);
		} else {
			onEvaluateElements(["error"]);
		}
	};

	const clearElementsHandler = (): void => {
		onEvaluateElements(["0"]);
	};

	return (
		<div>
			<button onClick={evaluateElementsHandler}>=</button>
			<button onClick={clearElementsHandler}>C</button>
		</div>
	);
};

export default Calculate;
