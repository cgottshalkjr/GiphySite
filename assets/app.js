var topics = ["Branded To Kill", "Seven Samurai", "Ikiru", "In The Mood For Love", "Taxi Driver", "Stanley Kubrick", "Akira Kurosawa", "Andrei Tarkovsky", "Rainer Werner Fassbinder", "No Country For Old Men", "Harry Dean Stanton", "Wim Wenders", "Ichi The Killer", "The Passion Of Joan Of Arc"];

function displayMovieInfo() {

    var movieGIF = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieGIF + "&apikey=Kjfr6NFOahJ1dHWskpCZ5XzxIKmXsDtC&limit=10&rating="

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var movieDiv = $("<div class='movieGIF'>");

        $("#film-gif-display").prepend(movieDiv);
    });
}

//When a button is clicked...
$("#add-movie-gif").on("click", function (event) {
    event.preventDefault();
    var movie = $("#movie-input").val().trim();
    topics.push(movie);
    createButtons();
});


function createButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var movieButton = $("<button>");
        movieButton.addClass("movie btn btn-warning m-2 p-2");
        movieButton.attr("data-name", topics[i]);
        movieButton.text(topics[i]);
        $("#buttons-view").append(movieButton);
    }
}

$(document).on("click", ".movie", displayMovieInfo);

createButtons();















