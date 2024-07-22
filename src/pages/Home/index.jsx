import React, { createContext, useEffect, useState } from 'react';
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
import NewCycleForm from './components/NewCycleForm';
import Contdown from './components/Contdown';

export const STATUS = {
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

export const CyclesContext = createContext({});

const Home = () => {
    const [cycles, setCycles] = useState([]);
    const [cycleName, setCycleName] = useState('');
    const [duration, setDuration] = useState('');
    const [activeCycleId, setActiveCycleId] = useState(null);

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
    };

    const activeCycle = cycles.find((cycle) => cycle.ID === activeCycleId);

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

    return (
        <HomeContainer>
            <form onSubmit={onStartCounter}>
                <CyclesContext.Provider
                    value={{
                        activeCycle,
                        updateCycle,
                        cycles,
                        setActiveCycleId,
                    }}
                >
                    <NewCycleForm
                        cycleName={cycleName}
                        duration={duration}
                        setCycleName={setCycleName}
                        setDuration={setDuration}
                    />
                    <Contdown />
                </CyclesContext.Provider>

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
