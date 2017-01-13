$(document).ready(function() {

    var imageUrl = "";
    var rating = "";
    var picDiv = "";
    var image = "";

    var topicsArray = ["seinfeld", "prisonbreak", "alias", "theoffice", "blackish", "scrubs", "barneystinson", "modernfamily", "bloodline", "nashville"];

    // insert preloaded buttons

    function insertButtons() {
        $("#buttonscontainer").empty();

        for (var i = 0; i < topicsArray.length; i++) {
            var novoButton = $("<button>");
            novoButton.attr("class", "buttonstyle");
            novoButton.attr("data-value", topicsArray[i]);
            novoButton.text(topicsArray[i]);

            $("#buttonscontainer").append(novoButton);
            $(".genbuttons" + topicsArray[i]).append(topicsArray[i]);

        }
    }
    insertButtons()




    $("#submitme").on("click", function() {
        var tvshow = $("#searchvalue").val().trim();
        topicsArray.push(tvshow);
        insertButtons();
        console.log(topicsArray);
    });

     $("#search").on("keypress", function() {
      if (event.keyCode === 13)
      {
        var tvshow = $("#searchvalue").val().trim();
        topicsArray.push(tvshow);
        insertButtons();
        console.log(topicsArray);
      }
    });


    $("#buttonscontainer").on("click", "button", function() {

        var show = $(this).attr("data-value");
        console.log(show);


        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {
          console.log(response);
            var responseLength = response.data.length;
            console.log(queryURL);
            $("#showgifs").empty()
            $("#responseMessage").empty();

            if (responseLength < 10) {
                $("#responseMessage").html("Your search only returned " + responseLength + " results");
            }

             if (responseLength === 0) {
                $("#responseMessage").html("Your search did not return any results");
            }


            for (var i = 0; i < responseLength; i++) {
                imageUrl = response.data[i].images.original.url;
                rating = response.data[i].rating;
                picDiv = $("<div class='dyno dynadiv" + i + "'> <h3 class='rating'> Rating: " + rating + "</h3></div>");
                image = $("<img>");
                image.attr("class", "gifs");
                image.attr("src", imageUrl);
                image.attr("alt", "tv image");
                $("#showgifs").append(picDiv);
                $(".dynadiv" + i).append(image);

            }
        });

    });










});
