var Anonymizr = {
  // https://material.google.com/style/color.html#color-color-palette
  colors: [
    '#f44336', // Red: 500
    '#e91e63', // Pink: 500
    '#9c27b0', // Purple: 500
    '#673ab7', // Deep Purple: 500
    '#3f51b5', // Indigo: 500
    '#2196f3', // Blue: 500
    '#03a9f4', // Light Blue: 500
    '#00bcd4', // Cyan: 500
    '#009688', // Teal: 500
    '#4caf50', // Green: 500
    '#8bc34a', // Light Green: 500
    '#cddc39', // Lime: 500
    '#ffeb3b', // Yellow: 500
    '#ffc107', // Amber: 500
    '#ff9800', // Orange: 500
    '#ff5722', // Deep Orange: 500
    '#795548', // Brown: 500
    '#9e9e9e', // Grey: 500
    '#607d8b', // Blue Grey: 500
    '#000000'  // Black: 500
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
    github: {
      hostnameCheck: 'github.com',
      process: function () {
        var getUsernameInfo = Anonymizr.util.getUsernameClosure(),
            i;

        // Avatars
        var avatars = document.querySelectorAll('.avatar, .timeline-comment-avatar');

        for (i = 0; i < avatars.length; i++) {
          Anonymizr.util.blur(avatars[i]);
        }

        // Authors and user mentions
        var authors = document.querySelectorAll('.author, .author a, .user-mention'),
            username;

        for(i = 0; i < authors.length; i++) {
          username = authors[i].textContent.replace('@', '');
          userInfo = getUsernameInfo(username);
          Anonymizr.util.colorize(authors[i], userInfo.color);
        }
      }
    },

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
          Anonymizr.util.colorize(authors[i], userInfo.color);
        }

        // User mentions
        var mentions = document.querySelectorAll('[href^="/u/"]');

        for(i = 0; i < mentions.length; i++) {
          username = Anonymizr.sites.reddit.getUsernameFromUrl(mentions[i].href);
          userInfo = getUsernameInfo(username);
          Anonymizr.util.colorize(mentions[i], userInfo.color);
        }
      },

      // Utilities
      getUsernameFromUrl: function (url) {
        return url.split('/')[4];
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
          username = Anonymizr.sites.twitter.getUsernameFromUrl(retweetHeaders[i].href);
          userInfo = getUsernameInfo(username);
          retweetHeaders[i].querySelector('b').textContent = userInfo.name + ' Retweeted';
        }

        // Reply text
        var replyTexts =
          document.querySelectorAll('[data-is-reply-to="true"] .Icon--reply + span .js-user-profile-link');

        for(i = 0; i < replyTexts.length; i++) {
          username = Anonymizr.sites.twitter.getUsernameFromUrl(replyTexts[i].href);
          userInfo = getUsernameInfo(username);

          if(replyTexts[i].querySelector('b')) {
            replyTexts[i].querySelector('b').textContent = userInfo.name;
          }
        }

        // Conversation headers for replies
        var conversationHeaders = document.querySelectorAll('.conversation-header .uncollapse');

        for(i = 0; i < conversationHeaders.length; i++) {
          username = Anonymizr.sites.twitter.getUsernameFromUrl(conversationHeaders[i].href);
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
      },

      // Utilities
      getUsernameFromUrl: function (url) {
        return url.split('/')[3];
      }
    },
  },

  /**
   * Utilities
   */
  util: {
    blur: function (element) {
      var filter = 'blur(3px)';

      element.style.filter = filter;
      element.style.webkitFilter = filter;
    },

    colorize: function (element, color) {
      element.style.backgroundColor = color;
      element.style.color = color;
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
          usernameMap[username] = {
            name: Anonymizr.people[userCount].name,
            username: Anonymizr.people[userCount].username,
            color: Anonymizr.colors[colorCount]
          };

          userCount = (userCount + 1) % Anonymizr.people.length;
          colorCount = (colorCount + 1) % Anonymizr.colors.length;
        }

        return usernameMap[username];
      };
    }
  }
};
