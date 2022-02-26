import {useState, useEffect} from 'react'
import { isObjectLiteralElement } from 'typescript';
import { database } from '../services/firebase';
import { useAuth } from './useAuth';


type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
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
    likeCount: number;
    hasLiked: boolean;
}


export function useRoom(roomId: string){
    const {user} = useAuth()
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
                    likeCount: Object.values(value.likes ?? {}).length,
                    hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
                }
            });
            //console.log(parseQuestion);
            setTitle(databaseRoom.title);
            setQuestions(parseQuestion);
        });
        return () =>{
            roomRef.off('value')
        }

    }, [roomId, user?.id]);

    return {questions, title}
}