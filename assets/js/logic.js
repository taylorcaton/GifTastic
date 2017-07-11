var topics = ["Breakdance", "Graffiti", "MC", "RAP", "Turntable", "Grandmaster Flash", "Bboy", "Dance Battle", "Funk"];
var pics;
var currentTopic;

function placeButtons(){

	$("#buttonBox").empty();
	for (var i = 0; i < topics.length; i++) {
		$("#buttonBox").append("<button class='btn btn-default round btnList' data-topic='"+topics[i]+"'>" + topics[i] + "</button>");
	}

}

function getPictures(topic, callback){
	// Example queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=5a6b2fcef7a946b89cf7a4f11c1eb68d&limit=10";

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      pics = response;
      callback();
    });
}

function emptyPictures(){
	$("#pictureBox").empty();
}

function placePictures(){
	for (var i = 0; i < pics.data.length; i++) {
		
		var src = pics.data[i].images.fixed_height_still.url;
		
		$("#pictureBox").append("<div class='thumbnail'>"+
								"<img src='"+
								src +
								"' class='img-fluid picList' data-num='"+i+"' data-animate='still' >"+
								"<p class='caption'>Rating: " + pics.data[i].rating + "</p>"+
								"</div>");
	}
}

function fixSpaces(){
	var newStr = "";
	for (var i = 0; i < currentTopic.length; i++) {
		if(currentTopic.substring(i, i+1) === " "){
			newStr += "+";
		}else {
			newStr += currentTopic.substring(i, i+1);
		}
	}

	return newStr;
}

$( document ).ready(function() {

	placeButtons();

	$(document).on("click", ".btnList", function(){
		
		currentTopic = $(this).attr("data-topic");
		currentTopic = fixSpaces();
		getPictures(currentTopic, function(){
			emptyPictures();
			placePictures();
		});
	});

	$(document).on("click", ".picList", function(){
		var arrayNum = $(this).attr("data-num");
		var animate = $(this).attr("data-animate");

		if(animate === "still"){
			var newSrc = pics.data[arrayNum].images.fixed_height.url;
			$(this).attr("data-animate", "animate");
		}else{
			var newSrc = pics.data[arrayNum].images.fixed_height_still.url;
			$(this).attr("data-animate", "still");
		}
		
		$(this).attr("src", newSrc);
	});

	 $('.addBox').keydown(function(event) {
        
        

        if (event.keyCode == 13) {
            event.preventDefault();
            topics.push($(this).val());
            placeButtons();
            console.log(topics);

         }
    });

});