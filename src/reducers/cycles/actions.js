export const CYCLES = {
    ADD_NEW_CYCLE: 'ADD_NEW_CYCLE',
    UPDATE_CURRENT_CYCLE: 'UPDATE_CURRENT_CYCLE',
};

export const AddNewCycle = (newCicle) => {
    return {
        type: CYCLES.ADD_NEW_CYCLE,
        payload: {
            data: newCicle,
        },
    };
};

export const UpdateCurrentCycle = (activeCycleId, newStatus) => {
    return {
        type: CYCLES.UPDATE_CURRENT_CYCLE,
        payload: {
            activeCycleId: activeCycleId,
            newStatus: newStatus,
        },
    };
};
