const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2018-05-01',
        authenticator: new IamAuthenticator({apikey: api_key,}),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let inputUrl = req.query.url;
    console.log(inputUrl);
    const analyzeParams = {
      //'url': "https://newsroom.ibm.com/2021-02-15-bp-joins-the-IBM-Quantum-Network-to-advance-use-of-quantum-computing-in-energy",
      'url': inputUrl,
      'features': {
        'emotion': {
        }
      },
    };
    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        });
    //return res.send({"happy":"90","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    let inputUrl = req.query.url;
    console.log(inputUrl);
    const analyzeParams = {
      //'url': "https://newsroom.ibm.com/2021-02-15-bp-joins-the-IBM-Quantum-Network-to-advance-use-of-quantum-computing-in-energy",
      'url': inputUrl,
      'features': {
        'sentiment': {
        }
      },
    };
    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            var outputSent = analysisResults.result.sentiment.document.label;
            res.send(outputSent);
        })
        .catch(err => {
            console.log('error:', err);
        });
    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    let inputText = req.query.text;
    console.log(inputText);
    const analyzeParams = {
      //'text': "As much as I want to congratulate them, I feel sad.",
      'text': inputText,
      'features': {
        'emotion': {
        }
      },
    };
    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error:', err);
        });
    //return res.send({"happy":"10","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    let inputText = req.query.text;
    console.log(inputText);
    const analyzeParams = {
      //'text': "As much as I want to congratulate them, I feel sad.",
      'text': inputText,
      'features': {
        'sentiment': {
        }
      },
    };
    const naturalLanguageUnderstanding = getNLUInstance();
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
            var outputSent = analysisResults.result.sentiment.document.label;
            res.send(outputSent);
        })
        .catch(err => {
            console.log('error:', err);
        });
    //return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(3000, () => {
    console.log('Listening', server.address().port)
})