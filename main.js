var Anonymizr = {
  colors: [
    '#1abc9c',
    '#16a085',
    '#2ecc71',
    '#27ae60',
    '#3498db',
    '#2980b9',
    '#9b59b6',
    '#8e44ad',
    '#34495e',
    '#2c3e50',
    '#f1c40f',
    '#f39c12',
    '#e67e22',
    '#d35400',
    '#e74c3c',
    '#c0392b',
    '#ecf0f1',
    '#bdc3c7',
    '#95a5a6',
    '#7f8c8d'
  ],

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

  autodetect: function () {
    var siteKey,
        found = false;

    for(siteKey in Anonymizr.sites) {
      if(Anonymizr.sites[siteKey].hostnameCheck instanceof RegExp) {
        found = Anonymizr.sites[siteKey].hostnameCheck.test(window.location.hostname);
      } else {
        found = Anonymizr.sites[siteKey].hostnameCheck === window.location.hostname;
      }

      if(found) {
        Anonymizr.sites[siteKey].process();
        break;
      }
    }
  },

  /**
   * Sites
   */
  sites: {
    reddit: {
      hostnameCheck: 'www.reddit.com',
      process: function () {
        var getUsernameInfo = Anonymizr.util.getUsernameClosure(),
            userInfo,
            username,
            i;

        // Authors
        var authors = document.querySelectorAll('.author');

        for(i = 0; i < authors.length; i++) {
          username = authors[i].textContent;
          userInfo = getUsernameInfo(username);
          authors[i].style.backgroundColor = userInfo.color;
          authors[i].style.color = userInfo.color;
        }

        // User mentions
        var mentions = document.querySelectorAll('[href^="/u/"]');

        for(i = 0; i < mentions.length; i++) {
          username = Anonymizr.util.sites.reddit.getUsernameFromUrl(mentions[i].href);
          userInfo = getUsernameInfo(username);
          mentions[i].style.backgroundColor = userInfo.color;
          mentions[i].style.color = userInfo.color;
        }
      }
    },
    twitter: {
      hostnameCheck: 'twitter.com',
      process: function () {
        var getUsernameInfo = Anonymizr.util.getUsernameClosure(),
            userInfo,
            username,
            i;

        // Avatars
        var avatars = document.querySelectorAll('.avatar, .DashboardProfileCard-avatarImage');

        for (i = 0; i < avatars.length; i++) {
          Anonymizr.util.blur(avatars[i]);
        }

        // Account groups (normal tweets and Who to follow)
        var accountGroups = document.querySelectorAll('.account-group'),
            accountGroupUsername;

        for(i = 0; i < accountGroups.length; i++) {
          // Username for normal tweets
          accountGroupUsername = accountGroups[i].querySelector('.username b');

          if(accountGroupUsername) {
            userInfo = getUsernameInfo(accountGroupUsername.textContent);
            accountGroupUsername.textContent = userInfo.username;
          }

          // Username for Who to follow
          accountGroupUsername = accountGroups[i].querySelector('.account-group-inner .username span.js-username');

          if(accountGroupUsername) {
            userInfo = getUsernameInfo(accountGroupUsername.textContent);
            accountGroupUsername.textContent = userInfo.username;
          }

          // Full name for both
          if(userInfo) {
            accountGroups[i].querySelector('.fullname').textContent = userInfo.name;
          }
        }

        // Quoted tweets
        var quotedTweets = document.querySelectorAll('.QuoteTweet-originalAuthor'),
          quotedTweetUsername;

        for(i = 0; i < quotedTweets.length; i++) {
          quotedTweetUsername = quotedTweets[i].querySelector('.QuoteTweet-screenname').childNodes[2];
          userInfo = getUsernameInfo(quotedTweetUsername.textContent);

          quotedTweetUsername.textContent = userInfo.username;
          quotedTweets[i].querySelector('.QuoteTweet-fullname').textContent = userInfo.name;
        }

        // Retweet headers
        var retweetHeaders =
          document.querySelectorAll('[data-retweeter] .js-retweet-text .js-user-profile-link');

        for(i = 0; i < retweetHeaders.length; i++) {
          username = Anonymizr.util.sites.twitter.getUsernameFromUrl(retweetHeaders[i].href);
          userInfo = getUsernameInfo(username);
          retweetHeaders[i].querySelector('b').textContent = userInfo.name + ' Retweeted';
        }

        // Reply text
        var replyTexts =
          document.querySelectorAll('[data-is-reply-to="true"] .Icon--reply + span .js-user-profile-link');

        for(i = 0; i < replyTexts.length; i++) {
          username = Anonymizr.util.sites.twitter.getUsernameFromUrl(replyTexts[i].href);
          userInfo = getUsernameInfo(username);

          if(replyTexts[i].querySelector('b')) {
            replyTexts[i].querySelector('b').textContent = userInfo.name;
          }
        }

        // Conversation headers for replies
        var conversationHeaders = document.querySelectorAll('.conversation-header .uncollapse');

        for(i = 0; i < conversationHeaders.length; i++) {
          username = Anonymizr.util.sites.twitter.getUsernameFromUrl(conversationHeaders[i].href);
          userInfo = getUsernameInfo(username);
          conversationHeaders[i].childNodes[2].textContent = 'In reply to ' + userInfo.name;
        }

        // At replies
        var atReplies = document.querySelectorAll('.twitter-atreply b');

        for(i = 0; i < atReplies.length; i++) {
          userInfo = getUsernameInfo(atReplies[i].textContent);
          atReplies[i].textContent = userInfo.username;
        }

        // Profile card
        var profileCard = document.querySelector('.DashboardProfileCard-userFields'),
            profileCardUsername;

        if(profileCard) {
          profileCardUsername = profileCard.querySelector('.DashboardProfileCard-screenname a span');
          userInfo = getUsernameInfo(profileCardUsername.textContent);
          profileCardUsername.textContent = userInfo.username;
          profileCard.querySelector('.DashboardProfileCard-name a').textContent = userInfo.name;
        }
      }
    },
  },

  /**
   * Utilities
   */
  util: {
    sites: {
      reddit: {
        getUsernameFromUrl: function (url) {
          return url.split('/')[4];
        }
      },
      twitter: {
        getUsernameFromUrl: function (url) {
          return url.split('/')[3];
        }
      }
    },

    blur: function (element) {
      var filter = 'blur(3px)';

      element.style.filter = filter;
      element.style.webkitFilter = filter;
    },

    // Fisher-Yates shuffle implementation from http://stackoverflow.com/a/2450976/6346268
    shuffle: function (array) {
      var currentIndex = array.length,
          temporaryValue,
          randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },

    getUsernameClosure: function () {
      var usernameMap = {},
          userCount = 0,
          colorCount = 0;

      Anonymizr.util.shuffle(Anonymizr.people);
      Anonymizr.util.shuffle(Anonymizr.colors);

      return function (username) {
        username = username.toLowerCase();

        if(!usernameMap[username]) {
          usernameMap[username] = Anonymizr.people[userCount];
          usernameMap[username].color = Anonymizr.colors[colorCount];

          userCount = (userCount + 1) % Anonymizr.people.length;
          colorCount = (colorCount + 1) % Anonymizr.colors.length;
        }

        return usernameMap[username];
      };
    }
  }
};
