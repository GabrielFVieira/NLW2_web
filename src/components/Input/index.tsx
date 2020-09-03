import React, { InputHTMLAttributes, useCallback } from 'react';

import { cellphone } from '../masks';

import './styles.css';

interface InputsProps extends InputHTMLAttributes <HTMLInputElement> {
    name: string;
    label: string;
    mask?: "cellphone";
}

const Input: React.FC <InputsProps> = ({ name, label, mask, ...rest }) => {
    const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        
        if(mask === "cellphone") {
            cellphone(e);
        }

        return e;
    }, [mask])

    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest} onKeyUp={handleKeyUp} />
        </div>
    );
}

export default Input;