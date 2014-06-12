/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  function preloadImages() {
    $$('img[rel="preloadZoom"]').each(function(img) {
      var pimg = new Image();
      pimg.src = img.src.replace(/(\.\w+$)/, '_closeup$1');
    });
  }
  
  document.observe('dom:loaded', preloadImages);

  function togglePreloaded(e) {
    var trigger = e.findElement('img[rel="preloadZoom"]');
    if (!trigger) return;
    if (e.type == 'mouseover') {
      trigger.src = trigger.src.replace(/(\.\w+$)/, '_closeup$1');
    } else {
      trigger.src = trigger.src.replace('_closeup', '');
    }
  }
  
  document.observe('mouseover', togglePreloaded).
    observe('mouseout', togglePreloaded);
})();