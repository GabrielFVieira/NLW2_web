import React, { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

import './styles.css';

interface InputsProps extends InputHTMLAttributes <HTMLInputElement> {
    name: string;
    label: string;
    mask?: string;
}

const Input: React.FC <InputsProps> = ({ name, label, mask, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <InputMask mask={mask ? mask : ""} placeholder={mask ? mask : rest.placeholder} type="text" id={name} {...rest} />
        </div>
    );
}

export default Input;