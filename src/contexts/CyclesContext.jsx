import React, { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CyclesContext = createContext({});

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

const CyclesContextProvider = (props) => {
    const [cycleName, setCycleName] = useState('');
    const [duration, setDuration] = useState('');
    const [activeCycleId, setActiveCycleId] = useState(null);
    const [cycles, setCycles] = useState([]);

    const updateCycle = (newStatus) => {
        setCycles((state) =>
            state.map((cycle) =>
                cycle.ID === activeCycle.ID
                    ? { ...cycle, status: newStatus }
                    : cycle
            )
        );
    };

    const startNewCycle = (event) => {
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

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                updateCycle,
                cycles,
                setActiveCycleId,
                startNewCycle,
                cycleName,
                duration,
                setCycleName,
                setDuration,
                STATUS,
            }}
        >
            {props.children}
        </CyclesContext.Provider>
    );
};

export default CyclesContextProvider;
