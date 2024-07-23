import React, { createContext, useReducer, useState } from 'react';
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
    const [cyclesState, dispatch] = useReducer(
        (state, action) => {
            console.log(state);
            console.log(action);

            if (action.type === 'ADD_NEW_CYCLE') {
                return {
                    ...state,
                    cycles: [action.payload.data, ...state.cycles],
                    activeCycleId: action.payload.data.ID,
                };
            }

            if (action.type === 'UPDATE_CURRENT_CYCLE') {
                return {
                    ...state,
                    cycles: state.cycles.map((cycle) =>
                        cycle.ID === action.payload.activeCycleId
                            ? { ...cycle, status: action.payload.newStatus }
                            : cycle
                    ),
                    activeCycleId: null,
                };
            }

            return state;
        },
        {
            cycles: [],
            activeCycleId: null,
        }
    );

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.ID === activeCycleId);

    const [cycleName, setCycleName] = useState('');
    const [duration, setDuration] = useState('');

    const updateCycle = (newStatus) => {
        // setCycles((state) =>
        //     state.map((cycle) =>
        //         cycle.ID === activeCycle.ID
        //             ? { ...cycle, status: newStatus }
        //             : cycle
        //     )
        // );
        dispatch({
            type: 'UPDATE_CURRENT_CYCLE',
            payload: {
                activeCycleId: activeCycle.ID,
                newStatus: newStatus,
            },
        });
    };

    const startNewCycle = (event) => {
        event.preventDefault();

        if (cycleName.length === 0 || duration.length === 0) {
            return;
        }

        const newCycle = generateCycle(cycleName, duration);
        //setCycles([newCycle, ...cycles]);

        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload: {
                data: newCycle,
            },
        });

        //setActiveCycleId(newCycle.ID);
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
