// This function creates a tweet article
const createTweetElement = function(tweet) {
  const timeAgo = timeago.format(tweet.created_at); // Use timeago to format the tweet's creation time
  
   // escape function for cross-site scripting
  function escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const $tweet = $(`
    <article class="tweet">
      <div class="inside-tweet">
        <header>
          <div class="user-details">
            <img src="${escape(tweet.user.avatars)}" alt="" />
            <p>${escape(tweet.user.name)}</p>
            <span>${escape(tweet.user.handle)}</span>
          </div>
        </header>
        <div class="tweet-text">
          <p class="content">${escape(tweet.content.text)}</p>
        </div>
        <footer>
          <span class="time">${escape(timeAgo)}</span>
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
};


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
   // If user clicks anywhere outside of the error message, hide it
  $('body').on('click', function(event) {
    if (!$(event.target).closest('.error-messages').length) {
      $('.error-messages .error-length').hide();
      $('.error-messages .error-empty').hide();
    }
  });
 $('#create-tweet').on('submit', function(event) {
  event.preventDefault();

   // Hide any error messages before validation
    $('.error-messages .error-length').hide();
    $('.error-messages .error-empty').hide();

  const tweetText = $(this).find('textarea').val();

  if (tweetText.trim() === "") {
    $('.error-messages .error-empty').show();
    return; // Stop the function here
  }

  if (tweetText.length > 140) {
    $('.error-messages .error-length').show();

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