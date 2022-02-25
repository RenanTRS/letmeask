import logoImg from '../assets/images/logo.svg';

import { Button } from '../Components/Button';
import { RoomCode } from '../Components/RoomCode';

import { useParams } from 'react-router-dom';

import '../styles/room.scss';
//import { useAuth } from '../hooks/useAuth';

import { Question } from '../Components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}

export function AdminRoom(){
    //Pega o parâmetro id da rota
    const params = useParams<RoomParams>();
    
    //Pega o objeto user do hook
    //const {user} = useAuth();

    const roomId = params.id;
    const {questions, title} = useRoom(roomId)


    return (
        <div id="page-room">
            <header>
                <div className='content'>
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>

                <div className='question-list'>
                    {questions.map(question => {
                        return(
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    );
}