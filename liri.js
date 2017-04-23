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
        /* 
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
    */
        //SpotifyThisSong(song, onSuccess, onFailure)
        SpotifyThisSong(userInput.arguement, (data) => {
            console.log(JSON.stringify(data));
        }, (error) => {
            if (error === 'No results found') {
                console.log(error + '. Check your spelling and try again.');
            } else {
                console.log('Something went wrong.  Please try again or check the logs for more information');
            }

        });

        break;
    case ('movie-this'):
        //movieThis(title, onSuccess, onFailure)
        movieThis(userInput.arguement, (movie) => {
            console.log('Title:               ' + movie.Title);
            console.log('Year Released:       ' + movie.Year);
            console.log('IMDB Rating:         ' + movie.imdbRating);
            console.log('Country Produced:    ' + movie.Country);
            console.log('Language(s):         ' + movie.Language);
            console.log('Plot:                ' + movie.Plot);
            console.log('Actors:              ' + movie.Actors);
            console.log('Rotten Tomatoes URL: ' + movie.tomatoURL);
        }, (error) => {
            if (error === 'Movie not found') {
                console.log(error + '. Check your spelling and try again.');
            } else {
                console.log('Something went wrong.  Please try again or check the logs for more information');
            }
        });
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

function SpotifyThisSong(song, onSuccess, onFailure) {
    writeLog('Searching for song ' + song + ' ...');
    spotify.search({ type: 'track', query: song }, function(error, data) {
        if (error) {
            writeLog('Error: ' + error);
            return onFailure(true);
        } else if (data.tracks.items.length === 0) {
            return onFailure('No results found');
        } else {
            writeLog('Success: ' + JSON.stringify(data))
            return onSuccess(data);
        }

    });
}

function movieThis(title, onSuccess, onFailure) {
    let omdbURL = 'http://www.omdbapi.com/?t=' + title + '&type=movie&plot=short&tomatoes=true&r=json';
    writeLog('Searching for movie at ' + omdbURL + ' ...');
    request(omdbURL, function(error, response, bodyString) {
        let body = JSON.parse(bodyString);
        if (!error && response.statusCode === 200) {
            writeLog(JSON.stringify(response));
            if (body.Response === 'True') {
                return onSuccess(body);
            } else {
                return onFailure('Movie not found');
            }
        } else {
            writeLog('Status Code: ' + response.statusCode + ' Error: ' + JSON.stringify(error));
            return onFailure(true);
        }
    })
}

function doWhatItSays() {

}

function writeLog(msg) {
    let logFile = './log.txt';
    fs.appendFile(logFile, Date.now() + ' ' + msg + '\n', (err) => {
        if (err) throw err;
    });
}
