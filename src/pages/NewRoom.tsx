import { useContext } from "react";
import { Link } from "react-router-dom";

/*Contexts*/
import { AuthContext } from "../contexts/AuthContexts";

/*Components*/
import { Button } from "../Components/Button";

/*Assets*/
import illustrationSvg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

/*Styles*/
import "../styles/auth.scss"



export function NewRoom(){

    //const {user} = useContext(AuthContext);

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
                    
                    <form>
                        <input
                            type="text"
                            placeholder="Nome da sala"
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