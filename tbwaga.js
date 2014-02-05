(function (i, s, o, g, r, a, m) {
   i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
   }, i[r].l = 1 * new Date(); a = s.createElement(o),
   m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', '__gaTracker');



var tbwa = tbwa || {};

tbwa.ga = {
   init: function () {
      __gaTracker('create', 'UA-XXXX-Y', 'auto');  // Creates a tracker.
      __gaTracker('send', 'pageview');             // Sends a pageview.
      var trackable = document.querySelectorAll(".tbwa-ga-track"); //Get all elements that need to have ga tracking events attached to them
      for (var i = 0; i < trackable.length; i++) {
         var trackElement = trackable[i];
         if (trackElement.hasAttribute("data-ga-event")) {
            switch (trackElement.getAttribute("data-ga-event")) {
               case ("pageView"): tbwa.ga.trackPageView(trackElement);
               case ("virtualPage"): tbwa.ga.trackVirtualPage(trackElement);
               case ("social"): tbwa.ga.trackSocial(trackElement);
               default: console.log("unidentified ga-event")
            }

         }
      }
   },
   trackPageView: function (element) {

      //Handles all pageviews. To be tied in with ng's pagechangesuccess event so that asynchronous pageviews are tracked.
      var permalink = element.getAttribute("data-permalink");
      ga('send', 'pageview', permalink);

   },
   trackVirtualPage: function (element) {

      //Tracks downloads and other content interactions as virtual page interactions
      var category = element.getAttribute("data-category"); // can be pdf, video, mp3 etc.
      var action = element.getAttribute("data-action"); // can be download, play, pause, volume-up, mute, etc.
      var label = element.getAttribute("data-label"); // label (usually filename, video title, etc)
      var path = element.getAttribute("data-label"); // pseudo-permalink (/downloads/en/sample.pdf)
      ga('send', 'event', category, action, target, path);

   },
   trackSocial: function (element) {

      //This tracks social channel actions like Facebook likes, page follows, tweets, pins etc.
      var network = element.getAttribute("data-category"); // Facebook, Twitter, Pinterest etc.
      var target = element.getAttribute("data-label"); // label
      var path = element.getAttribute("data-value"); // pseudo-permalink (/facebook/fanpage/like)
      var action = element.getAttribute("data-action"); // Like, Follow, Share, Tweet, Pin, etc.
      ga('send', 'event', network, action, target, path);

   }

}

document.addEventListener("DOMContentLoaded", tbwaga.init);