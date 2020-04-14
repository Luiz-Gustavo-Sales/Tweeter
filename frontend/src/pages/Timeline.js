import React, { Component } from "react";
//importando socket para atualizar em tempo real novas tweets e curtidas
import socket from "socket.io-client";

//importando componentes dos tweets
import Tweet_time_line from "../components/Tweet";

//importando a API
import api from "../services/api";

//importando a logo do Twitter
import twitterLogo from "../twitter.svg";
//importando o css da API
import "./Timeline.css";

export default class Timeline extends Component {
  state = {
    //array dos tweets (vai guardar)
    tweets: [],

    //receber os valores digitado no input
    newTweet: "",
  };
  //função apra atualizar a pagina
  evento_atualizar = () => {
    const io = socket ("http://localhost:3000");
    io.on("tweet", (data) => {

      // ... que dizer que depois de atualizar com o nome tweets vai colocar o resto dos Tweets em baio do novo Tweets
      this.setState({tweets:[data,...this.state.tweets]})
     // console.log(data);
    });

    io.on("like", (data) => {
      //vai percorrer todo os tweets quando bater com id clicado vai atualizar o like da postagem
      this.setState({tweets:this.state.tweets.map(tweets =>
        tweets._id == data._id? data : tweets
        )})
     // console.log(data);
    });
   };

  //esse componente é executado automaticamente quando a pagina é carregada
  async componentDidMount() {
    //chamando a função que atualiza logo após carregar a pagina
    this.evento_atualizar();

    //response vai receber todos os tweets dos usuários
    const response = await api.get("tweets");
    //estou setando no array todos os valores apra poder mostrar
    this.setState({ tweets: response.data });
  }

  //Input onde o usuário vai digitar seu novo Twittter
  handleInputChanger = (e) => {
    //recebendo o Twitter do usuário
    this.setState({ newTweet: e.target.value });
  };

  handleNewTweet = async (e) => {
    /*numero da tecla do enter é 13
    caso aperte essa tecla ele para 
    
    */
    if (e.keyCode !== 13) return;
    //conteudo do newTweet
    const content = this.state.newTweet;
    //capturando do local Store do navegador o  usuário que Twittou
    const autor = localStorage.getItem("@GoTwitter:username");
    //enviando uma requisando post querendo criar alguma coisa
    //enviando a requisição pelo metodo post, a qual passando os objetos para criar.
    await api.post("tweets", { content, autor });
    //ZERANDO O VALOR DA TEXT ARE(INPUT), PARA PODER COLOCAR OUTRO TWEETS
    this.setState({ newTweet: "" });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="GoTwitter" />
        <form>
          <textarea
            value={this.state.newTweet}
            //O evento onchange ocorre quando o valor de um elemento foi alterado, atribuindo novo valor para ele usando a função
            onChange={this.handleInputChanger}
            //evento onKedown é quando o usuário aperta uma tecla, a qual seria para essa aplicação o (ENTER == 13)
            onKeyDown={this.handleNewTweet}
            placeholder="O que você está pensando?"
          />
        </form>
        <ul className="tweet-list">
          {this.state.tweets.map((tweets) => (
            //creiando uma propriedade propriedade
            //passando a para propriedade os tweets que estão (autor e os tweets)
            /*KEY = RECEBER CAMPO ÚNICO, UMA PROPRIEDADE OBRIGATORIA QUANDO SE UTLIZAR O MAP, ENTÃO
          USANDO O KEY={TWEETS._ID} vai se o campo único (identificação)
          */
            <Tweet_time_line key={tweets._id} tweets_propriedade={tweets}/>
          ))}
        </ul>
      </div>
    );
  }
}
