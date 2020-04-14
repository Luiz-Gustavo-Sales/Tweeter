import React, { Component } from "react";
//importando imagem twitter
//para chamar a imagem twitter podemos chamar ela variavel criada twitter_Logo, no src
import twitter_Logo from "../twitter.svg";
import "./Login.css";
export default class Login extends Component {
  /*Esse objeto "state" faz com que fique gravado o 
  último usuário digitado, mas quando o usuário digitar outro
  valor será substituido pelo novo digitado usando a função  hanldeInputChamge
  */
  state = {
    username: ""
  };

  handleSubmit = e => {
    //Evita qualquer evento padrão do FORM
    e.preventDefault();

    const { username } = this.state;
    //caso não didigte nada, será quebrado o Submit de do formulário, para não direcionar o usuário sem nome.
    if (!username.length) return;
    /*caso digite algo 
        |
        |
        |
        |
        V
*/
    //acessando o stores do navegador e salvando algo dentro
    localStorage.setItem("@GoTwitter:username", username);

    /*para acessar qualquer propriedas (exemplo de propriedas:className, value,placeholder)
cusamos(comando: this.PROPS para poder capturar a propriedade atribuida).
*/
    this.props.history.push("/timeline");
  };

  //Função
  hanldeInputChamge = e => {
    /*
    Todas vez que usuário digitar um nome(usuário) o parametro da função vai receber pelo (e.target.value) o novo
    nome digitado e vai passar para o seu objeto, para passar o valor deve-se usar setState para SETAR o valor.
    */
    this.setState({ username: e.target.value });
  };
  render() {
    return (
      <div className="login-wrapper">
        <img src={twitter_Logo} alt="GoTwitter" />
        <form onSubmit={this.handleSubmit}>
          <input
            //cada vez que usário digitar um nome, será gravado na variavel username (this.state.username)
            //O evento onchange ocorre quando o valor de um elemento foi alterado, atribuindo novo valor para ele usando a função
            value={this.state.username}
            onChange={this.hanldeInputChamge}
            placeholder="Nome do usuário"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}
