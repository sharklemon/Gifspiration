$(document).ready(function() {

var buttonNames =["great", "fantastic", "beyonce", "success", "winning", "rainbow"]  
var quotes = ["'Genius is 1% inspiration and 99% perspiration.' --Thomas Edison",
"'There's only one way to succeed in anything, and that is to give it everything.' --Vince Lombardi",
"'Great difficulties may be surmounted by patience and perseverance.' --Abigail Adams",
"'Nobody's a natural. You work hard to get good and then work to get better. It's hard to stay on top.' --Paul Coffey",
"'We May Encounter Many Defeats But We Must Not Be Defeated.'- Maya Angelou",
"'People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily.' –Zig Ziglar",
"'The question isn’t who is going to let me; it’s who is going to stop me.' –Ayn Rand"]


function buttonPOP() {
  $("#buttonPanel").empty();
  $("gifs-appear-here").empty();
  for (var i = 0; i < buttonNames.length; i++) {
    var searchBtn = $("<button>");

    searchBtn.addClass("btn btn-primary gif-button");
    searchBtn.attr("type", "button");

    searchBtn.attr("id", buttonNames[i]);
    searchBtn.text(buttonNames[i]);

    $("#buttonPanel").append(searchBtn);
  }
}
buttonPOP()  

$("#find-gif").on("click", function(event) {

// Preventing the submit button from trying to submit the form
// We're optionally using a form so the user may hit Enter to search instead of clicking the button
  event.preventDefault();

// Here we grab the text from the input box
  var newSearch = $("#gif-input").val().trim();
  buttonNames.push(newSearch);
  buttonPOP();
  });


function toapi(){
  console.log("in to api")
  $("#gifs-appear-here").empty();
  $("#quote-div").empty();
  var searchterm = $(this).attr("id");
  console.log("search is ",  searchterm);

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  searchterm + "&rating=g&limit=10&api_key=fd924655bd99435e9a2e5bde34c1059b";

  $.ajax({
  url: queryURL,
  method: "GET"
  })
  .done(function(response) {
    var results = response.data;
    var gifDiv = $("<div class='item'>");
    var resultImage = $("<img>");
    var theNUM = Math.floor(Math.random() * quotes.length);
    console.log("our num is ", theNUM);
    
    resultImage.attr("id", "mainGIF");
    resultImage.attr("data-state", "still");
    resultImage.attr("data-still", results[theNUM].images.fixed_height_still.url);
    resultImage.attr("data-animate", results[theNUM].images.fixed_height.url);

    resultImage.attr("src", results[theNUM].images.fixed_height_still.url);
    gifDiv.prepend(resultImage);
    $("#gifs-appear-here").prepend(gifDiv);

    $("#quote-div").append(quotes[theNUM]);
    
  });

}

$(document.body).on("click", ".gif-button", toapi);


$(document.body).on("click", "#mainGIF", Motion)

function Motion() {
  var state = $(this).attr("data-state");
  console.log("in main gif clicker state is ", state);

  if(state=="still"){
    var newsource = $(this).attr("data-animate");
    console.log(newsource);
    $(this).attr("src", newsource);
    $(this).attr("data-state", 'animate');
  }
  else{
    var newsource = $(this).attr("data-still");
    $(this).attr("src", newsource);
    $(this).attr("data-state", 'still');
  }
} ;

});
