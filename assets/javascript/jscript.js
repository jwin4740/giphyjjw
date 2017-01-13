$(document).ready(function() {



  $("#submitme").on("click", function() {

      // the url that you grab data from
      var tvshow = $("#searchvalue").val().trim();
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + tvshow + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg"; 
      // runs the ajax call 
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // runs a function once the ajax call is completed
      .done(function(response) {
      	console.log(response);
        // takes the image retrieved from th url and stores in in a variable
       
        console.log(queryURL);

       for (var i = 0; i < 10; i++)
       {
       var imageUrl = response.data[i].images.original.url;
       var rating = response.data[i].rating;
        var picDiv = $("<div class='dyno dynadiv" + i + "'> <h3 class='rating'> Rating: " + rating + "</h3></div>");
        
        var image = $("<img>");

        image.attr("class", "gifs");
        image.attr("src", imageUrl);
        image.attr("alt", "tv image");
        $("#showgifs").append(picDiv);
        $(".dynadiv" + i).append(image);

        }
      });
    });






});
