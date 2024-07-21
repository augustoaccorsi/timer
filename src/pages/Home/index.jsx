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
                        list="taskSuggestions"
                    />

                    <datalist id="taskSuggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                    </datalist>

                    <label htmlFor="time">during</label>
                    <MinutesInput
                        id="time"
                        type="number"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                    />
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
