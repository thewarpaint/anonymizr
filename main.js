var Anonymizr = {
  people: [
    {
      name: 'Abradolf Linkler',
      username: 'alinkler'
    },
    {
      name: 'Beatriz Viterbo',
      username: 'bv1945'
    },
    {
      name: 'Charles Burns',
      username: 'charlesb'
    },
    {
      name: 'Dr. Strangelove',
      username: 'drstrnglv'
    },
    {
      name: 'Edward Meechum',
      username: 'em_ss'
    },
    {
      name: 'FN-2187',
      username: 'fn2187'
    },
    {
      name: 'Gertie Barrimore',
      username: 'gertie_b'
    },
    {
      name: 'Holden Caulfield',
      username: 'hcaulfield'
    },
    {
      name: 'Inigo Montoya',
      username: 'inigo_tpb'
    },
    {
      name: 'John Doe',
      username: 'johndoe7'
    },
    {
      name: 'Karellen',
      username: 'earthsupervisor'
    },
    {
      name: 'Laurie Juspeczyk',
      username: 'sspectre_ii'
    },
    {
      name: 'Marty McFly',
      username: 'bttf'
    },
    {
      name: 'Nigel Godrich',
      username: 'lp09'
    },
    {
      name: 'Paul Allen',
      username: 'dorsialover'
    },
    {
      name: 'Robert Paulson',
      username: 'whatsyrnameagain'
    },
    {
      name: 'Thirteen',
      username: 'li3s'
    },
    {
      name: 'Vincent Vega',
      username: 'footmaster'
    },
    {
      name: 'Walt Whitman',
      username: '_willy_wonka_'
    }
  ],

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
