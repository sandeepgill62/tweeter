// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
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

const renderTweets = function(tweets) {
  for (const t of tweets) {
    const $tweet = createTweetElement(t);
    $(document).ready(function() {
      $('.tweets-container').append($tweet);
    });
  }
}

const createTweetElement = function(tweet) {

  console.log(tweet);

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

// renderTweets(data);

const loadTweets = function() {
  console.log("load..");
  $(document).ready(function() {

    console.log($(this).serialize());

    console.log('Button clicked, performing ajax call...');
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(data) {
        console.log('Success: ', data);
        console.log(data[0]['user']);
        renderTweets(data);
      });

    const $button = $('.submit');
    $button.on('click', function(event) {
      event.preventDefault();
      console.log($(this).serialize());


    });
  });

}

loadTweets();