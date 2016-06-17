var Anonymizr = {
  /**
   * Sites
   */
  twitter: function () {
    var i;

    // Avatars
    var avatars = document.querySelectorAll('.avatar, .DashboardProfileCard-avatarImage');

    for (i = 0; i < avatars.length; i++) {
      this.blur(avatars[i]);
    }

    // Account groups (normal tweets and Who to follow)
    var accountGroups = document.querySelectorAll('.account-group'),
        username;

    for(i = 0; i < accountGroups.length; i++) {
      // Full name for both
      accountGroups[i].querySelector('.fullname').textContent = 'Rickrolled!';

      // Username for normal tweets
      username = accountGroups[i].querySelector('.username b');

      if(username) {
        username.textContent = 'rckrlld';
      }

      // Username for Who to follow
      username = accountGroups[i].querySelector('.account-group-inner .username span.js-username');

      if(username) {
        username.textContent = 'rckrlld';
      }
    }

    // Quoted tweets
    var quotedTweets = document.querySelectorAll('.QuoteTweet-originalAuthor');

    for(i = 0; i < quotedTweets.length; i++) {
      quotedTweets[i].querySelector('.QuoteTweet-fullname').textContent = 'Rickrolled!';
      quotedTweets[i].querySelector('.QuoteTweet-screenname').childNodes[2].textContent = 'rckrlld';
    }

    // Retweet headers
    var retweetHeaders = document.querySelectorAll('.js-retweet-text .js-user-profile-link b');

    for(i = 0; i < retweetHeaders.length; i++) {
      retweetHeaders[i].textContent = 'Rickrolled! Retweeted';
    }

    // Conversation headers for replies
    var conversationHeaders = document.querySelectorAll('.conversation-header .uncollapse');

    for(i = 0; i < conversationHeaders.length; i++) {
      conversationHeaders[i].childNodes[2].textContent = 'In reply to Rickrolled!';
    }

    // Profile card
    var profileCard = document.querySelector('.DashboardProfileCard-userFields');
    profileCard.querySelector('.DashboardProfileCard-name a').textContent = 'Rickrolled!';
    profileCard.querySelector('.DashboardProfileCard-screenname a span').textContent = 'rckrlld';
  },

  /**
   * Utilities
   */
  blur: function (element) {
    var filter = 'blur(3px)';

    element.style.filter = filter;
    element.style.webkitFilter = filter;
  }
};
