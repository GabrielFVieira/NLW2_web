import React, { useState, FormEvent, useEffect } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { TeacherClasses } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import smileIcon from '../../assets/images/icons/smile.svg';

import api from '../../services/api';

import './styles.css';

interface SubjectItem {
    id: number,
    name: string
}

function TeacherList() {
    const [teacherCount, setTeacherCount] = useState(0);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        api.get('classes').then(response => {
            setTeachers(response.data);
            setTeacherCount(response.data.length)
        })

        api.get('subjects').then(response => {
            const subjectsOptions = response.data.map((subjectItem:SubjectItem) => {
                return { value: subjectItem.id, label: subjectItem.name };
            })

            setSubjects(subjectsOptions);
        })
    }, []);

    async function searchTeacher(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container" >
            <PageHeader 
                pageName="Estudar"
                title="Estes são os proffys disponíveis."
                rightContent={{
                    image: smileIcon,
                    imageAlt: "Sorriso", 
                    text: `Nós temos ${teacherCount} professores.`
                }}
            >
                <form id="search-teachers" onSubmit={searchTeacher}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        options={subjects}
                        onChange={ (e) => {setSubject(e.target.value)} }
                    />
                    <Select 
                        name="week-day" 
                        label="Dia da semana"
                        value={week_day}
                        options={[
                            { value: '0', label: "Domingo" },
                            { value: '1', label: "Segunda-Feira" },
                            { value: '2', label: "Terça-Feira" },
                            { value: '3', label: "Quarta-Feira" },
                            { value: '4', label: "Quinta-Feira" },
                            { value: '5', label: "Sexta-Feira" },
                            { value: '6', label: "Sábado" }
                        ]}
                        onChange={ (e) => {setWeekDay(e.target.value)} }
                    />
                    <Input type="time" name="time" label="Hora" value={time} onChange={ (e) => {setTime(e.target.value)} }/>
                    
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.length > 0 ? 
                    teachers.map((teacher:TeacherClasses) => {
                        return <TeacherItem key={teacher.id} teacher={teacher} />;
                    }) :
                    <div className="emptyMessage">
                        <p>Nenhum professor encontrado com sua pesquisa.</p>
                    </div>
                }
            </main>
        </div>
    )
}

export default TeacherList;