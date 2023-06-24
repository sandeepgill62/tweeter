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
  const renderTweets = function(tweets) {
    for (const t of tweets) {
      const $tweet = createTweetElement(t);
      $('.tweets-container').append($tweet);
    }
  }

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

  $("form").on("submit", function(event) {
    // Stop form from submitting normally
    event.preventDefault();
    //const text = $("#tweet-text").val();

    $.ajax({
      method: "POST",
      url: `/tweets`,
      //serialize the text
      data: $(this).serialize(),
    }).done(function(data) {
      console.log(data);
    });

  });

});