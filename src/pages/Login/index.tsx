import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackPromise } from 'react-promise-tracker';

import LoginInput from '../../components/LoginInput';

import logoImg from '../../assets/images/logo.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import { passwordPattern } from '../../assets/utils/patterns';

import { useAuth } from '../../contexts/auth';
import './styles.css';

function Login() {
	const { signIn } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');

	async function handleLogin(e: FormEvent) {
		e.preventDefault();
		setErrorMsg('');

		try {
			await trackPromise(signIn(email, password, remember));
		} catch (e) {
			setErrorMsg(e.message);
		}
	}

	return (
		<div id="page-login">
			<Helmet title="Login" />

			<div id="page-login-logo-content" className="login-container">
				<div className="page-logo-container">
					<img src={logoImg} alt="Proffy" />
					<h2>Sua plataforma de estudos online.</h2>
				</div>
			</div>

			<div id="page-login-input-content" className="login-container">
				<main>
					<form onSubmit={handleLogin}>
						<fieldset>
							<legend>Fazer login</legend>

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
							<div>
								<label className="rememberChk">
									<input
										type="checkbox"
										id="remember"
										onChange={e => {
											setRemember(e.target.checked);
										}}
									/>
									<span className="checkmark"></span>
									Lembrar-me
								</label>

								<Link to="/recovery" className="recoverPassword">
									Esqueci minha senha
								</Link>
							</div>

							<button type="submit">Entrar</button>

							<p className="page-login-error">{errorMsg}</p>
						</footer>
					</form>

					<div className="page-login-footer">
						<div>
							<p>Não tem conta?</p>
							<Link to="/register" className="register">
								Cadastre-se
							</Link>
						</div>

						<span>
							É de graça <img src={purpleHeartIcon} alt="Coração roxo" />
						</span>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Login;
