$(document).ready(function() {



  $("#submitme").on("click", function() {

      // the url that you grab data from
      var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=seinfeld&rating=pg";

      // runs the ajax call 
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // runs a function once the ajax call is completed
      .done(function(response) {
      	console.log(response);
        // takes the image retrieved from th url and stores in in a variable
        var imageUrl = response.data.image_original_url;
        console.log(queryURL);

        //creates an image element and stores it in a variable
        
        var catImage = $("<img>");

        //gives attributes to the image
        catImage.attr("class", "gifs");
        catImage.attr("src", imageUrl);
        catImage.attr("alt", "cat image");

        //prepends the image into the div id="images"
        $("#showgifs").append(catImage);
        $("#showgifs").append(catImage);
      });
    });






});
