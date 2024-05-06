// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// pull in the required packages.
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");
const _ = require("lodash");


// pronunciation assessment with audio file
const main = async (req,res) => {
    //read file from blob 
    
    var audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(process.env.filename));
    var speechConfig = sdk.SpeechConfig.fromSubscription(process.env.subscriptionKey, process.env.serviceRegion);
    var reference_text = req.body.text;
    // create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
    const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
        reference_text,
        sdk.PronunciationAssessmentGradingSystem.HundredMark,
        sdk.PronunciationAssessmentGranularity.Phoneme,
        true
    );
    pronunciationAssessmentConfig.enableProsodyAssessment = true;

    // setting the recognition language to English.
    speechConfig.speechRecognitionLanguage = process.env.language;

    // create the speech recognizer.
    var reco = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssessmentConfig.applyTo(reco);

    async function onRecognizedResult(result) {
        var pronunciation_result = await sdk.PronunciationAssessmentResult.fromResult(result);
        const res = {
            accuracyScore: pronunciation_result.accuracyScore,
            pronunciationScore: pronunciation_result.pronunciationScore,
            completenessScore: pronunciation_result.completenessScore,
            fluencyScore: pronunciation_result.fluencyScore,
            prosodyScore: pronunciation_result.prosodyScore,
            detailResult: pronunciation_result.detailResult
        }

        return res;
    }

    reco.recognizeOnceAsync(
        async function (successfulResult) {
            const result = await onRecognizedResult(successfulResult);
            console.log(result);
            res.send(result);
            reco.close();
        }
    )
}
module.exports = {
    main
}