import logoImg from '../assets/images/logo.svg';

import { Button } from '../Components/Button';
import { RoomCode } from '../Components/RoomCode';

import { useParams } from 'react-router-dom';

import { FormEvent, useEffect, useState } from 'react';

import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';

import {database} from '../services/firebase';


type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type RoomParams = {
    id: string;
}

export function Room(){
    //Pega o parâmetro id da rota
    const params = useParams<RoomParams>();
    
    //Pega o objeto user do hook
    const {user} = useAuth();

    const [newQuestion, setNewQuestion] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [title, setTitle] = useState('');
    
    const roomId = params.id;
    
    useEffect(() => {
        //Define referência do caminho ao database
        const roomRef = database.ref(`rooms/${roomId}`);

        //Event Listener do firebase - pega os dados da database
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestion: FirebaseQuestions = databaseRoom.questions ?? {};
            const parseQuestion = Object.entries(firebaseQuestion).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            });
            //console.log(parseQuestion);
            setTitle(databaseRoom.title);
            setQuestions(parseQuestion);
        });
    }, [roomId]);


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
                    <h1>Sala: {title}</h1>
                    {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder='O que você quer perguntar?'
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    {/*Verifica se o usuário está atutenticado ou não usando if ternário*/}
                    <div className='form-footer'>
                        { user ? (
                            <div className='user-info'>
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para fazer uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        {/*Botão fica disbled caso não tenha usuário*/}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
    );
}