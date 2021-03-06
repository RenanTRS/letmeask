/*React*/
import { useState, FormEvent } from "react";

/*Firebase*/
import { database } from '../services/firebase';

/*Hooks*/
import { useHistory } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

/*Components*/
import { Button } from "../Components/Button";

/*Assets*/
import illustrationSvg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

/*Styles*/
import "../styles/auth.scss";

export function Home(){
    const history = useHistory()
    const {user, signInWithGoogle} = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();
        
        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).on('value', (snapshot)=>{
            const room = snapshot.val();
            if(!room){
                alert('Room does not exists.');
                return;
            }
            //Se sala estiver fechada ele impede de abrir
            if(room.endedAt){
                alert('Room already closed.')
                return
            }
            history.push(`/rooms/${roomCode}`);
        });
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}