import React, { useContext } from 'react';
import { HistoryContainer, HistoryList, Status } from './styles';
import { CyclesContext } from '../../contexts/CyclesContext';
import { formatDistanceToNow } from 'date-fns';

const History = () => {
    const { cycles, STATUS } = useContext(CyclesContext);

    return (
        <HistoryContainer>
            <h1>My History</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Duration</th>
                            <th>Start</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle) => (
                            <tr key={cycle.ID}>
                                <td>{cycle.task}</td>
                                <td>{`${cycle.minutesAmout} minutes`}</td>
                                <td>
                                    {formatDistanceToNow(cycle.startDate, {
                                        addSuffix: true,
                                    })}
                                </td>
                                <td>
                                    {cycle.status === STATUS.ON_GOING && (
                                        <Status statusColor="yellow">
                                            On Going
                                        </Status>
                                    )}
                                    {cycle.status === STATUS.COMPLETED && (
                                        <Status statusColor="green">
                                            Completed
                                        </Status>
                                    )}
                                    {cycle.status === STATUS.STOPPED && (
                                        <Status statusColor="red">
                                            Stopped
                                        </Status>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
};

export default History;
