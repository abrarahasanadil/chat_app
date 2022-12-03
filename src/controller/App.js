import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import "../view/App.css";
import useStateValue from "./StateProvider";
import Animatedpage from "./Animatedpage";

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <Animatedpage>
          <div className="app_body">
            <BrowserRouter>
              <Sidebar />
              <Switch>
                <Route exact path="/rooms/:roomId" component={Chat} />
                <Route path="/" />
              </Switch>
            </BrowserRouter>
          </div>
        </Animatedpage>
      )}
    </div>
  );
}

export default App;
