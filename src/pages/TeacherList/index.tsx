import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './styles.css';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    
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
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={searchTeacher}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        value={subject}
                        options={[
                            { value: 'artes', label: "Artes" },
                            { value: 'matematica', label: "Matemática" },
                            { value: 'portugues', label: "Português" },
                            { value: 'geografia', label: "Geografia" }
                        ]}
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
                    teachers.map((teacher:Teacher) => {
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