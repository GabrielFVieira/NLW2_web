import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import { User } from '../../contexts/auth';
import api from '../../services/api';

import './styles.css';
import ScheduleBar, { Schedule } from '../ScheduleBar';

interface Subject {
    id: number,
    name: string
}

export interface TeacherClasses {
    id: number,
    subject: Subject,
    cost: number,
    schedules: Schedule[],
    description?: number,
    user: User
}

interface ClassItemProps {
    teacher: TeacherClasses;
}

const TeacherItem:React.FC <ClassItemProps> = ({ teacher }) => {
    function createNewConnection() {
        api.post('/connections', {
            user_id: teacher.id,
        })
    }
    
    function formatMoney(value: number) {
        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
          
        return formatter.format(value);
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.user.avatar} alt={teacher.user.name}/>
                <div>
                    <strong>{`${teacher.user.name} ${teacher.user.surname}`}</strong>
                    <span>{teacher.subject.name}</span>
                </div>
            </header>

            <p>{teacher.description}</p>
            
            <div className="teacher-item-schedules">
                <ScheduleBar schedules={teacher.schedules}/>
            </div>

            <footer>
                <p>
                    Preço/hora:
                    <strong>{formatMoney(teacher.cost)}</strong>
                </p>
                <a target="_blank" rel="noopener noreferrer" onClick={createNewConnection} href={`https://wa.me/${teacher.user.whatsapp}`}>
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;