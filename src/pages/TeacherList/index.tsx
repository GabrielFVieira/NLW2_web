import React, { useState, FormEvent, useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Classes } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import smileIcon from '../../assets/images/icons/smile.svg';

import weekDays from '../../assets/utils/weekDays';

import api from '../../services/api';
import './styles.css';

interface SubjectItem {
	id: number;
	name: string;
}

function TeacherList() {
	const [teacherCount, setTeacherCount] = useState(0);
	const [teachers, setTeachers] = useState([]);
	const [subjects, setSubjects] = useState([]);

	const [subject, setSubject] = useState('');
	const [week_day, setWeekDay] = useState('');
	const [time, setTime] = useState('');

	useEffect(() => {
		trackPromise(
			api.get('classes').then(response => {
				setTeachers(response.data);
				setTeacherCount(response.data.length);
			})
		);

		trackPromise(
			api.get('subjects').then(response => {
				const subjectsOptions = response.data.map((subjectItem: SubjectItem) => {
					return { value: subjectItem.id, label: subjectItem.name };
				});

				setSubjects(subjectsOptions);
			})
		);
	}, []);

	async function searchTeacher(e: FormEvent) {
		e.preventDefault();

		const response = await trackPromise(
			api.get('classes', {
				params: {
					subject,
					week_day,
					time,
				},
			})
		);

		setTeachers(response.data);
	}

	return (
		<div id="page-teacher-list" className="container">
			<PageHeader
				pageName="Estudar"
				title="Estes são os proffys disponíveis."
				rightContent={{
					image: smileIcon,
					imageAlt: 'Sorriso',
					text: `Nós temos ${teacherCount} ${teacherCount > 1 ? 'professores' : 'professor'}.`,
				}}
			>
				<form id="search-teachers" onSubmit={searchTeacher}>
					<Select
						name="subject"
						label="Matéria"
						value={subject}
						options={subjects}
						onChange={e => {
							setSubject(e.target.value);
						}}
					/>
					<Select
						name="week-day"
						label="Dia da semana"
						value={week_day}
						onChange={e => {
							setWeekDay(e.target.value);
						}}
						options={weekDays}
					/>

					<Input
						type="time"
						name="time"
						label="Hora"
						value={time}
						onChange={e => {
							setTime(e.target.value);
						}}
					/>

					<button type="submit">Buscar</button>
				</form>
			</PageHeader>

			<main>
				{teachers.length > 0 ? (
					teachers.map((teacher: Classes) => {
						return <TeacherItem key={teacher.id} teacher={teacher} />;
					})
				) : (
					<div className="emptyMessage">
						<p>Nenhum professor encontrado com sua pesquisa.</p>
					</div>
				)}

				{teachers.length > 0 && (
					<div className="endingMessage">
						<p>Estes são todos os resultados.</p>
					</div>
				)}
			</main>
		</div>
	);
}

export default TeacherList;
