import React, { useState } from "react";

import Display from "./Display/Display";
import BasicArithmetic from "./Arithmetic/BasicArithmetic";

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
			<Display elements={savedElements} />
			<BasicArithmetic
				onSavedElements={savedElementsHandler}
				onEvaluateElements={evaluateElementsHandler}
				elements={savedElements}
			/>
		</div>
	);
}

export default App;
