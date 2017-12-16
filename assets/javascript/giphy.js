var topics = ['animal', 'yoga', 'falling', 'cooking', 'kid', 'dancing']
var queryURL = "https://api.giphy.com/v1/gifs/search?"
				+ "api_key=jksqFUtJ5Ul8suHNWBbh2pNeeveKidRj"
				+ "&limit=10"
				+ "&q=";
				


function createButtons() {
	//Creating a for-loop to make buttons for each topic in array
	for (var i = 0; i < topics.length; i++) {

		var newButton = $('<button>'+ topics[i] + '</button>') 
		newButton.addClass('giphy-buttons')
		newButton.attr('data-topic', topics[i])
		//adding the buttons to the button-holder div
    	$('.button-div').prepend(newButton)
	} 

}

function displayGifs(gifs) {

	for (var i = 0; i < gifs.length; i++) {
		console.log(gifs[i].images.downsized_medium.url)
		var gifDiv = $('<div>')
		gifDiv.addClass = ('picture-holder')
		var image = $('<img>')
		image.addClass('gif')
		image.attr('src', gifs[i].images.fixed_height_still.url)
		image.attr('data-state', 'still')
		image.attr('data-still', gifs[i].images.fixed_height_still.url)
		image.attr('data-animate', gifs[i].images.fixed_height.url)
		//$('.picture-div').append(image)
		var rating = $('<p>')
		rating.text('Rating: ' + gifs[i].rating)
		gifDiv.prepend(rating)
		gifDiv.append(image)
		$('.picture-div').append(gifDiv)
		
	}
}


function makeRequest(currentTopic) {
 $.ajax({
        url: queryURL + currentTopic,
        method: "GET"
      })

 .done(function(response) {
 	var results = (response)
 	console.log(results)
 	//display giphs on page
 	displayGifs(results.data)


	})	
}


$(document).ready(function() {

	createButtons()

	//when a button with the giphy-button class is clicked
	$(document).on('click', '.giphy-buttons', function(){
		//add an image URL to the button
		var topicList = $(this).attr('data-topic')
		var topic = topicList + '-fail'
		$('.picture-div').html('')

		makeRequest(topic)

	})

	//when a gif is clicked
	$(document).on('click', '.gif', function(){
		//get the data state from the gif that is clicked 
		//and store it in a variable called "state"
		var state = $(this).attr("data-state")

		//If the data state = still (which it is at first)
		if (state === "still") {
		//update the data state to still
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "animate");
     	} else {
     	//update the data state to animate
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "still");
      	}


	 	})

	}) 


	//adding a new button


	$(document).on('click', '.search', function(event){
		var searchTerm = $('#text').val()
		topics.push(searchTerm)


		$('.button-div').empty()
		createButtons()







	})












