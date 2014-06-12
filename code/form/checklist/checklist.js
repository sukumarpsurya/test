/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
// Note: the each+function approach below is due to
// +invoke('writeAttribute', 'checked', this.checked)+
// not working well with manually-(un)checked boxes on
// Safari.

(function() {
  function toggleAllCheckboxes() {
    var scope = this.up('table').down('tbody'), boxes = scope &&
      scope.select('tr input[type="checkbox"]:first-of-type');
    var refChecked = this.checked;
    (boxes || []).each(function(box) { box.checked = refChecked; });
  }
  
  document.observe('dom:loaded', function() {
    $('toggler').observe('click', toggleAllCheckboxes);
  });
})();