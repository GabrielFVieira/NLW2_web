import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackPromise } from 'react-promise-tracker';

import LoginInput from '../../components/LoginInput';

import logoImg from '../../assets/images/logo.svg';
import backImg from '../../assets/images/icons/back.svg';

import { passwordPattern } from '../../assets/utils/patterns';

import api from '../../services/api';
import './styles.css';
import AlertPanel from '../../components/AlertPanel';

function Register() {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [errorMsg, setErrorMsg] = useState('');
	const [showAlert, setShowAlert] = useState(false);

	function handleRegister(e: FormEvent) {
		e.preventDefault();

		trackPromise(
			api
				.post('user', {
					name,
					surname,
					email,
					password,
				})
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
				})
		);
	}

	return (
		<div id="page-register">
			<Helmet title="Cadastro" />

			<div id="page-login-logo-content" className="login-container">
				<div className="page-logo-container">
					<img src={logoImg} alt="Proffy" />
					<h2>Sua plataforma de estudos online.</h2>
				</div>
			</div>

			<div id="page-register-input-content" className="register-container">
				<main>
					<Link to="/" className="backButton">
						<img src={backImg} alt="Voltar" />
					</Link>

					<form onSubmit={handleRegister}>
						<fieldset>
							<legend>Cadastro</legend>
							<p>Preencha os dados abaixo para começar</p>

							<LoginInput
								name="nome"
								placeholder="Nome"
								type="text"
								required={true}
								value={name}
								onChange={e => {
									setName(e.target.value);
								}}
							/>
							<LoginInput
								name="sobrenome"
								placeholder="Sobrenome"
								type="text"
								required={true}
								value={surname}
								onChange={e => {
									setSurname(e.target.value);
								}}
							/>
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
						</fieldset>

						<footer>
							<button type="submit">Concluir cadastro</button>

							<p className="page-register-error">{errorMsg}</p>
						</footer>
					</form>

					<div></div>
				</main>
			</div>

			{showAlert && (
				<AlertPanel
					title="Cadastro concluído"
					message="Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência."
					buttonText="Fazer login"
				/>
			)}
		</div>
	);
}

export default Register;
