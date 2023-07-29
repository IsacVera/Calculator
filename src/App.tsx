import React, { useState } from "react";

import Display from "./Components/Display/Display";
import BasicArithmetic from "./Components/Arithmetic/BasicArithmetic";

import "./Components/Calculator.scss";


interface ElementsHandlerType {
    savedHandler: (newElement: string[]) => void;
    evaluateElementsHandler: (value: string[]) => void;
    elements: string[];
}

function App() {
	const [savedElements, setSavedElements] = useState(["0"]);
    
    const elementsHandler: ElementsHandlerType = {
        savedHandler: (newElement: string[]): void => {
            const isOnlyZero = (savedElements.length === 1 && savedElements[0] === "0");
            const isErrorMessage = (savedElements[0] === 'e');

            setSavedElements((prevElements: any) => {
                return [...prevElements, newElement]
            });
            if (isOnlyZero || isErrorMessage) {
                setSavedElements(newElement);
            } 
        },

        evaluateElementsHandler: (value: string[]) => {
            setSavedElements(value); 
        },

        elements: savedElements,

    }

	return (
		<div className="App">
		    <div className="calculator">
                <Display elements={savedElements} />
			    <BasicArithmetic
				    onSavedElements={elementsHandler.savedHandler}
				    onEvaluateElements={elementsHandler.evaluateElementsHandler}
				    elements={elementsHandler.elements}
			    />

            </div> 
		</div>
	);
}

export default App;
