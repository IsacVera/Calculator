import React from 'react';
import './Display.scss';

interface DisplayProps {
    elements: string[] 
}

const Display = ({elements}: DisplayProps) => {
	return <p className='input'>{elements}</p>;
};

export default Display;
