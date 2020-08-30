import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

import { User } from '../../contexts/auth';
import api from '../../services/api';

import './styles.css';

interface Subject {
    id: number,
    name: string
}

export interface TeacherClasses {
    id: number,
    subject: Subject,
    cost: number,
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

            <footer>
                <p>
                    Preço/hora:
                    <strong>R${teacher.cost}</strong>
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