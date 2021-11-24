import { BrowserRouter, Route } from "react-router-dom";
import { AuthContextProvider } from './contexts/AuthContexts'

/*Pages*/
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

/*Styles*/
import "./styles/global.scss";

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
