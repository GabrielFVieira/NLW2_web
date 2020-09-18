import React from 'react';
import { useHistory } from 'react-router-dom';

import okImg from '../../assets/images/icons/ok.svg';

import './styles.css';

function Register() {
	const history = useHistory();

	function hangleGoBack() {
		history.push('/');
	}

	return (
		<div id="page-register-realized">
			<div className="page-message-container">
				<img src={okImg} alt="Ok" />
				<h1>Cadastro concluído</h1>
				<p>
					Agora você faz parte da plataforma da Proffy.
					<br />
					Tenha uma ótima experiência.
				</p>
			</div>

			<button onClick={hangleGoBack}>Fazer login</button>
		</div>
	);
}

export default Register;
