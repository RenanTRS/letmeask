import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../Components/Button";

import { TestContext } from "../App";

import illustrationSvg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";

import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


export function Home(){
    const history = useHistory()
    const value = useContext(TestContext);

    function handleCreateRoom(){
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(result=>{
            console.log(result);
        });
        history.push('/rooms/new');
        /*
        const register = async ()=>{
            try{
                const user = await signInWithPopup(auth, provider);
            } catch (error){
                console.log(error.message);
            }
        }*/
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationSvg} alt="Ilustração simbolizando perguntas e respostas."/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real.</p>
            </aside>
            <main>
                <h1>{value}</h1>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
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