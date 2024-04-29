// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// pull in the required packages.
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const fs = require("fs");
const _ = require("lodash");


// pronunciation assessment with audio file
const main = () => {

    var audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(process.env.filename));
    var speechConfig = sdk.SpeechConfig.fromSubscription(process.env.subscriptionKey, process.env.serviceRegion);
    var reference_text = "Con cá";
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

    function onRecognizedResult(result) {
        console.log("pronunciation assessment for: ", result.text);
        var pronunciation_result = sdk.PronunciationAssessmentResult.fromResult(result);
        console.log(" Accuracy score: ", pronunciation_result.accuracyScore, '\n',
            "pronunciation score: ", pronunciation_result.pronunciationScore, '\n',
            "completeness score : ", pronunciation_result.completenessScore, '\n',
            "fluency score: ", pronunciation_result.fluencyScore, '\n',
            "prosody score: ", pronunciation_result.prosodyScore
        );
        console.log("  Word-level details:");
        _.forEach(pronunciation_result.detailResult.Words, (word, idx) => {
            console.log("    ", idx + 1, ": word: ", word.Word, "\taccuracy score: ", word.PronunciationAssessment.AccuracyScore, "\terror type: ", word.PronunciationAssessment.ErrorType, ";");
            console.log(word.Phonemes);
        });
        reco.close();
    }

    reco.recognizeOnceAsync(
        function (successfulResult) {
            onRecognizedResult(successfulResult);
        }
    )
}
module.exports = {
    main
}