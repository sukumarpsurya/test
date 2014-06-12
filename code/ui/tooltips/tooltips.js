/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  function toggle(reveal, e) {
    var trigger = e.findElement('li'),
      tooltip = trigger && trigger.down('.tooltip');
    if (!tooltip) return;
    tooltip[reveal ? 'show' : 'hide']();
  }
  
  document.observe('dom:loaded', function() {
    var isIE6 = Prototype.Browser.IE &&
      undefined === document.body.style.maxHeight;
    if (!isIE6) return;
    var files = $('files'), tooltips = files && files.select('.tooltip');
    if (!files || 0 == tooltips.length) return;
    tooltips.invoke('hide');
    files.observe('mouseover', toggle.curry(true)).
      observe('mouseout', toggle.curry(false));
  });
})();
