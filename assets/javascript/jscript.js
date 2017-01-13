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
        if (event.keyCode === 13) {
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

            // var testimage = "http://media0.giphy.com/media/Fr9rgAhT9JIw8/giphy.gif";
            // testimage = $("<img>");
            // testimage.attr({ "class" : "gifs" });
            // $("#showgifs").append(testimage);


            for (var i = 0; i < responseLength; i++) {
                imageUrl = response.data[i].images.original_still.url;
                var imageUrlAnimate = response.data[i].images.original.url;
                var imageUrlStill = response.data[i].images.original_still.url;
                rating = response.data[i].rating;
                picDiv = $("<div class='dyno dynadiv" + i + "'> <h3 class='rating'> Rating: " + rating + "</h3></div>");
                image = $("<img>");
                image.attr({ "class": "gifs", "src": imageUrl, "data-still": imageUrlStill, "data-animate": imageUrlAnimate, "data-state" : "still", "alt": "tvgiphy" });
                $("#showgifs").append(picDiv);
                $(".dynadiv" + i).append(image);

            }
        });

    });


    $("#showgifs").on("click", ".gifs", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });







});
