import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useAuth } from '../../contexts/auth';

import LoginInput from '../../components/LoginInput';
import AlertPanel from '../../components/AlertPanel';

import logoImg from '../../assets/images/logo.svg';
import backImg from '../../assets/images/icons/back.svg';

import './styles.css';

function Recovery() {
	const { recovery } = useAuth();

	const [email, setEmail] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	async function handleRecovery(e: FormEvent) {
		e.preventDefault();
		setErrorMsg('');
		setIsWaiting(true);

		const response = await recovery(email);
		if (response && response.error) {
			setErrorMsg(response.error);
		} else {
			setShowAlert(true);
		}

		setIsWaiting(false);
	}

	return (
		<div id="page-recovery">
			<Helmet title="Recuperar senha" />

			<div id="page-recovery-logo-content" className="login-container">
				<div className="page-logo-container">
					<img src={logoImg} alt="Proffy" />
					<h2>Sua plataforma de estudos online.</h2>
				</div>
			</div>

			<div id="page-recovery-input-content" className="recovery-container">
				<main>
					<Link to="/" className="backButton">
						<img src={backImg} alt="Voltar" />
					</Link>

					<form onSubmit={handleRecovery}>
						<fieldset>
							<legend>Eita, esqueceu sua senha?</legend>
							<p>Não esquenta, vamos dar um jeito nisso.</p>

							<LoginInput
								name="email"
								placeholder="E-mail"
								type="email"
								required={true}
								value={email}
								onChange={e => {
									setEmail(e.target.value);
								}}
							/>
						</fieldset>

						<footer>
							<button disabled={isWaiting} type="submit">
								Enviar
							</button>

							<p className="page-recovery-error">{errorMsg}</p>
						</footer>
					</form>

					<div></div>
				</main>
			</div>

			{showAlert && (
				<AlertPanel
					title="Redefinição enviada!"
					message="Boa, agora é só checar o e-mail que foi enviado para você
						 	 redefinir sua senha e aproveitar os estudos."
					buttonText="Voltar ao login"
				/>
			)}
		</div>
	);
}

export default Recovery;
