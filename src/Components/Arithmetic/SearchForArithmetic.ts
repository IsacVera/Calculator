const isValid = (elements: string[]): boolean => {
    const isFirstElementInt = Number.isInteger(Number(elements[0]));
    const isLastElementInt = Number.isInteger(
        Number(elements[elements.length - 1])
    );
    const isFirstElementPeriod = elements[0] === '.';
    const isLastElementPeriod = elements[elements.length - 1] === '.';

    if (!isFirstElementInt) {
        if (isFirstElementPeriod) return true;
        return false;
    } else if (!isLastElementInt) {
        if (isLastElementPeriod) return true;
        return false;
    }

    for (let i = 0; i < elements.length; i++) {
        const hasDoubleOperator =
            Number.isInteger(Number(elements[i])) === false &&
            Number.isInteger(Number(elements[i+1])) === false;

        const hasOnlyOnePeriod = ((elements[i] === '.' || elements[i+1]) && 
            !(elements[i] === '.' && elements[i+1] === '.'));

        if (hasDoubleOperator) {
            if (hasOnlyOnePeriod === true){
                return true;
            }
            return false;
        }
    }
    return true;
};

const getOperators = (elementsString: string): string[] => {
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

const getNumOfOperators = (elementsString: string): number => {
    let countDown = 0;
    for (let i=0; i<elementsString.length; i++) {
        const isInteger = Number.isInteger(Number(elementsString[i]));
        const isPeriod = elementsString[i] === '.'; 
        if (isInteger !== true && isPeriod !== true)  {
            countDown++;
        }
    }
    return countDown;
}

const findInfinity = (elements: string[]): boolean => {
    for (let i=0; i<elements.length; i++) {
        if (elements[i] === 'Infinity') {
            return true; 
        }
    }
    return false;
}


export {
	isValid,
	getOperators,
	getNumOfOperators,
    findInfinity
}
