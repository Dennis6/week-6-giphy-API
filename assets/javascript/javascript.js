$( document ).ready(function() {
var topics = ["tupac shakur", "lauryn hill", "jimi hendrix", "21 pilots", "N.E.R.D", "The neptunes", "panic at the disco", "kevin gates", "nirvana", "the beatles","Erykah badu", "Nina simone", "janis joplin", "kid cudi","Green day", "MGMT", "ratatat", "bill withers", "calvin harris", "jack u", "bob marley", "bob dylan", "billie holiday"];


function displayGifButtons(){
    $("#click").empty(); 
    for (var i = 0; i < topics.length; i++){
        var push = $("<button>");
        push.addClass("action");
        push.addClass("btn btn-primary")
        push.attr("data-name", topics[i]);
        push.text(topics[i]);
        $("#click").append(push);
    }
}
function addNewButton(){
    $("#more").on("click", function(){
    var action = $("#grind").val().trim();
    if (action == ""){
      return false; 
    }
    topics.push(action);

    displayGifButtons();
    return false;
    });
}
function removeLastButton(){
    $("removeGif").on("click", function(){
    topics.pop(action);
    displayGifButtons();
    return false;
    });
}
function displayGifs(){
    var action = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL); 
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    // call response function
    .done(function(response) {
        console.log(response); // test returns in console
        $("#drake").empty(); // empty anything in this div id
        var test = response.data; //shows gifs
        if (test == ""){
          alert("Invalid");
        }
        for (var i=0; i<test.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            
            var gifRating = $("<p>").text("Rating: " + test[i].rating);
            gifDiv.append(gifRating);
            
            var photo = $("<img>");
            photo.attr("src", test[i].images.fixed_height_small_still.url); // still image stored into src of image
            photo.attr("data-still",test[i].images.fixed_height_small_still.url); // still image
            photo.attr("data-animate",test[i].images.fixed_height_small.url); // animated image
            photo.attr("data-state", "still"); // set the image state
            photo.addClass("image");
            gifDiv.append(photo);
            // accessing still photos
            $("#drake").prepend(gifDiv);
        }
    });
}
// Calling Functions ,Methods, and Events 
displayGifButtons(); 
addNewButton();
removeLastButton();
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var now = $(this).attr('data-state');
    if ( now == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});