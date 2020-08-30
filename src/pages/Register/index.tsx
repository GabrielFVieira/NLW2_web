import React, { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';

import LoginInput from '../../components/LoginInput';

import logoImg from '../../assets/images/logo.svg';
import backImg from '../../assets/images/icons/back.svg';

import './styles.css';
import api from '../../services/api';

function Register() {
    const history = useHistory();
    
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleRegister(e: FormEvent) {
        e.preventDefault();

        api.post('user', {
            name,
            surname,
            email,
            password,
        }).then(() => {
            alert('Cadastro realizado com sucesso!')
            history.push('/');
        }).catch(() => {
            alert('Erro ao realizar cadastro')
        });
    }

    return (
        <div id="page-register">
            <div id="page-login-logo-content" className="login-container">
                <div className="page-logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>
            </div>

            <div id="page-register-input-content" className="register-container">
                <main>
                    <Link to="/" className="backButton">
                        <img src={backImg} alt="Voltar"/>
                    </Link>
                    
                    <form onSubmit={handleRegister}>
                        <fieldset>
                            <legend>Cadastro</legend>
                            <p>Preencha os dados abaixo para começar</p>

                            <LoginInput name="nome" placeholder="Nome" type="text" required={true} value={name} onChange={ (e) => {setName(e.target.value)} } />
                            <LoginInput name="sobrenome" placeholder="Sobrenome" type="text" required={true} value={surname} onChange={ (e) => {setSurname(e.target.value)} } />
                            <LoginInput name="email" placeholder="E-mail" type="email" required={true} value={email} onChange={ (e) => {setEmail(e.target.value)} } />
                            <LoginInput name="senha" placeholder="Senha" type="password" minLength={8} required={true} value={password} onChange={ (e) => {setPassword(e.target.value)} } />
                        </fieldset>
                    
                        <footer>
                            <button type="submit">
                                Concluir cadastro
                            </button>
                        </footer>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default Register;