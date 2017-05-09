
var request = require("request");

var spotify = require('spotify');

var Twitter = require("twitter");

var fs = require("fs");

var twitterKeys = require("./keys.js");

var fileRequestUserInput;
var fileRequestUserQuery;

var command = process.argv.splice(2);

var userInput = command[0];

var userQuery = command;

console.log("File quest is: " + fileRequestUserInput);

if (userInput == "do-what-is-says") {
    
    fs.readFile("random.txt", function(err, data) {

    if(err) {
        console.log(err);
        return;
    }

    var DATA = data.toString().split(", ");

        fileRequestUserInput = DATA[0];
        fileRequestUserQuery = DATA;


        userInput = fileRequestUserInput;
        userQuery = fileRequestUserQuery;

        console.log(userInput);
        console.log(userQuery);

        commandFunction();

    });

}

function commandFunction() {

    if (userInput == "movie-this") {
        findMovie();
    }

    if (userInput == "my-tweets") {
        findTweets();
    }

    if (userInput == "spotify-this-song") {
        findSpotify();
    }

}



function findMovie() {

        console.log("THEUSERQUERYIS!!!!! " + userQuery);

     var movieName = "";

        if(userQuery.length == 2) {

            request("http://www.omdbapi.com/?t=" + userQuery[1] + "&y=&plot=short&r=json", function(err, response, body){

            if (!err && response.statusCode === 200) {

                console.log("The movie's rating is: " + JSON.stringify(body, null, " "));

            }

        });

    } else if (userQuery.length === 1) {

        console.log("If you haven't watched \"Mr. Nobody,\" then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");

    } else {

            for (i = 1; i < userQuery.length; i++) {
                movieName = movieName + " " + userQuery[i];
            }

            console.log(movieName);

            request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(err, response, body){

                if (!err && response.statusCode === 200) {

                    console.log("The movie's rating is: " + JSON.stringify(body, null, " "));
                }

            });

        }


}

function findTweets() {

    var client = new Twitter(twitterKeys.twitterKeys);
    var countNumber = 21;

    client.get('statuses/user_timeline', {screen_name: 'MFDOOMisJUSTICE', count:countNumber}, function(error, tweets, response) {
        
        for (i = 0; i < countNumber; i++) {

            console.log("");
            console.log("The date/time you tweeted is :" + JSON.stringify(tweets[i].created_at, null, 2));
            console.log("And you tweeted :" + JSON.stringify(tweets[i].text, null, 2));
            console.log("");
        } 
    
    });

} 

function findSpotify() {

    if(userQuery.length === 1) {

        spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
        
            console.log(JSON.stringify(data.tracks.items[17], null, 2));
        });

        
    } else if (userQuery === 2) {

    

    }

}



