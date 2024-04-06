'use strict';

const express = require('express');
const app = express();

const {generateRandomString,isValidUrl}  = require('./utility');
const { loadData,updateFileData } = require('./tinyModel');

const PORT              = process.env.PORT || 3000;
const SERVER_URL        = process.env.SERVER_URL || 'http://localhost:3000';
const TINY_URL_LENGTH   = process.env.TINY_URL_LENGTH || 6;
process.env.STORE_TINY_FILE_ANME   = process.env.STORE_TINY_FILE_ANME || 'storeTinyUrl.json';

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.get("/api/get_tiny_urls/:id?",async(req,res)=>{
    const data = await loadData(req?.params?.id);
    if( 'yes' === req?.query?.is_redirect && data.length > 0){
        console.log("url redirecting");
        return res.status(301).redirect(data[0].originalUrl)
    }
    return res.status(data.length>0?200:404).json(data);
});
app.post("/api/create_tiny_url",async (req,res)=>{
    let {url} = req.body;
    if(!url){
        return res.status(422).json({error:"Missing URL"})
    }
    if(!isValidUrl(url)){
        return res.status(422).json({error:"invalid URL"})
    }
    const uniqueString = generateRandomString( TINY_URL_LENGTH );
    await updateFileData( uniqueString , url);
    return res.json({'tiny_url':`${SERVER_URL}/${uniqueString}`});
});



app.listen(PORT,function(){
    console.log("Server is running on port:",PORT);
})

