import React from 'react';
import { useHistory } from 'react-router-dom';

import okImg from '../../assets/images/icons/ok.svg';

import './styles.css';

interface AlertPanelProps {
	title: string;
	message: string;
	buttonText: string;
	buttonUrl?: string;
}

const AlertPanel: React.FC<AlertPanelProps> = ({ title, message, buttonText, buttonUrl, children }) => {
	const history = useHistory();

	function handleClick() {
		history.push(buttonUrl ? buttonUrl : '/');
	}

	return (
		<div id="alert-container">
			<div className="alert-message-container">
				<img src={okImg} alt="Ok" />
				<h1>{title}</h1>
				<p>{message}</p>
			</div>

			{children}

			<button onClick={handleClick}>{buttonText}</button>
		</div>
	);
};

export default AlertPanel;
