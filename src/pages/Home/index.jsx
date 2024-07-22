import { FaPlay, FaStop } from 'react-icons/fa';
import {
    HomeContainer,
    StartContDownButton,
    StopContDownButton,
} from './styles';
import NewCycleForm from './components/NewCycleForm';
import Contdown from './components/Contdown';
import { CyclesContext } from '../../contexts/CyclesContext';
import { useContext } from 'react';

const Home = () => {
    const {
        activeCycle,
        startNewCycle,
        duration,
        cycleName,
        updateCycle,
        setActiveCycleId,
        STATUS,
    } = useContext(CyclesContext);

    const handleStopTimer = () => {
        updateCycle(STATUS.STOPPED);
        setActiveCycleId(null);
    };

    return (
        <HomeContainer>
            <form onSubmit={startNewCycle}>
                <NewCycleForm />
                <Contdown />

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
