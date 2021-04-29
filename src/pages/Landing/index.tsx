import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import logoutImg from '../../assets/images/icons/logout.svg';
import landingImg from '../../assets/images/landing.svg';
import userIcon from '../../assets/images/icons/user.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import './styles.css';

function Landing() {
	const { user, signOut } = useAuth();
	const [totalConnections, setTotalConnections] = useState(0);

	useEffect(() => {
		api.get('connections').then(response => {
			const { total } = response.data;
			setTotalConnections(total);
		});
	}, []);

	function handleLogout() {
		signOut();
	}

	return (
		<div id="page-landing">
			<div id="page-landing-top">
				<div className="page-landing-header">
					<Link to="/user" className="user-info">
						<img src={user && user.avatar ? user.avatar : userIcon} alt={user?.name} className="user-icon" />
						{user ? user.name + ' ' + user.surname : 'Usuário não identificado'}
					</Link>

					<img src={logoutImg} onClick={handleLogout} alt="Sair" className="logout-button" />
				</div>

				<div className="logo-content-container">
					<div className="logo-container">
						<img src={logoImg} alt="Proffy" />
						<h2>Sua plataforma de estudos online.</h2>
					</div>

					<div className="hero-image-container">
						<img src={landingImg} alt="Plataforma de estudos" className="hero-image" />
					</div>
				</div>
			</div>

			<div id="page-landing-content">
				<div className="bottom-container">
					<p>
						Seja bem-vindo.
						<br />
						<b>O que deseja fazer?</b>
					</p>

					<span className="total-connections">
						Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
					</span>

					<div className="buttons-container">
						<Link to="/study" className="study">
							<img src={studyIcon} alt="Estudar" />
							Estudar
						</Link>

						<Link to="/give-classes" className="give-classes">
							<img src={giveClassesIcon} alt="Dar aulas" />
							Dar aulas
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Landing;
