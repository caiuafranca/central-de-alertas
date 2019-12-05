var express = require('express')
var bodyParser = require('body-parser')
const nodemailer = require ('nodemailer')


var app = express()

app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
    port:1025,
    ignoreTLS: true
})


app.get('/dados', function(req, res) {
    var dados = {
        "mensagem": "Ola"
    }
  
    res.send(JSON.stringify(dados));
  });

app.post('/dados', (req,res)=>{
    console.log(req.body)

    let analise = req.body
    const mailOptions = {
        from: 'caiuagomes@gmail.com',
        to: 'caiua_franca@hotmail.com',
        subject: 'E-mail enviado usando Node!',
        text: 'Valor Acima do esperado ' + JSON.stringify(req.body.value)
    };

    if(analise.value === '75'){
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log('Deu Erro no Envio.... \n'+error);
            } else {
              console.log('Email enviado: ' + info.response);
            }
          });
    }else{
        console.log('Não vai rolar')
    }

})


app.listen(8000, ()=>{
    console.log('Servidor Funcionado, na porta 8000')
})