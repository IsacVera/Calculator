import React from 'react';

interface DisplayProps {
    elements: string[] 
}

const Display = ({elements}: DisplayProps) => {
	return <p>{elements}</p>;
};

export default Display;
