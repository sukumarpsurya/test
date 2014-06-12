/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  document.observe('dom:loaded', function() {
    var attr = Prototype.Browser.IE ? 'htmlFor' : 'for';
    function showTooltip() {
      var tooltip = $$('label['+attr+'="'+this.id+'"] .tooltip').first();
      tooltip && tooltip.show();
    }
    function hideTooltip() {
      var tooltip = $$('label['+attr+'="'+this.id+'"] .tooltip').first();
      tooltip && tooltip.hide();
    }
    
    $('registration').getInputs().invoke('observe', 'focus', showTooltip).
      invoke('observe', 'blur', hideTooltip);
  });
})();