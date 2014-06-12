/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  function preventMultipleSubmits() {
    this.select('.submit').invoke('disable');
  }
  
  document.observe('dom:loaded', function() {
    $('commentForm').observe('submit', preventMultipleSubmits);
  });
  
  function preventMultipleSubmits(e) {
    if (!this.hasClassName('submitting')) {
      e.stop();
    }
    this.addClassName('submitting').select('.submit').invoke('disable');
    var that = this;
    (function() { that.submit(); }).delay(0.1);
  }
})();