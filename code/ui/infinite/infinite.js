/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  function lowEnough() {
    var pageHeight = Math.max(document.body.scrollHeight,
      document.body.offsetHeight);
    var viewportHeight = window.innerHeight ||
      document.documentElement.clientHeight || 
      document.body.clientHeight || 0;
    var scrollHeight = window.pageYOffset ||
      document.documentElement.scrollTop || 
      document.body.scrollTop || 0;
    // Trigger for scrolls within 20 pixels from page bottom
    return pageHeight - viewportHeight - scrollHeight < 20;
  }

  function checkScroll() {
    if (!lowEnough()) return pollScroll();
    $('spinner').show();
    new Ajax.Updater('posts', 'more.php', {
      method: 'get', insertion: 'bottom',
      onComplete: function() { $('spinner').hide(); },
      onSuccess: pollScroll
    });
  }
  
  function pollScroll() { setTimeout(checkScroll, 100); }
  
  pollScroll();
})();
