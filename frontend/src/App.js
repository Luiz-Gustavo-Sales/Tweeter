import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Timeline from "./pages/Timeline";

class App extends Component {
  render() {
    //Comando (exact) faz com que na url seja examente aquela para poder entrar na rota escolhida.
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/timeline" component={Timeline} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
//Router  especificando Cada rota da aplicação
//Swuitch Faz com que apenas uma rota seja chamada com um endereço(vamos dizer "ip").
//BroserRouter- São as url que fica www.teste/lognin
