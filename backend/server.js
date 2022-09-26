const express = require('express')
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const ApiUrl ='https://lookup.binlist.net/';

app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))



app.post('/check-info',(req,res)=>{
    axios.get(ApiUrl+req.body.visa).then((response)=>{
        res.json(response.data)
    })
})

app.use('*',(req,res)=> res.sendFile(path.join(__dirname,'build','index.html')))

app.listen(8080,()=>{
    console.log('app is running')
})