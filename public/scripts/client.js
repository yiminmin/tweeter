// This function creates a tweet article
const createTweetElement = function(tweet) {
  const timeAgo = timeago.format(tweet.created_at); // Use timeago to format the tweet's creation time
  
  const $tweet = $(`
    <article class="tweet">
      <div class="inside-tweet">
        <header>
          <div class="user-details">
            <img src="${tweet.user.avatars}" alt="" />
            <p>${tweet.user.name}</p>
            <span>${tweet.user.handle}</span>
          </div>
        </header>
        <div class="tweet-text">
          <p class="content">${tweet.content.text}</p>
        </div>
        <footer>
          <span class="time">${timeAgo}</span>
          <span class="icons">
            <i class="fa fa-flag" aria-hidden="true"></i>
            <i class="fa fa-retweet" aria-hidden="true"></i>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </span>
        </footer>
      </div>
    </article>
  `);
  return $tweet;
}

// This function appends all tweets to the tweets container
const renderTweets = function(tweets) {
  const $tweetsContainer = $('.tweet-container'); // changed from '#tweets-container' to '.tweet-container'
  $tweetsContainer.empty();

  tweets.forEach(tweet => {
    const $tweet = createTweetElement(tweet);
    $tweetsContainer.prepend($tweet); // use prepend instead of append
  });
}

// This function fetches tweets from the server
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: function(tweets) {
      // Once the request is successful, render the tweets
      renderTweets(tweets);
    },
    error: function(err) {
      // Log any error to the console
      console.log(`Error: ${err}`);
    }
  });
}

$(document).ready(function() {
  // Define the form submission event handler outside of any other function
  // It will be added only once when the document is ready
 $('#create-tweet').on('submit', function(event) {
  event.preventDefault();

  const tweetText = $(this).find('textarea').val();

  if (tweetText.trim() === "") {
    alert("Please enter some text before tweeting"); // Or display a custom message
    return; // Stop the function here
  }

  if (tweetText.length > 140) {
    alert("You cannot post more than 140 characters"); // Or display a custom message
    return; // Stop the function here
  }

  const formData = $(this).serialize();

  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formData,
    success: function(response) {
      loadTweets(); // Refresh the tweets
    },
    error: function(error) {
      console.log(error);
    }
  });
});

  // Initially load the tweets when the document is ready
  loadTweets();
});