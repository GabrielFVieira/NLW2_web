import React, { useState, FormEvent, useEffect, useMemo } from 'react';
import { useAuth } from '../../contexts/auth';
import { trackPromise } from 'react-promise-tracker';

import PageHeader from '../../components/PageHeader';
import AlertPanel from '../../components/AlertPanel';
import Textarea from '../../components/Textarea';
import Input from '../../components/Input';
import UserClassItem, { UserClasses } from '../../components/UserClassItem';

import userIcon from '../../assets/images/icons/user.svg';
import warningIcon from '../../assets/images/icons/warning.svg';
import cameraIcon from '../../assets/images/icons/camera.svg';

import { passwordPattern, phonePattern } from '../../assets/utils/patterns';

import api from '../../services/api';
import './styles.css';
import LoginInput from '../../components/LoginInput';

function UserPerfil() {
	const { user, updateUser } = useAuth();
	const [classes, setClasses] = useState([] as UserClasses[]);
	const [removedClasses, setRemovedClasses] = useState([] as number[]);
	const [removedSchedules, setRemovedSchedules] = useState([] as number[]);

	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [avatar, setAvatar] = useState<any>(null);
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [bio, setBio] = useState('');

	const [oldPassword, setOldPassword] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const [showAlert, setShowAlert] = useState(false);

	useEffect(() => {
		trackPromise(
			api
				.get('user-classes')
				.then(response => {
					if (response.status === 200) {
						setClasses(response.data);
					}
				})
				.catch(err => {
					if (err.response) {
						alert(err.response.data.error);
					} else {
						alert('Sistema indisponível');
					}
				})
		);
	}, []);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setSurname(user.surname);
			setEmail(user.email);
			setWhatsapp(user.whatsapp ? user.whatsapp : '');
			setBio(user.bio ? user.bio : '');
		}
	}, [user]);

	const preview = useMemo(() => {
		return avatar ? URL.createObjectURL(avatar) : user && user.avatar ? user.avatar : userIcon;
	}, [user, avatar]);

	function removeSpecialCharacters(text: string) {
		return text.replace(/[^0-9.,]/g, '').replace(',', '.');
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (showAlert) {
			return;
		}

		try {
			if (password !== '') {
				await changePasswordBD();
			}

			const userResponse = await updateUserBD();
			await handleRemovedSchedules();
			await handleRemovedClasses();
			await updateClassesBD();
			updateUser(userResponse.data);

			setShowAlert(true);
		} catch (err) {
			if (err.response) {
				alert(err.response.data.error);
			} else {
				alert('Sistema indisponível');
			}
		}
	}

	async function updateUserBD() {
		const data = new FormData();
		data.append('name', name);
		data.append('surname', surname);
		data.append('avatar', avatar);
		data.append('whatsapp', removeSpecialCharacters(whatsapp));
		data.append('bio', bio);

		return await trackPromise(api.put('user', data));
	}

	async function changePasswordBD() {
		return await trackPromise(
			api
				.post('user/changePassword', {
					password,
					oldPassword,
				})
				.then(response => response)
		);
	}

	async function updateClassesBD() {
		return await trackPromise(api.post('classes', classes));
	}

	function handleRemoveClass(index: number) {
		const classesNew = classes.slice();
		const removedClass = classesNew.splice(index, 1);

		const removedClassesNew = removedClasses.slice();
		removedClassesNew.push(removedClass[0].id);

		setClasses(classesNew);
		setRemovedClasses(removedClassesNew);
	}

	function handleRemovedSchedule(id: number) {
		const removedSchedulesNew = removedSchedules.slice();
		removedSchedulesNew.push(id);

		setRemovedSchedules(removedSchedulesNew);
	}

	async function handleRemovedClasses() {
		const promises = removedClasses.map(async removedClass => {
			api.delete('classes', {
				headers: {
					id: removedClass,
				},
			});
		});

		await trackPromise(Promise.all(promises));
		setRemovedClasses([]);
	}

	async function handleRemovedSchedules() {
		const promises = removedSchedules.map(async removedSchedule => {
			api.delete('schedules', {
				headers: {
					id: removedSchedule,
				},
			});
		});

		await trackPromise(Promise.all(promises));
		setRemovedSchedules([]);
	}

	return (
		<div id="user-form" className="container">
			<PageHeader pageName="Meu Perfil">
				<div className="user-header">
					<div className="user-icon-container">
						<label id="user-icon" style={{ backgroundImage: `url(${preview})` }}>
							<input
								type="file"
								onChange={event => {
									if (event.target.files && event.target.files[0]) {
										setAvatar(event.target.files[0]);
									}
								}}
								accept=".jpg,.jpeg,.png"
							/>
							<div className="camera-container">
								<img src={cameraIcon} alt="Adicionar foto" />
							</div>
						</label>
					</div>
					<h2>{user ? user.name + ' ' + user.surname : 'Usuário não identificado'}</h2>
				</div>
			</PageHeader>

			{!showAlert ? (
				<main>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend>Seus dados</legend>

							<div id="personal-data-inputs" className="user-info-input">
								<Input
									name="nome"
									label="Nome"
									type="text"
									required
									value={name}
									onChange={e => {
										setName(e.target.value);
									}}
								/>
								<Input
									name="sobrenome"
									label="Sobrenome"
									type="text"
									required
									value={surname}
									onChange={e => {
										setSurname(e.target.value);
									}}
								/>
							</div>

							<div id="contact-inputs" className="user-info-input">
								<Input name="email" type="email" label="E-mail" disabled value={email} />
								<Input
									name="whatsapp"
									label="Whatsapp"
									mask="+99 (99) 99999-9999"
									required
									pattern={phonePattern.pattern}
									title={phonePattern.title}
									value={whatsapp}
									onChange={e => {
										setWhatsapp(e.target.value);
									}}
								/>
							</div>

							<Textarea
								maxLength={300}
								name="biografica"
								label="Biografica"
								required
								value={bio}
								onChange={e => {
									setBio(e.target.value);
								}}
							/>
						</fieldset>

						<fieldset>
							<legend>
								Trocar senha <h6>(opcional)</h6>
							</legend>
							<div id="password-data-inputs" className="user-info-input">
								<LoginInput
									name="senhaAtual"
									placeholder="Senha atual"
									type="password"
									pattern={passwordPattern.pattern}
									title={passwordPattern.title}
									required={password !== ''}
									value={oldPassword}
									onChange={e => {
										setOldPassword(e.target.value);
									}}
								/>
								<LoginInput
									name="senha"
									placeholder="Nova senha"
									type="password"
									pattern={passwordPattern.pattern}
									title={passwordPattern.title}
									required={false}
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
									required={password !== ''}
									value={passwordConfirmation}
									onChange={e => {
										setPasswordConfirmation(e.target.value);
									}}
								/>
							</div>
						</fieldset>

						<fieldset>
							<legend>Suas aulas</legend>

							{classes.length > 0 ? (
								classes.map((classe: UserClasses, index: number) => {
									return (
										<UserClassItem
											key={classe.id}
											classe={classe}
											index={index}
											onRemove={handleRemoveClass}
											onRemoveSchedule={handleRemovedSchedule}
										/>
									);
								})
							) : (
								<div className="emptyMessage">
									<p>Nenhuma aula cadastrada.</p>
								</div>
							)}
						</fieldset>

						<footer>
							<p>
								<img src={warningIcon} alt="Aviso importante" />
								Importante! <br />
								Preencha todos os dados corretamente
							</p>
							<button type="submit">Salvar cadastro</button>
						</footer>
					</form>
				</main>
			) : (
				<AlertPanel
					title="Cadastro atualizado!"
					message="Tudo certo, você já pode voltar a navegar."
					buttonText="Voltar"
				/>
			)}
		</div>
	);
}

export default UserPerfil;
