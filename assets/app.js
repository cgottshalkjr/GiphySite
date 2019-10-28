var topics = ["Branded To Kill", "Seven Samurai", "Ikiru", "In The Mood For Love", "Taxi Driver", "Stanley Kubrick", "Akira Kurosawa", "Andrei Tarkovsky", "Rainer Werner Fassbinder", "No Country For Old Men", "Harry Dean Stanton", "Wim Wenders", "Ichi The Killer", "The Passion Of Joan Of Arc"];

function displayMovieInfo() {

    var movieGIF = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieGIF + "&apikey=Kjfr6NFOahJ1dHWskpCZ5XzxIKmXsDtC&limit=10&rating="


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

          // Only taking action if the photo has an appropriate rating
          if (results[i].rating !== "r") {
            // Creating a div for the gif
            var gifImage = $("<div>");

            // Storing the result item's rating
            var rating = results[i].rating;

            // Creating a paragraph tag with the result item's rating
            var ratingDisplay = $("<div>").text("Rating: " + rating);

            // Create a div to contain the img
            var filmDiv = $("<div>");

            // Creating an image tag
            var filmImage = $("<img>");

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            filmImage.attr("src", results[i].images.fixed_height_still.url);
            ratingDisplay.addClass("text-warning");

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifImage.append(ratingDisplay);
            filmDiv.append(filmImage);
            gifImage.append(filmDiv);
            gifImage.addClass("d-inline-block text-center mb-2 mr-3");
            filmImage.attr("data-state", "still");
            filmImage.addClass("gif")
            filmImage.attr("data-still", results[i].images.fixed_height_still.url);
            filmImage.attr("data-animate", results[i].images.fixed_height.url);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#film-gif-display").prepend(gifImage);
          }
        }
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

$(document).on("click", ".gif", function() {
    
  var state = $(this).attr("data-state");

  console.log(state)

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

















