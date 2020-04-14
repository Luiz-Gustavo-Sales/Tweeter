import React, { Component } from "react";

import like from '../like.svg';

//importando o css do para os Tweets
import "./Tweet.css";
import api from "../services/api";

export default class Tweet extends Component {

    handleLik = (e) => {
       const {_id} = this.props.tweets_propriedade;

       api.post (`likes/${_id}`);


    }


  render() {
  
    //PARA PODER CHAMAR OS TWEETS DEVE-SE USAR AS PROPRIEDADE PARA PODER CHAMAR
    return (
      <li className="tweet">
        <h3>{this.props.tweets_propriedade.autor}</h3>
        <p>{this.props.tweets_propriedade.content}</p>
        <button type="button" onClick={this.handleLik}>
            <img src={like} alt="like"/>
            { this.props.tweets_propriedade.likes}
        </button>
      </li>
    );
  }
}
