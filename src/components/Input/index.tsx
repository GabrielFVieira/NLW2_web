import React, { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

import './styles.css';

interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	mask?: string;
}

const Input: React.FC<InputsProps> = ({ name, label, mask, children, ...rest }) => {
	return (
		<div className="input-block">
			<label htmlFor={name}>{label}</label>
			<InputMask
				mask={mask ? mask : ''}
				placeholder={mask ? mask : rest.placeholder}
				type="text"
				name={name}
				{...rest}
			/>
			{children}
		</div>
	);
};

export default Input;
