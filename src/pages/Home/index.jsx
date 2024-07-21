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

const STATUS = {
    ON_GOING: 0,
    COMPLETED: 1,
    STOPPED: 2,
};

const generateCycle = (name, minutes) => {
    return {
        ID: uuidv4(),
        task: name,
        minutesAmout: parseInt(minutes),
        startDate: new Date(),
        status: STATUS.ON_GOING,
    };
};

const Home = () => {
    const [cycles, setCycles] = useState([]);
    const [cycleName, setCycleName] = useState('');
    const [duration, setDuration] = useState('');
    const [activeCycleId, setActiveCycleId] = useState(null);
    const [amoutSecondsPassed, setAmoutSecondsPassed] = useState(0);

    const onStartCounter = (event) => {
        event.preventDefault();

        if (cycleName.length === 0 || duration.length === 0) {
            return;
        }

        const newCycle = generateCycle(cycleName, duration);
        setCycles([newCycle, ...cycles]);

        setActiveCycleId(newCycle.ID);
        setCycleName('');
        setDuration('');
        setAmoutSecondsPassed(0);
    };

    const activeCycle = cycles.find((cycle) => cycle.ID === activeCycleId);
    const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0;
    useEffect(() => {
        let interval;
        if (activeCycle) {
            interval = setInterval(() => {
                const diff = differenceInSeconds(
                    new Date(),
                    activeCycle.startDate
                );

                if (diff >= totalSeconds) {
                    updateCycle(STATUS.COMPLETED);
                    setAmoutSecondsPassed(totalSeconds);
                    setActiveCycleId(null);
                    clearInterval(interval);
                }

                setAmoutSecondsPassed(diff);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [activeCycle, totalSeconds]);

    const currentSeconds = activeCycle ? totalSeconds - amoutSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(() => {
        document.title = activeCycle
            ? `Timer - ${minutes}:${seconds}`
            : 'Timer';
    }, [minutes, seconds]);

    const updateCycle = (newStatus) => {
        setCycles((state) =>
            state.map((cycle) =>
                cycle.ID === activeCycle.ID
                    ? { ...cycle, status: newStatus }
                    : cycle
            )
        );
    };

    const handleStopTimer = () => {
        updateCycle(STATUS.STOPPED);
        setActiveCycleId(null);
    };

    console.log(cycles);

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
                        disabled={!!activeCycle}
                    />

                    <datalist id="taskSuggestions">
                        {cycles.map((cycle) => (
                            <option key={cycle.ID} value={cycle.task} />
                        ))}
                    </datalist>

                    <label htmlFor="time">during</label>
                    <MinutesInput
                        id="time"
                        type="number"
                        placeholder="00"
                        step={5}
                        min={1}
                        max={60}
                        value={duration}
                        onChange={(event) => setDuration(event.target.value)}
                        disabled={!!activeCycle}
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

                {!activeCycle ? (
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
