const Tweet = require("../models/Tweet");

module.exports = {
  //metodo de listagem
  async index(req, res) {
    //no metodo find fica a parte de pagina dos Tweets dos usuários
    //.sort faz com que fique em primeiro os Tweets mais recentes por data de criação
    const tweets = await Tweet.find({}).sort("-createAdt");
    //retorna os tweets em modo json
    return res.json(tweets);
  },
  //metodo criar Tweets
  async store(req, res) {
    //body é o corpo da nossa requisição
    const tweet = await Tweet.create(req.body);
    //esse metodo faz com que avise para todos que estão na aplicação que chegou um novo TWEET.
    req.io.emit("tweet", tweet);

    //devolver para o fronteend
    return res.json(tweet);
  }
};
