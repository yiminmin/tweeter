// This function creates a tweet article
const createTweetElement = function(tweet) {
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
          <span class="time">${new Date(tweet.created_at).toLocaleString()}</span>
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
    $tweetsContainer.append($tweet);
  });
}

// Test / driver code
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  renderTweets(data);
});
