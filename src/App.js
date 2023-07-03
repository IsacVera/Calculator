import React, { useState } from "react";

import Display from "./Components/Display/Display";
import BasicArithmetic from "./Components/Arithmetic/BasicArithmetic";

import "./Components/Calculator.css";

function App() {
	const [savedElements, setSavedElements] = useState(["0"]);


	const savedElementsHandler = (newElement) => {
		const isOnlyZero = (savedElements.length === 1 && savedElements[0] === "0");
		const isErrorMessage = (savedElements[0] === 'e');

		if (isOnlyZero || isErrorMessage) {
			setSavedElements(newElement);
		} else {
			setSavedElements((prevElements) => {
				return [...prevElements, newElement];
			});
		}
	};

	const evaluateElementsHandler = (value) => {
		setSavedElements(value);
	};

	return (
		<div className="App">
		    <div className="calculator">
                <Display elements={savedElements} />
			    <BasicArithmetic
				    onSavedElements={savedElementsHandler}
				    onEvaluateElements={evaluateElementsHandler}
				    elements={savedElements}
			    />

            </div> 
		</div>
	);
}

export default App;
