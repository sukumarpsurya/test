/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  function loadJSON(e) {
    e.stop(); this.blur();
    new Ajax.Request(this.href, { method: 'get', onSuccess: function(res) {
      var scope = $('sysInfo').down('tbody tr'), data = res.responseJSON, cell;
      for (var key in data) {
        if (cell = scope.down('.' + key)) { // Intentional assign
          cell.update(data[key]);
        }
      }
      scope.highlight({ duration: 0.5 });
    }});
  }

  document.observe('dom:loaded', function() {
    $('triggerJSON').observe('click', loadJSON);
  });
})();