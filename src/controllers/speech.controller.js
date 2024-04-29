const SpeechService = require('../services/speech.service.js');


const pronunciation = async (req, res) => {
        await SpeechService.main(req,res);
}
module.exports = {
    pronunciation
}
