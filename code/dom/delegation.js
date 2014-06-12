/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
document.observe('dom:loaded', function() {
  $('items').observe('click', function(e) { 
    var trigger = e.findElement('a.toggler'); 
    if (!trigger) return;
    e.stop();
    var content = trigger.up('p').next('div');
    if (!content) return;
    content.toggle();
    trigger.update(content.visible() ? 'Close' : 'Open');
    trigger.blur();
  });

  $('items').select('li').each(function(item) {
    item.insert({ top: '<p><a class="toggler" href="#">Open</a></p>' });
    item.down('div').hide();
  });
});