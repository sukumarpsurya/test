/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() { 
  var ICONS = $H({ word: $w('doc docx'), image: $w('jpg jpeg gif png') });
  
  function getFileClass(fileName) {
    var ext = (fileName.match(/\.(.+?)$/) || [])[1].toString().toLowerCase();
    var icon = ICONS.detect(function(pair) { return pair[1].include(ext); });
    return (icon || [])[0];
  }
  
  function handleQueueRemoval(e) {
    var trigger = e.findElement('button');
    trigger && trigger.up('li').remove();
  }
  
  function queueFile() {
    var fileName = $F(this), clone = this.cloneNode(true);
    var item = new Element('li', { 'class': getFileClass(fileName) });
    $(clone).observe('change', queueFile).setValue('');
    this.parentNode.appendChild(clone);
    item.appendChild(this);
    item.appendChild(document.createTextNode(fileName));
    item.insert('<button><img src="remove.png" alt="Remove" /></button>');
    $('uploads').appendChild(item);
  }
  
  document.observe('dom:loaded', function() {
    $('filSelector').observe('change', queueFile);
    $('uploads').observe('click', handleQueueRemoval);
  });
})();