import React, { useState, FormEvent } from 'react';
import {Link} from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import logoImg from '../../assets/images/logo.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import LoginInput from '../../components/LoginInput';

import './styles.css';

function Login() {
    const { signIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        const response = await signIn(email, password, remember);

        if(response && response.error) {
            setErrorMsg(response.error);
        }
    }

    return (
        <div id="page-login">
            <div id="page-login-logo-content" className="login-container">
                <div className="page-logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            </div>

            <div id="page-login-input-content" className="login-container">
                <main>
                    <form onSubmit={handleLogin}>
                        <fieldset>
                            <legend>Fazer login</legend>

                            <LoginInput name="email" placeholder="E-mail" type="email" required={true} value={email} onChange={ (e) => {setEmail(e.target.value)} } />
                            <LoginInput name="senha" placeholder="Senha" type="password" minLength={8} required={true} value={password} onChange={ (e) => {setPassword(e.target.value)} } />
                        </fieldset>
                    
                        <footer>
                            <div>
                                <label className="rememberChk">
                                    <input type="checkbox" id="remember" onChange={ (e) => {setRemember(e.target.checked)} }/>
                                    <span className="checkmark"></span>
                                    Lembrar-me
                                </label>
                                
                                <Link to="/recovery" className="recoverPassword">
                                    Esqueci minha senha
                                </Link>
                            </div>

                            <button type="submit">
                                Entrar
                            </button>

                            <p>{errorMsg}</p>
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
                            É de graça <img src={purpleHeartIcon} alt="Coração roxo"/>
                        </span>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Login;