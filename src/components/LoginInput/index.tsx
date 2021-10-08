import React, { InputHTMLAttributes, useState } from 'react';

import eyeIcon from '../../assets/images/icons/eye.svg';
import eyeSlashIcon from '../../assets/images/icons/eye-slash.svg';

import './styles.css';

interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	type: string;
}

const LoginInput: React.FC<InputsProps> = ({ name, type, ...rest }) => {
	const [textVisible, setTextVisible] = useState(true);

	function handleToggleTextVisibility() {
		setTextVisible(!textVisible);
	}

	return (
		<div className="login-input-block">
			<input type={textVisible ? type : 'text'} name={name} maxLength={30} {...rest} />
			<span onClick={handleToggleTextVisibility}>
				{type === 'password' ? (
					<img src={textVisible ? eyeIcon : eyeSlashIcon} alt="Revelar senha" className="icon" />
				) : null}
			</span>
		</div>
	);
};

export default LoginInput;
