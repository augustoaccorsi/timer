import React from 'react';
import { HeaderContainer } from './styles';
import logo from '../../assets/logo.svg';
import { MdOutlineTimer } from 'react-icons/md';
import { LuScrollText } from 'react-icons/lu';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <HeaderContainer>
            <img src={logo} />
            <nav>
                <NavLink to="/">
                    <MdOutlineTimer size={25} title="Timer" />
                </NavLink>
                <NavLink to="/history">
                    <LuScrollText size={25} title="History" />
                </NavLink>
            </nav>
        </HeaderContainer>
    );
};

export default Header;
