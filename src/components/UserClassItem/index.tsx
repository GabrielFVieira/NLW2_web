import React, { useState, useEffect } from 'react';

import './styles.css';
import { Schedule } from '../ScheduleBar';
import { Subject } from '../TeacherItem';
import { currencyPattern } from '../../assets/utils/patterns';
import Textarea from '../Textarea';
import Input from '../Input';

import removeIcon from '../../assets/images/icons/remove.svg';
import Select from '../Select';

export interface UserClasses {
    id: number,
    subject: Subject,
    cost: number,
    schedules: Schedule[],
    description?: string,
}

interface UserClassItemProps {
    classe: UserClasses;
}

const UserClassItem:React.FC <UserClassItemProps> = ({ classe }) => {
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [subject, setSubject] = useState('');

    const [schedules, setSchedules] = useState([
        { to_formated: '', from_formated: '' } as Schedule
    ]);

    useEffect(() => {
        if(classe.description) {
            setDescription(classe.description);
        }

        setCost(formatNumber(classe.cost));
        setSubject(classe.subject.name);
        setSchedules(classe.schedules);
    }, [classe]);

    function formatNumber(value: number) {
        let text = Number(value).toFixed(2).toString();

        return text.padStart(5, '0');
    }

    function handleRemove() {
        console.log('removing');
    }

    function addNewScheduleItem() {
        setSchedules([
            ...schedules,
            { to_formated: '', from_formated: '' } as Schedule
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

    return (
        <div className="user-class-item">
            <div className="user-class-item-container">
                <Input className="disabled-input" name="subject" label="Matéria" value={subject} disabled/>
                <Input name="cost" label="Custo da sua hora por aula" mask="R$99,99" pattern={currencyPattern.pattern} 
                    title={currencyPattern.title} required value={cost} onChange={ (e) => {setCost(e.target.value)} }/>
            </div>

            <Textarea maxLength={1000} name="description" required value={description} label="Descrição da aula"
            onChange={ (e) => {setDescription(e.target.value)} } />

            <h3>
                <span>Horários</span>
                <span className="add-schedule" onClick={addNewScheduleItem}>+ Novo horário</span>
            </h3>
                        
            {schedules.map((scheduleItem, index) => {
                return (
                    <div key={index} className="schedule-item">
                        <Select name="week-day" label="Dia da semana" value={scheduleItem.week_day}
                        required onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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

                        <div className="hour-container">
                            <Input name="from" label="Das" type="time" required value={scheduleItem.from_formated} 
                            onChange={e => setScheduleItemValue(index, 'from_formated', e.target.value)}/>

                            <Input name="to" label="Até" type="time" required value={scheduleItem.to_formated} 
                            onChange={e => setScheduleItemValue(index, 'to_formated', e.target.value)}/>
                        </div>

                        <button type="button" onClick={() => removeScheduleItem(index)} disabled={schedules.length <= 1}>
                            <img src={removeIcon} alt="Remover"/>
                        </button>
                    </div>
                )
            })}

            <h2><span onClick={handleRemove}>Excluir aula</span></h2>
        </div>
    );
}

export default UserClassItem;