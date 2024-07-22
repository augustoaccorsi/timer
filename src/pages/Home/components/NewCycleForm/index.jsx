import React, { useContext } from 'react';
import { FormContainer, TaskInput, MinutesInput } from './styles';
import { CyclesContext } from '../..';

const NewCycleForm = ({ cycleName, duration, setDuration, setCycleName }) => {
    const { activeCycle, cycles } = useContext(CyclesContext);

    return (
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
    );
};

export default NewCycleForm;
