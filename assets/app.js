var topics = ["Branded To Kill", "Seven Samurai", "Ikiru", "In The Mood For Love", "Taxi Driver", "Stanley Kubrick", "Akira Kurosawa", "Andrei Tarkovsky", "Rainer Werner Fassbinder", "No Country For Old Men", "Harry Dean Stanton", "Wim Wenders", "Ichi The Killer", "The Passion Of Joan Of Arc"];

$("button").on("click", function () {

    var APIKEY = "Kjfr6NFOahJ1dHWskpCZ5XzxIKmXsDtC";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + APIKEY + "&limit=10&rating="


});

function createButtons() {
    for (var i = 0; i < topics.length; i++) {
        $("#buttons-view").empty
        var movieButton = $("<button>");
        movieButton.addClass("movie btn btn-warning m-2 p-2");
        movieButton.attr("data-name", topics[i]);
        movieButton.text(topics[i]);
        $("#buttons-view").append(movieButton);
    }
}

createButtons();