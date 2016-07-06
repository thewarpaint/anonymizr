var Anonymizr = {
  // https://material.google.com/style/color.html#color-color-palette
  colors: [
    '#f44336', // Red: 500
    '#673ab7', // Deep Purple: 500
    '#03a9f4', // Light Blue: 500
    '#4caf50', // Green: 500
    '#ffeb3b', // Yellow: 500
    '#ff5722', // Deep Orange: 500
    '#e91e63', // Pink: 500
    '#3f51b5', // Indigo: 500
    '#00bcd4', // Cyan: 500
    '#8bc34a', // Light Green: 500
    '#ffc107', // Amber: 500
    '#9c27b0', // Purple: 500
    '#2196f3', // Blue: 500
    '#009688', // Teal: 500
    '#cddc39', // Lime: 500
    '#ff9800', // Orange: 500
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
    facebook: {
      hostnameCheck: 'www.facebook.com',
      process: function () {
        var getUsernameInfo = Anonymizr.util.getUsernameClosure(),
            userInfo,
            username,
            i;

        // Avatars (`._38vo` is post author, `._55lq` is chat avatar, `._5r69` is post share,
        //   `._3m9g` is liking and commenting as, `._43qm` is people in a place,
        //   `._3-8j` is a birthday profile)
        var avatars =
              document.querySelectorAll('._38vo, ._55lq, .UFIRow ._ohe img, ' +
                '.fbxWelcomeBoxProfilePicBlock img, [data-click="profile_icon"] img, ._5r69 ._ohe img,' +
                '._3m9g ._55pe, ._43qm img, ._3-8j ._ohe img');

        for (i = 0; i < avatars.length; i++) {
          Anonymizr.util.blur(avatars[i]);
        }
      },

      // Utilities
      getUsernameFromUrl: function (url) {
        return url.split('/')[3].split('?')[0];
      }
    },

    github: {
      hostnameCheck: 'github.com',
      process: function () {
        var getUsernameInfo = Anonymizr.util.getUsernameClosure(),
            i;

        /**
         * Global
         */

        // Avatars
        var avatars =
          document.querySelectorAll('.avatar, .timeline-comment-avatar, .select-menu-button-gravatar img');

        for (i = 0; i < avatars.length; i++) {
          Anonymizr.util.blur(avatars[i]);
        }

        // Authors, user mentions, owners in repositories you contribute to, opened by for Pull Request and
        // Issue lists
        var authors = document.querySelectorAll('.author, .author a, .user-mention, ' +
              '.mini-repo-list .owner, .opened-by a'),
            username;

        for(i = 0; i < authors.length; i++) {
          username = authors[i].textContent.replace('@', '');
          userInfo = getUsernameInfo(username);
          Anonymizr.util.colorize(authors[i], userInfo.color);
        }

        /**
         * Dashboard
         */
        var dashboard = document.querySelector('#dashboard');

        if(dashboard) {
          // Account switcher
          var accountSwitcherUsername = dashboard.querySelector('.account-switcher button span');

          if(accountSwitcherUsername) {
            userInfo = getUsernameInfo(accountSwitcherUsername.textContent);
            Anonymizr.util.colorize(accountSwitcherUsername, userInfo.color);
          }

          // News
          var newsLinks = dashboard.querySelectorAll('.news .title a'),
              textContent,
              span;

          for(i = 0; i < newsLinks.length; i++) {
            username = Anonymizr.sites.github.getUsernameFromUrl(newsLinks[i].href);
            userInfo = getUsernameInfo(username);
            textContent = newsLinks[i].textContent;

            if(textContent.indexOf('/') === -1) {
              Anonymizr.util.colorize(newsLinks[i], userInfo.color);
            } else {
              span = document.createElement('span');
              span.textContent = username;
              Anonymizr.util.colorize(span, userInfo.color);

              newsLinks[i].textContent = textContent.replace(username, '');
              newsLinks[i].insertBefore(span, newsLinks[i].childNodes[0]);
            }
          }
        }
      },

      // Utilities
      getUsernameFromUrl: function (url) {
        return url.split('/')[3];
      }
    },

    reddit: {
      hostnameCheck: 'www.reddit.com',
      process: function () {
        var getUsernameInfo = Anonymizr.util.getUsernameClosure(),
            userInfo,
            username,
            i;

        // Authors, current user
        var authors = document.querySelectorAll('.author, .user a');

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

    slack: {
      hostnameCheck: /\.slack\.com$/,
      process: function () {
        var getUsernameInfo = Anonymizr.util.getUsernameClosure(),
            userInfo,
            username,
            i;

        // Avatars
        var avatars = document.querySelectorAll('.member_image');

        for (i = 0; i < avatars.length; i++) {
          Anonymizr.util.blur(avatars[i]);
        }

        // Members, member links, channel members
        var members = document.querySelectorAll('a.member, li.member a, .internal_member_link, ' +
              '.channel_page_member_row [data-member-id]'),
            mention;

        for(i = 0; i < members.length; i++) {
          username = Anonymizr.sites.slack.getUsernameFromUrl(members[i].href);
          userInfo = getUsernameInfo(username);
          mention = members[i].querySelector('.mention');

          if(mention) {
            Anonymizr.util.colorize(mention, userInfo.color);
          } else {
            Anonymizr.util.colorize(members[i], userInfo.color);
          }
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
          accountGroupUsername =
            accountGroups[i].querySelector('.account-group-inner .username span.js-username');

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

        // Stream activity headers (likes, likes to mentions, follows)
        var streamHeaders = document.querySelectorAll('.stream-item-activity-header .js-user-profile-link');

        for(i = 0; i < streamHeaders.length; i++) {
          username = Anonymizr.sites.twitter.getUsernameFromUrl(streamHeaders[i].href);
          userInfo = getUsernameInfo(username);
          streamHeaders[i].querySelector('.fullname').textContent = userInfo.username;
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
      element.style.setProperty('background-color', color, 'important');
      element.style.setProperty('color', color, 'important');
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
          userIndex = 0,
          colorIndex = Math.floor(Math.random() * Anonymizr.colors.length);

      Anonymizr.util.shuffle(Anonymizr.people);

      return function (username) {
        username = username.toLowerCase();

        if(!usernameMap[username]) {
          usernameMap[username] = {
            name: Anonymizr.people[userIndex].name,
            username: Anonymizr.people[userIndex].username,
            color: Anonymizr.colors[colorIndex]
          };

          userIndex = (userIndex + 1) % Anonymizr.people.length;
          colorIndex = (colorIndex + 1) % Anonymizr.colors.length;
        }

        return usernameMap[username];
      };
    }
  }
};

Anonymizr.autodetect();
