import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import logoIcon from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface RightContentProps {
    image: string,
    imageAlt: string,
    text: string
}

interface PageHeaderProps {
    title?: string;
    pageName: string;
    description?: string;
    rightContent?: RightContentProps;
}

const PageHeader: React.FC  <PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <Helmet>
                <title>{props.pageName}</title>
                <meta name="theme-color" content="#774DD6" />
            </Helmet>

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
                <div className="header-content-top">
                    <div className="header-content-top-left">
                        <strong>{props.title}</strong>
                        { props.description && <p>{ props.description }</p> }
                    </div>

                    { props.rightContent &&
                        <div className="header-content-top-right">
                            <img src={props.rightContent.image} alt={props.rightContent.imageAlt}/>
                            <p>{ props.rightContent.text }</p> 
                        </div>
                    }
                </div>

                {props.children}
            </div>
        </header>
    )
}

export default PageHeader;