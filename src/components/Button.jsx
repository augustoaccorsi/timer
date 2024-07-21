import React from 'react';
import { ButtonContainer } from './Button.styles';

export const Button = ({ variant = 'primary' }) => {
    return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
};
