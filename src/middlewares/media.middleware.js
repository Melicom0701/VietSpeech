const fs = require('fs');
const path = require('path');

const SaveWav = (req, res, next) => {
    try {
        const file = req.file;
        next();
    } catch (error) {
        res
        .status(400)
        .send(error.message);
    }
}

module.exports = 
{SaveWav};
