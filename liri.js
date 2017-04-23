'use strict';
//Define Variables
let spotify = require('spotify');
let twitter = require('twitter');
let request = require('request');
let fs = require('fs');
let userInput = {
    command: '',
    arguement: ''
};

//Main Logic
//Process command line arguements 
if (process.argv.length > 2) {
	let rawInputs = [];
    for (let i = 2; i < process.argv.length; i++) {
        rawInputs.push(process.argv[i]);
    }
    userInput.command = rawInputs.splice(0, 1)[0].toLowerCase();
    userInput.arguement = rawInputs.join(' ');
    writeLog('User Input - ' + JSON.stringify(userInput));
}
//Check user command and perform appropriate task
switch (userInput.command) {
    case ('my-tweets'):
        break;
    case ('spotify-this-song'):
        break;
    case ('movie-this'):
        break;
    case ('do-what-it-says'):
        break;
    case ('--help'):
        displayHelp();
        break;
    default:
        writeLog('Error: Invalid Input');
        console.log('Error: Invalid Input');
        displayHelp();
        break;
}

//Supporting Functions
function displayHelp() {
    writeLog('Displaying help ...');
    //Displays the valid commaands and what they do
    let helpText = [
        'Usage: node liri.js [command] [arguments]',
        '\n',
        'Commands:',
        ' my-tweets             Shows last 20 tweets and when they were created',
        ' spotify-this-song     Shows information about the song',
        ' movie-this            Shows infotmation about the movie',
        ' do-what-it-says       Takes text inside of random.txt and then use it to call one of LIRI\'s commands'
    ]
    helpText.map(function(v) {
        console.log(v);
    })
    writeLog(JSON.stringify(helpText));
}

function myTweets() {

}

function SpotifyThisSong() {

}

function movieThis() {

}

function doWhatItSays() {

}

function writeLog(msg) {
    let logFile = './log.txt';
    fs.appendFile(logFile, Date.now() + ' ' + msg + '\n', (err) => {
        if (err) throw err;
    });
}
