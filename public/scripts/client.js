// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton1",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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

  // render each tweet
  const renderTweets = function(tweets) {
    for (const t of tweets) {
      // call function to create tweet element
      const $tweet = createTweetElement(t);
      // prepend the tweet
      $('.tweets-container').prepend($tweet);
    }
  }

  // create tweet element
  const createTweetElement = function(tweet) {
    let $tweet = $(`<div class="tweets-outline">
  <article class="tweets">
    <!-- header of tweet -->
    <header>
      <div class="avtarAndName">
        <img src=${tweet['user']['avatars']}>
        <label for="tweeter-name">${tweet['user']['name']}</label>
      </div>
      <label class="tweeter-tag" for="tweeter-tag">${tweet['user']['handle']}</label>
    </header>

    <!-- message body of tweet -->
    <div class="tweet-message">
      <label for="tweeter-days">${tweet['content']['text']}</label>
    </div>

    <!-- footer of tweet -->
    <footer>
    
      <label for="tweet-days">${timeago.format(tweet['created_at'])}</label>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-sharp fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
</div>`);
    return $tweet;
  }

  var flag = true;
  // function to load all tweets
  const loadTweets = function() {

    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(data) {
        if (flag) {
          renderTweets(data);
        } else {
          const $tweet = createTweetElement(data[data.length - 1]);
          // prepend the tweet
          $('.tweets-container').prepend($tweet);
        }
        flag = false;
      });
  };

  $(".error-div").hide();

  $("form").on("submit", function(event) {
    // Stop form from submitting normally
    event.preventDefault();
    // get the tweet text
    const textValue = $('#tweet-text').val();

    // validation the tweet if empty or too long
    if (textValue.length === 0 || textValue === null) {
      // slide down the error message
      $(".error-div").slideDown();
      $(".error-message").text("Tweet content should not be empty");
    } else if (textValue.length > 140) {
      // slide down the error message
      $(".error-div").slideDown();
      $(".error-message").text("Tweet content is too long. Limit is 140 characters.");
    } else {
      // slide up the error message
      $(".error-div").slideUp();
      $.ajax({
        method: "POST",
        url: `/tweets`,
        // serialize the text
        data: $(this).serialize(),
      }).done(function(data) {
        //call the function to load the tweets from server
        loadTweets();
        $('#tweet-text').val("");
      });
    }
  });

  //call the function to load the tweets from server
  loadTweets();

});