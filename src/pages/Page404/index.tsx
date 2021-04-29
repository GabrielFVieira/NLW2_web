import React from 'react';
import { useHistory } from 'react-router-dom';

import errorIcon from '../../assets/images/icons/error.svg';

import './styles.css';

function Page404() {
	const history = useHistory();

	function hangleGoBack() {
		history.push('/');
	}

	return (
		<div id="page-404">
			<div className="page-message-container">
				<img src={errorIcon} alt="Ok" />
				<h1>404 - Página não encontrada</h1>
				<p>Opa, parece que você se perdeu, deixe que nós te ajudamos a se re-encontrar.</p>
			</div>

			<button onClick={hangleGoBack}>Voltar para o início</button>
		</div>
	);
}

export default Page404;
