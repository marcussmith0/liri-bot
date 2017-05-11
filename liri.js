
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

logCommands();

function logCommands() {
    
    if(command.length == 1) {

        fs.appendFile("log.txt", " " + userInput + "\n", (err) => {

            if(err) throw err;
            engine();
        
        });

    } else {

        var logCommand = "";

        for (i = 0; i < command.length; i++) {
            logCommand = logCommand + " " + command[i];
        }

        fs.appendFile("log.txt", logCommand + "\n", (err) => {

            if(err) throw err;
            engine();

        })

    }

}

function engine() {

    if (userInput == "do-what-it-says") {
    
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

            commandFunction();  

        });

    }


}

commandFunction();

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

     var movieName = "";

        if(userQuery.length == 2) {

            request("http://www.omdbapi.com/?t=" + userQuery[1] + "&y=&plot=short&r=json", function(err, response, body){

            if (!err && response.statusCode === 200) {

                console.log("");
                console.log("");
                console.log("Title: " + userQuery[1]); // JSON.parse(body).Title comes back undefined, weird
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes: https://www.rottentomatoes.com/"); 
                console.log("");
                console.log("");


            }

        });

    } else if (userQuery.length === 1) {

        console.log("If you haven't watched \"Mr. Nobody,\" then you should: http://www.imdb.com/title/tt0485947/");
        console.log("It's on Netflix!");

    } else {

            for (i = 1; i < userQuery.length; i++) {
                movieName = movieName + " " + userQuery[i];
            }

            request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(err, response, body){

                if (!err && response.statusCode === 200) {

                console.log("");
                console.log("");
                console.log("Title: " + movieName);
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Rotten Tomatoes: https://www.rottentomatoes.com/"); 
                console.log("");
                console.log("");

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

    var songName = "";

    if(userQuery.length === 1) {

        spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }

            console.log("");
            console.log("")
            console.log("Artist: " + JSON.stringify(data.tracks.items[17].artists[0].name));
            console.log("Song's name: " + JSON.stringify(data.tracks.items[17].name));
            console.log("Preview link: " + JSON.stringify(data.tracks.items[17].external_urls.spotify));
            console.log("Album: " + JSON.stringify(data.tracks.items[17].album.name));
            console.log("");
            console.log("");

        });

        
    } else if (userQuery.length === 2) {

        songName = userQuery[1];

        spotify.search({ type: 'track', query: songName }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
        
           // console.log(JSON.stringify(data, null, 2));

            console.log("");
            console.log("")
            console.log("Artist: " + JSON.stringify(data.tracks.items[17].artists[0].name));
            console.log("Song's name: " + JSON.stringify(data.tracks.items[17].name));
            console.log("Preview link: " + JSON.stringify(data.tracks.items[17].external_urls.spotify));
            console.log("Album: " + JSON.stringify(data.tracks.items[17].album.name));
            console.log("");
            console.log("");

            
        });

    } else {

         for (i = 1; i < userQuery.length; i++) {
            songName = songName + " " + userQuery[i];

        }

        spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
            if ( err ) {
                console.log('Error occurred: ' + err);
                return;
            }
        
           // console.log(JSON.stringify(data, null, 2));

            console.log("");
            console.log("")
            console.log("Artist: " + JSON.stringify(data.tracks.items[17].artists[0].name));
            console.log("Song's name: " + JSON.stringify(data.tracks.items[17].name));
            console.log("Preview link: " + JSON.stringify(data.tracks.items[17].external_urls.spotify));
            console.log("Album: " + JSON.stringify(data.tracks.items[17].album.name));
            console.log("");
            console.log("");

        });
    }

}