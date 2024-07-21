import React from 'react';
import { FaPlay } from 'react-icons/fa';
import {
    CountDownContainer,
    CountDownSeparator,
    FormContainer,
    HomeContainer,
    MinutesInput,
    TaskInput,
    StartContDownButton,
} from './styles';

const Home = () => {
    return (
        <HomeContainer>
            <form>
                <FormContainer>
                    <label htmlFor="task">Will be working on</label>
                    <TaskInput
                        id="task"
                        placeholder="Give a name for your task"
                    />
                    <label htmlFor="time">during</label>
                    <MinutesInput id="time" type="number" placeholder="00" />
                    <span>minutes.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <CountDownSeparator>:</CountDownSeparator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>

                <StartContDownButton type="submit">
                    <FaPlay size={24} />
                    Start
                </StartContDownButton>
            </form>
        </HomeContainer>
    );
};

export default Home;
