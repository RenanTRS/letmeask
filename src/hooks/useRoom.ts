import {useState, useEffect} from 'react'
import { database } from '../services/firebase';


type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}


export function useRoom(roomId: string){
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')

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

    return {questions, title}
}