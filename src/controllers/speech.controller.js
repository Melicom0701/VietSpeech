const SpeechService = require('../services/speech.service.js');


const pronunciation = async (req, res) => {
    try {
        
        const result = await SpeechService.main();
        res.send(result);
    } catch (error) {
        res
        .status(400)
        .send(error.message);
}
}
module.exports = {
    pronunciation
}
