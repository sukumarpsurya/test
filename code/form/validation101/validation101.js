/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  function checkForm(e) {
    var firstOffender, value;
    this.select('.required').each(function(field) {
      value = field.getValue();
      if (value && !value.blank()) {
        field.up('p').removeClassName('missing');
      } else {
        firstOffender = firstOffender || field;
        field.up('p').addClassName('missing');
      }
    });
    if (firstOffender) { e.stop(); firstOffender.focus(); }
  }
  
  document.observe('dom:loaded', function() {
    $('registration').observe('submit', checkForm);
  });
})();