import { Home } from "./pages/Home";

import "./styles/global.scss";


function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}/>
      <Route path="/rooms/new" component={NewRoom}/>
    </BrowserRouter>
  );
}

export default App;
