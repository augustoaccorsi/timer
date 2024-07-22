import React, { useContext, useEffect, useState } from 'react';
import { CountDownContainer, CountDownSeparator } from './styles';
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../../../../contexts/CyclesContext';

const Contdown = () => {
    const { activeCycle, updateCycle, setActiveCycleId, STATUS } =
        useContext(CyclesContext);
    const [amoutSecondsPassed, setAmoutSecondsPassed] = useState(0);

    const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0;
    const currentSeconds = activeCycle ? totalSeconds - amoutSecondsPassed : 0;
    const minutesAmount = Math.floor(currentSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

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
    }, [activeCycle, totalSeconds, updateCycle, setAmoutSecondsPassed]);

    useEffect(() => {
        document.title = activeCycle
            ? `Timer - ${minutes}:${seconds}`
            : 'Timer';
    }, [minutes, seconds]);

    return (
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <CountDownSeparator>:</CountDownSeparator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    );
};

export default Contdown;
