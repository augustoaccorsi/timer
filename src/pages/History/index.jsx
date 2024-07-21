import React from 'react';
import { HistoryContainer, HistoryList } from './styles';

const History = () => {
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
                        <tr>
                            <td>Task</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses atrás</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses atrás</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses atrás</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses atrás</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses atrás</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Task</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses atrás</td>
                            <td>Concluído</td>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
};

export default History;
