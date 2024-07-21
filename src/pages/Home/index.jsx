import React, { useEffect, useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import {
    CountDownContainer,
    CountDownSeparator,
    FormContainer,
    HomeContainer,
    MinutesInput,
    TaskInput,
    StartContDownButton,
    StopContDownButton,
} from './styles';
import { v4 as uuidv4 } from 'uuid';
import { differenceInSeconds } from 'date-fns';

const generateCycle = (name, minutes) => {
    return {
        ID: uuidv4(),
        task: name,
        minutesAmout: parseInt(minutes),
        startDate: new Date(),
    };
};

const Home = () => {
    const [cycle, setCycles] = useState([]);
    const [cycleName, setCycleName] = useState('');
    const [duration, setDuration] = useState('');
    const [activeCycleId, setActiveCycleId] = useState(null);
    const [amoutSecondsPassed, setAmoutSecondsPassed] = useState(0);

    const onStartCounter = (event) => {
        event.preventDefault();

        if (cycleName.length === 0 || duration.length === 0) {
            return;
        }

        const newTask = generateCycle(cycleName, duration);
        setCycles([newTask, ...cycle]);

        setActiveCycleId(newTask.ID);
        setCycleName('');
        setDuration('');
    };

    const activeCycle = cycle.find((cycle) => cycle.ID === activeCycleId);

    useEffect(() => {
        if (activeCycle) {
            setInterval(() => {
                setAmoutSecondsPassed(
                    differenceInSeconds(new Date(), activeCycle.startDate)
                );
            }, 1000);
        }
    }, [activeCycle]);

    const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amoutSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    const handleStopTimer = () => {
        setActiveCycleId(null);
    };

    return (
        <HomeContainer>
            <form onSubmit={onStartCounter}>
                <FormContainer>
                    <label htmlFor="task">Will be working on</label>
                    <TaskInput
                        id="task"
                        placeholder="Give a name for your task"
                        list="taskSuggestions"
                        value={cycleName}
                        onChange={(event) => setCycleName(event.target.value)}
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
                        value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                    />
                    <span>minutes.</span>
                </FormContainer>

                <CountDownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <CountDownSeparator>:</CountDownSeparator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountDownContainer>

                {!activeCycleId ? (
                    <StartContDownButton
                        type="submit"
                        disabled={
                            duration.length === 0 || cycleName.length === 0
                        }
                    >
                        <FaPlay size={24} />
                        Start
                    </StartContDownButton>
                ) : (
                    <StopContDownButton onClick={handleStopTimer}>
                        <FaStop size={24} />
                        Stop
                    </StopContDownButton>
                )}
            </form>
        </HomeContainer>
    );
};

export default Home;
