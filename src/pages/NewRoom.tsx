import { FormEvent, useState } from 'react';
import { Link } from "react-router-dom";
import { database } from '../services/firebase';

/*Hooks*/
import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';

/*Components*/
import { Button } from "../Components/Button";

/*Assets*/
import illustrationSvg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

/*Styles*/
import "../styles/auth.scss"



export function NewRoom(){
    
    const {user} = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === ''){
            return;
        }

        //Cria uma referência
        const roomRef = database.ref('rooms');

        //Salva no banco
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });
        history.push(`/rooms/${firebaseRoom.key}`);


    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationSvg} alt="Ilustração simbolizando perguntas e respostas."/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real.</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}