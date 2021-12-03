import logoImg from '../assets/images/logo.svg';

import { Button } from '../Components/Button';
import { RoomCode } from '../Components/RoomCode';

import { useParams } from 'react-router-dom';

import { FormEvent, useState } from 'react';

import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';

import {database} from '../services/firebase';


type RoomParams = {
    id: string;
}

export function Room(){
    //Pega o parâmetro id da rota
    const params = useParams<RoomParams>();
    const roomId = params.id;
    
    //Pega o objeto user do hook
    const {user} = useAuth();

    const [newQuestion, setNewQuestion] = useState('');

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
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className='room-title'>
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder='O que você quer perguntar?'
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className='form-footer'>
                        <span>Para fazer uma pergunta, <button>faça seu login</button>.</span>
                        {/*Botão fica disbled caso não tenha usuário*/}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}