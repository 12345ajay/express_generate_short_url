const fs = require('fs').promises;

const loadData = (async (id='') => {
    try{ 
        let fileData = await fs.readFile('./'+process.env.STORE_TINY_FILE_ANME, 'utf8' )
        fileData = JSON.parse(fileData);
        if( !id ){
            return fileData;
        }
        return fileData.filter(( tiny ) => tiny.id === id)
    }catch(err){
        console.log(err);
        return false;
    }
})


const updateFileData = (async (id,originalUrl) => {
    try { 
        const fileData = await loadData();
        console.log("fileData",fileData);
        fileData.push( {id,originalUrl})
        await fs.writeFile('./'+process.env.STORE_TINY_FILE_ANME, JSON.stringify(fileData,null,2));
        console.log("file updated successfully.");
        
    } catch(err){
        console.log(err);
        return false;
    }
})

module.exports = {loadData,updateFileData};