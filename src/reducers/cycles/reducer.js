import { CYCLES } from './actions';

const CyclesReducer = (state, action) => {
    if (action.type === CYCLES.ADD_NEW_CYCLE) {
        return {
            ...state,
            cycles: [action.payload.data, ...state.cycles],
            activeCycleId: action.payload.data.ID,
        };
    } else if (action.type === CYCLES.UPDATE_CURRENT_CYCLE) {
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
};

export default CyclesReducer;
