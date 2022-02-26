import logoImg from '../assets/images/logo.svg';

import { Button } from '../Components/Button';
import { RoomCode } from '../Components/RoomCode';

import { useHistory, useParams } from 'react-router-dom';

import '../styles/room.scss';
//import { useAuth } from '../hooks/useAuth';
import deleteImg from '../assets/images/delete.svg'
import { Question } from '../Components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function AdminRoom(){
    const history = useHistory()
    //Pega o parâmetro id da rota
    const params = useParams<RoomParams>();
    
    //Pega o objeto user do hook
    //const {user} = useAuth();

    const roomId = params.id;
    const {questions, title} = useRoom(roomId)

    async function handleEndRoom(){
        //Encerra a sala
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })

        history.push('/')
    }
    async function handleDeleteQuestion(questionId: string){
        if(window.confirm('Você tem certeza que deseja excluir esta pergunta?')){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }
    return (
        <div id="page-room">
            <header>
                <div className='content'>
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
                            >
                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>
                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}