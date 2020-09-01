import React from 'react';
import { Link } from 'react-router-dom';

import logoIcon from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface PageHeaderProps {
    title: string;
    pageName: string;
    description?: string;
}

const PageHeader: React.FC  <PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <div className="top-bar-itens">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar"/>
                    </Link>
                    <p>{props.pageName}</p>
                    <img src={logoIcon} alt="Proffy"/>
                </div>
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                { props.description && <p>{ props.description }</p> }


                {props.children}
            </div>
        </header>
    )
}

export default PageHeader;