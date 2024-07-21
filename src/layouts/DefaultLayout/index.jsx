import React from 'react';
import Header from '../../components/Header/index';
import { Outlet } from 'react-router-dom';
import { LauyoutConteiner } from './styles';

const DefaultLayout = () => {
    return (
        <LauyoutConteiner>
            <Header />
            <Outlet />
        </LauyoutConteiner>
    );
};

export default DefaultLayout;
