/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  function loadUsingDF1(e) {
    e.stop(); this.blur();
    var warp = new Element('iframe', { name: '__blackhole' });
    warp.setStyle('width: 0; height: 0; border: 0');
    document.body.appendChild(warp);
    warp.observe('load', function() {
      $('responses').insert('<p>OK, posted.</p>');
    });
    var form = new Element('form', { method: 'post', action: this.href,
      target: '__blackhole' });
    form.submit();
  }
  
  function loadUsingDF2(e) {
    e.stop(); this.blur();
    var form = new Element('form', { method: 'post', action: this.href });
    form.submit();
    Element.insert.defer('responses', '<p>OK, posted.</p>');
  }
  
  function loadUsingSSP(e) {
    e.stop(); this.blur();
    new Ajax.Updater({ success: 'responses' }, 'ssp.php', {
      method: 'get', parameters: { uri: this.href }, insertion: 'bottom'
    });
  }
  
  function loadUsingXHR(e) {
    e.stop(); this.blur();
    new Ajax.Updater({ success: 'responses' }, this.href, {
      method: 'get', insertion: 'bottom'
    });
  }
  
  document.observe('dom:loaded', function() {
    $('triggerXHR').observe('click', loadUsingXHR);
    $('triggerSSP').observe('click', loadUsingSSP);
    $('triggerDF1').observe('click', loadUsingDF1);
    $('triggerDF2').observe('click', loadUsingDF2);
  });
})();