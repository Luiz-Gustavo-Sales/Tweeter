const moogose = require('mongoose');

//Criando os campos do banco de dados
const TweetSchema = new moogose.Schema({

autor:String,
//postagem dos usuarios
content: String,
likes:{
    type:Number,
    default:0,

},
//coluna que vai armazenar as datas do Tweetts criados
createAdt:{
    type:Date,
    //pegar a hora atual a inserção dod ado no banco
    default:Date.now,
},

});

//Fornecendo um objeto dessas tabelas do banco de dados
module.exports = moogose.model("Tweet",TweetSchema);