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

const getNumOfOperators = (elementsString) => {
	let countDown = 0;
	for (let i=0; i<elementsString.length; i++) {
		let isInteger = Number.isInteger(Number(elementsString[i]));
		if (isInteger !== true) {
			countDown++;
		}
	}
	return countDown;
}






export {
	isValid,
	getOperators,
	getNumOfOperators
}