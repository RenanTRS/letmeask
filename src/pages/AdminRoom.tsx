import logoImg from '../assets/images/logo.svg';

import { Button } from '../Components/Button';
import { RoomCode } from '../Components/RoomCode';

import { useParams } from 'react-router-dom';

import { FormEvent, useState } from 'react';

import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';

import {database} from '../services/firebase';
import { Question } from '../Components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}

export function AdminRoom(){
    //Pega o parâmetro id da rota
    const params = useParams<RoomParams>();
    
    //Pega o objeto user do hook
    const {user} = useAuth();

    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;
    const {questions, title} = useRoom(roomId)

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault();

        //Se caso for vazio
        if(newQuestion.trim() === ''){
            return;
        }
        //Se caso o usuário não for autenticado
        if(!user){
            throw new Error('You must be logged in.');
        }

        //Objeto contendo dados da pergunta
        const question = {
            content: newQuestion, //pergunta
            author: {
                name: user.name, //nome do usuário
                avatar: user.avatar //foto do usuáior
            },
            isHighLighted: false, //se está sendo respondida neste momento
            isAnswered: false //se já foi respondida
        }

        //Salva no banco, pelo caminho rooms/o id da sala/pergunta
        await database.ref(`rooms/${roomId}/questions`).push(question);

        //Limpa o textarea
        setNewQuestion('');
    }


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