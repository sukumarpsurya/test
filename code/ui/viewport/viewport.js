/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  function loadKnownComments(e) {
    e.stop();
    var zone = $('extraComments'), ref = zone.next('h3');
    var upd = new Ajax.Request('known_comments.html', {
      method: 'get',
      onSuccess: function(res) {
        var orig = ref.cumulativeOffset().top -
          document.viewport.getScrollOffsets().top;
        zone.insert({ before: res.responseText });
        window.scrollTo(0, ref.cumulativeOffset().top - orig);
      }
    });
  }
  
  document.observe('dom:loaded', function() {
    var loader = $('loadKnownComments');
    loader && loader.observe('click', loadKnownComments);
  });
})();