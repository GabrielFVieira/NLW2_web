import React, { useState, FormEvent, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';
import removeIcon from '../../assets/images/icons/remove.svg';
import rocketIcon from '../../assets/images/icons/rocket.svg';

import api from '../../services/api';

import './styles.css';
import { useAuth } from '../../contexts/auth';

interface SubjectItem {
    id: number,
    name: string
}

function TeacherForm() {
    const history = useHistory();

    const { user } = useAuth();
    const [subjects, setSubjects] = useState([]);
    
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState(0);
    const [cost, setCost] = useState('');

    const [schedules, setSchedules] = useState([
        { week_day: '', from: '', to: '' }
    ]);

    useEffect(() => {
        api.get('subjects').then(response => {
            const subjectsOptions = response.data.map((subjectItem:SubjectItem) => {
                return { value: subjectItem.id, label: subjectItem.name };
            })

            setSubjects(subjectsOptions);
        })
    }, []);

    function addNewScheduleItem() {
        setSchedules([
            ...schedules,
            { week_day: '', from: '', to: '' }
        ]);
    }

    function removeScheduleItem(scheduleIndex: number) {
        const scheduleItemsOriginal = [...schedules]
        scheduleItemsOriginal.splice(scheduleIndex, 1)
        setSchedules(scheduleItemsOriginal);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItems = schedules.map((scheduleItem, index) => {
            if(index === position) {
                return {...scheduleItem, [field]: value};
            }

            return scheduleItem;
        });

        setSchedules(updateScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        if(!schedules || schedules.length === 0) {
            alert('Cadestre ao menos um horário!')
            return;
        }

        api.post('classes', {
            description,
            subject: { id: subject },
            cost: Number(cost),
            schedules
        }).then(() => {
            alert('Cadastro realizado com sucesso!')
            history.push('/');
        }).catch(() => {
            alert('Erro ao realizar cadastro')
        });
    }

    return (
        <div id="page-teacher-form" className="container" >
            <PageHeader 
                pageName="Dar aulas"
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
                rightContent={{
                    image: rocketIcon,
                    imageAlt: "Foguete", 
                    text: "Preparare-se!\nVai ser o máximo."
                }}
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>            
                        <div className="teacher-info">
                            <div>
                                <img src={user && user.avatar ? user.avatar : ''} alt={user?.name} className="user-icon"/>
                                <h2 className="proffy-name">{`${user?.name} ${user?.surname}`}</h2>
                            </div>
                            
                            <Input name="whatsapp" label="Whatsapp" type="text" data-mask="+00 (00) 00000-0000" data-mask-selectonfocus="true" value={user?.whatsapp} readOnly={false} onChange={ (e) => {} }/>
                        </div>

                        <Textarea maxLength={300} name="description" required value={description} label="Descrição da aula" onChange={ (e) => {setDescription(e.target.value)} } />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            options={subjects}
                            required
                            onChange={ (e) => {setSubject(Number(e.target.value))} }
                        />
                        <Input name="cost" label="Custo da sua hora por aula" type="number" min="0" required value={cost} onChange={ (e) => {setCost(e.target.value)} }/>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        
                        {schedules.map((scheduleItem, index) => {
                            return (
                                <div key={index} className="schedule-item">
                                    <Select 
                                        name="week-day" 
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        required
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: "Domingo" },
                                            { value: '1', label: "Segunda-Feira" },
                                            { value: '2', label: "Terça-Feira" },
                                            { value: '3', label: "Quarta-Feira" },
                                            { value: '4', label: "Quinta-Feira" },
                                            { value: '5', label: "Sexta-Feira" },
                                            { value: '6', label: "Sábado" }
                                        ]}
                                    />
                                    <Input name="from" label="Das" type="time" required value={scheduleItem.from} onChange={e => setScheduleItemValue(index, 'from', e.target.value)}/>
                                    <Input name="to" label="Até" type="time" required value={scheduleItem.to} onChange={e => setScheduleItemValue(index, 'to', e.target.value)}/>
                                    <button type="button" onClick={() => removeScheduleItem(index)}>
                                        <img src={removeIcon} alt="Remover"/>
                                    </button>
                                </div>
                            )
                        })} 
                    </fieldset>
                
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;