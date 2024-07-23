import React, { createContext, useEffect, useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CyclesReducer from '../reducers/cycles/reducer';
import { AddNewCycle, UpdateCurrentCycle } from '../reducers/cycles/actions';

export const CyclesContext = createContext({});

const STORAGE_ID = '@timer:cycles-state-1.0.0';

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
    const [cyclesState, dispatch] = useReducer(
        CyclesReducer,
        {
            cycles: [],
            activeCycleId: null,
        },
        (initialState) => {
            const storedStateAsJSON = localStorage.getItem(STORAGE_ID);
            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON);
            }
            return initialState;
        }
    );

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.ID === activeCycleId);

    const [cycleName, setCycleName] = useState('');
    const [duration, setDuration] = useState('');

    const updateCycle = (newStatus) => {
        dispatch(UpdateCurrentCycle(activeCycle.ID, newStatus));
    };

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState);
        localStorage.setItem(STORAGE_ID, stateJSON);
    }, [cyclesState]);

    const startNewCycle = (event) => {
        event.preventDefault();

        if (cycleName.length === 0 || duration.length === 0) {
            return;
        }

        const newCycle = generateCycle(cycleName, duration);

        dispatch(AddNewCycle(newCycle));

        setCycleName('');
        setDuration('');
    };

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                updateCycle,
                cycles,
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
