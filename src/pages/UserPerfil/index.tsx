import React, { useState, FormEvent, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';

import PageHeader from '../../components/PageHeader';
import Textarea from '../../components/Textarea';
import Input from '../../components/Input';
import UserClassItem, { UserClasses } from '../../components/UserClassItem';

import userIcon from '../../assets/images/icons/user.svg';
import warningIcon from '../../assets/images/icons/warning.svg';

import api from '../../services/api';

import { phonePattern } from '../../assets/utils/patterns';
import './styles.css';

interface SubjectItem {
    id: number,
    name: string
}

function UserPerfil() {
    const history = useHistory();

    const { user } = useAuth();
    const [classes, setClasses] = useState([]);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        api.get('user-classes').then(response => {
            setClasses(response.data);
        })
    }, []);

    useEffect(() => {
        if(user) {
            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
            setWhatsapp(user.whatsapp ? user.whatsapp : '');
            setBio(user.bio ? user.bio : '');
        }
    }, [user]);

    function removeSpecialCharacters(text:string) {
        return text.replace(/[^0-9.,]/g, "").replace(',', '.');
    }

    function handleUpdateUser(e: FormEvent) {
        e.preventDefault();

        if(user) {
            api.post('user-update', {
                name,
                surname,
                email,
                bio,
                whatsapp: removeSpecialCharacters(whatsapp)
            }).then(() => {
                history.push('/');
            }).catch(() => {
                alert('Erro ao atualizar cadastro')
            });
        } else {
            alert('Erro ao atualizar cadastro: usuário não definido')
        }
    }

    return (
        <div id="user-form" className="container" >
            <PageHeader pageName="Meu Perfil">
                <div className="user-header">
                    <img src={user && user.avatar ? user.avatar : userIcon} alt={user?.name} className="user-icon"/>
                    <h2>{user ? user.name + ' ' + user.surname : 'Usuário não identificado'}</h2>
                </div>
            </PageHeader>

            <main>
                <form onSubmit={handleUpdateUser}>
                    <fieldset>
                        <legend>Seus dados</legend>        

                        <div id="personal-data-inputs" className="user-info-input">
                            <Input name="nome" label="Nome" type="text" required value={name} onChange={ (e) => {setName(e.target.value)} } />
                            <Input name="sobrenome" label="Sobrenome" type="text" required value={surname} onChange={ (e) => {setSurname(e.target.value)} } />
                        </div>

                        <div id="contact-inputs" className="user-info-input">
                            <Input name="email" type="email" label="E-mail" required value={email} onChange={ (e) => {setEmail(e.target.value)} } />
                            <Input name="whatsapp" label="Whatsapp" mask="+99 (99) 99999-9999" required pattern={phonePattern.pattern} title={phonePattern.title} value={whatsapp}onChange={ (e) => {setWhatsapp(e.target.value)} } />
                        </div>

                        <Textarea maxLength={300} name="biografica" label="Biografica" required value={bio} onChange={ (e) => {setBio(e.target.value)} } />
                    </fieldset>

                    <fieldset>
                        <legend>Suas aulas</legend>

                        {classes.length > 0 ? 
                            classes.map((classe:UserClasses) => {
                                return <UserClassItem key={classe.id} classe={classe} />;
                            }) :
                            <div className="emptyMessage">
                                <p>Nenhuma aula cadastrada.</p>
                            </div>
                        }
                    </fieldset>
                
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados corretamente
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

export default UserPerfil;