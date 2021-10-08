import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label: string;
}

const Textarea: React.FC<TextAreaProps> = ({ name, label, ...rest }) => {
	return (
		<div className="textarea-block">
			<div>
				<label htmlFor={name}>{label}</label>
				{rest.maxLength && <p>(Máximo {rest.maxLength} caracteres)</p>}
			</div>
			<textarea name={name} {...rest} />
		</div>
	);
};

export default Textarea;
