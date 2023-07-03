import React from "react";

// import ArithmeticButton from '../UI/ArithmeticButton'
import Calculate from './Calculate'

const BasicArithmetic = (props) => {
	const elements = props.elements	

	const addElementHandler = (event) => {
		props.onSavedElements(event.target.value);
	}

	return (
		<div>
			<div>
				<Calculate
					onEvaluateElements={props.onEvaluateElements}
					elements={elements}
				/>
			</div>

			<div>
				<div>
					<button onClick={addElementHandler} value={'1'}>1</button>
					<button onClick={addElementHandler} value={'2'}>2</button>
					<button onClick={addElementHandler} value={'3'}>3</button>
				</div>
				<div>
					<button onClick={addElementHandler} value={'4'}>4</button>
					<button onClick={addElementHandler} value={'5'}>5</button>
					<button onClick={addElementHandler} value={'6'}>6</button>
				</div>
				<div>
					<button onClick={addElementHandler} value={'7'}>7</button>
					<button onClick={addElementHandler} value={'8'}>8</button>
					<button onClick={addElementHandler} value={'9'}>9</button>
				</div>
				<div>
					<button onClick={addElementHandler} value={'0'}>0</button>
					<button onClick={addElementHandler} value={'.'}>.</button>
				</div>
			</div>
			<div>
				<button onClick={addElementHandler} value={'/'}>/</button>
				<button onClick={addElementHandler} value={'*'}>x</button>
				<button onClick={addElementHandler} value={'-'}>-</button>
				<button onClick={addElementHandler} value={'+'}>+</button>
			</div>
		</div>
	);
};

export default BasicArithmetic;
