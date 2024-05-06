const fs = require('fs');
const path = require('path');
const webmToMp4 = require("webm-to-mp4");
const { exec } = require('child_process');

//ffmpeg -fflags +genpts -i audio.webm -r 24 audio.wav


const converter = async (req, res, next) => {

    const webmFilePath = path.join(__dirname, '../../uploads/audio.webm');
    const wavFilePath = path.join(__dirname, '../../uploads/audio.wav');
    console.log(`ffmpeg -y -fflags +genpts -i ${webmFilePath} -r 24 ${wavFilePath}`)

    exec(`ffmpeg -y -fflags +genpts -i ${webmFilePath} -r 24 ${wavFilePath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        next();

    })




    


}

module.exports = 
{
    converter

};
