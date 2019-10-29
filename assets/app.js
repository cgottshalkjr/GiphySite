//Setting array of initial buttons to be created
var topics = ["Branded To Kill", "Seven Samurai", "Ikiru", "In The Mood For Love", "Taxi Driver", "Stanley Kubrick", "Akira Kurosawa", "Andrei Tarkovsky", "Rainer Werner Fassbinder", "No Country For Old Men", "Harry Dean Stanton", "Wim Wenders", "Ichi The Killer", "The Passion Of Joan Of Arc"];

//Creating function to  display gifs that are gathered from giphy API
function displayMovieGif() {

  var movieGIF = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movieGIF + "&apikey=Kjfr6NFOahJ1dHWskpCZ5XzxIKmXsDtC&limit=10&rating="

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    var results = response.data;
    // Loop over every result item from response
    for (var i = 0; i < results.length; i++) {
      //If the results from giphy are not rated then...
      if (results[i].rating !== "r") {
        //Creating a div
        var gifImage = $("<div>");
        // Creating a variable for the rating for each result
        var rating = results[i].rating;
        //Creating a div to house the rating on page
        var ratingDisplay = $("<div>").text("Rating: " + rating);
        // Create a div to contain the gif
        var filmDiv = $("<div>");
        // Creating an image tag
        var filmImage = $("<img>");
        //Image tag getting a src attribute and giving it the url
        filmImage.attr("src", results[i].images.fixed_height_still.url);
        //rating div gets color
        ratingDisplay.addClass("text-warning");

        //Appending the the gif and ratings to div, adding classes to display gifs, adding class "gif" to be called in click function later, adding attributes to make still and animate.
        gifImage.append(ratingDisplay);
        filmDiv.append(filmImage);
        gifImage.append(filmDiv);
        gifImage.addClass("d-inline-block text-center mb-2 mr-3");
        filmImage.attr("data-state", "still");
        filmImage.addClass("gif")
        filmImage.attr("data-still", results[i].images.fixed_height_still.url);
        filmImage.attr("data-animate", results[i].images.fixed_height.url);

        //Prepending the gifImage to the main div display so when button is clicked it goes in front of last button clicked
        $("#film-gif-display").prepend(gifImage);
      }
    }
  });
}

//When submit button is clicked we grab the value from form that the user inputs and push it to movies array.
$("#add-movie-gif").on("click", function (event) {
  event.preventDefault();
  var movie = $("#movie-input").val().trim();
  topics.push(movie);
  createButtons();
});

//Creating function that makes buttons and emptys div so buttons do not double. Looping through array to create buttons. Adding styling. Appending to div.
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

//On click for given buttons
$(document).on("click", ".movie", displayMovieGif);

createButtons();

//On click for gifs. When we click they will animate and go still again from the classes we gave them earlier.
$(document).on("click", ".gif", function () {

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

















