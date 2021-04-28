import React, { useState, FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import LoginInput from '../../components/LoginInput';
import AlertPanel from '../../components/AlertPanel';

import logoImg from '../../assets/images/logo.svg';
import backImg from '../../assets/images/icons/back.svg';

import './styles.css';
import { passwordPattern } from '../../assets/utils/patterns';
import api from '../../services/api';

interface ResetParams {
	token: string;
}

function ChangePassword() {
	const { token } = useParams<ResetParams>();

	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	async function handleReset(e: FormEvent) {
		e.preventDefault();
		setErrorMsg('');

		setIsWaiting(true);

		api
			.post(
				'resetPassword',
				{ password },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then(() => {
				setShowAlert(true);
			})
			.catch(err => {
				if (err.response) {
					const data = err.response.data;
					setErrorMsg(data.error);
				} else {
					setErrorMsg('Sistema de autenticação indisponível');
				}
			});

		setIsWaiting(false);
	}

	return (
		<div id="page-reset">
			<Helmet title="Trocar senha" />

			<div id="page-reset-logo-content" className="login-container">
				<div className="page-logo-container">
					<img src={logoImg} alt="Proffy" />
					<h2>Sua plataforma de estudos online.</h2>
				</div>
			</div>

			<div id="page-reset-input-content" className="reset-container">
				<main>
					<Link to="/" className="backButton">
						<img src={backImg} alt="Voltar" />
					</Link>

					<form onSubmit={handleReset}>
						<fieldset>
							<legend>Escolha sua nova senha</legend>
							<p>Cuidado com o CAPS LOCK.</p>

							<LoginInput
								name="senha"
								placeholder="Senha"
								type="password"
								pattern={passwordPattern.pattern}
								title={passwordPattern.title}
								required={true}
								value={password}
								onChange={e => {
									setPassword(e.target.value);
								}}
							/>

							<LoginInput
								name="confirmarSenha"
								placeholder="Confirmar senha"
								type="password"
								pattern={password}
								title="As senhas não coincidem"
								required={true}
								value={passwordConfirmation}
								onChange={e => {
									setPasswordConfirmation(e.target.value);
								}}
							/>
						</fieldset>

						<footer>
							<button disabled={isWaiting} type="submit">
								Trocar senha
							</button>

							<p className="page-reset-error">{errorMsg}</p>
						</footer>
					</form>

					<div></div>
				</main>
			</div>

			{showAlert && (
				<AlertPanel
					title="Senha alterada!"
					message="Boa, agora é só logar usando sua nova senha."
					buttonText="Voltar ao login"
				/>
			)}
		</div>
	);
}

export default ChangePassword;
