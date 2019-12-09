var express = require('express')
var bodyParser = require('body-parser')
const nodemailer = require ('nodemailer')
const cors = require('cors')


var app = express()

app.use(cors())
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
        from: 'bi.alertas@ale.com.br',
        to: 'bi.alertas@ale.com.br',
        subject: 'Alertas BI - Valor de Faturamento',
        text: 'Valor de Faturamento: ' + JSON.stringify(req.body.value) 
                                       + ' operando abaixo da Meta: ' 
                                       + JSON.stringify(req.body.meta)
    };

    if(Number(analise.value.value) < analise.meta){
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