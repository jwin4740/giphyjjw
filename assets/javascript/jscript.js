$(document).ready(function() {

    var imageUrl = "";
    var rating = "";
    var picDiv = "";
    var image = "";

    var topicsArray = ["seinfeld", "prisonbreak", "24", "alias", "theoffice", "blackish", "scrubs", "breakingbad", "everybodylovesraymond", "modernfamily"];

    // insert preloaded buttons
    for (var i = 0; i < 10; i++) {
        var novoButton = $("<button>");
        novoButton.attr("class", "buttonstyle");
        novoButton.attr("data-value", topicsArray[i]);
        novoButton.text(topicsArray[i]);

        $("#buttonscontainer").append(novoButton);
        $(".genbuttons" + topicsArray[i]).append(topicsArray[i]);

    }



    $("#submitme").on("click", function() {
        var tvshow = $("#searchvalue").val().trim();
        topicsArray.push(tvshow);

        console.log(topicsArray);

        var novoButton = $("<button>" + tvshow + "</button>");
        novoButton.attr("class", "genbuttons");
        $("#buttonscontainer").append(novoButton);


    });


    $(document).on("click", "button", function() {

        var show = $(this).attr("data-value");
        console.log(show);
   
       
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {
            console.log(response);
            console.log(queryURL);

            for (var i = 0; i < 10; i++) {
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
