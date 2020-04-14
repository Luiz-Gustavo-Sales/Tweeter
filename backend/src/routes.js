//importando o express (rotas)
const express = require('express');
//modulo de rotas do express
const routes = express.Router();
//importando os controles dos Tweets onde fica(metodo de criação e  o metodo de listagem)
const TweetControoller = require('./controllers/TweetControoller');
//importando o objeto do like
const LikeController = require('./controllers/LikeController');
//res= resposta para o fronteende
//req o que o usuário envia pela URL

//pegar os Tweets
routes.get('/tweets',TweetControoller.index);
//criar  novo postes (Tweets)
routes.post('/tweets',TweetControoller.store);
//passando o parametro  com :id, onde será atribuido com o id da postagem para poder da LIKE na postagem
routes.post('/likes/:id',LikeController.store);

module.exports=routes;
