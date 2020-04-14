const Tweet = require("../models/Tweet");

module.exports={

async  store(req,res){
    //passando o parametro com id da posagem 
const tweet_like = await Tweet.findById(req.params.id);
//adicionando like na postagem escolhida pelo ID
tweet_like.set({likes: tweet_like.likes+1});
//salvando os likes
await tweet_like.save();
    //esse metodo faz com que avise para todos que estão na aplicação que teve um like.
req.io.emit("like",tweet_like);
//retonando os likes atualizado
return res.json(tweet_like);

},




};