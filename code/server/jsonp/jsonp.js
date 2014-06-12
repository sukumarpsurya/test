/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  function injectData(data) {
    var ref = $('sysInfo').down('tbody tr:last-child'), row = new Element('tr'), key;
    ref.select('td').each(function(cell) {
      row.appendChild($(cell.cloneNode(true)).update(data[cell.className]));
    });
    ref.insert({ after: row });
  }
  window.injectData = injectData;
  
  function loadJSONPBasic(e) {
    e.stop(); this.blur();
    document.documentElement.firstChild.appendChild(
      new Element('script', { type: 'text/javascript',
        src: this.href + '&r=' + Math.random() }));
  }
  
  function loadJSONP(e) {
    e.stop(); this.blur();
    var script = new Element('script', { type: 'text/javascript',
      src: this.href });
    script.src += ('&r=' + script.identify());
    script.observe('load', Element.remove.curry(script));
    document.documentElement.firstChild.appendChild(script);
  }
  
  document.observe('dom:loaded', function() {
    $('triggerJSONP').observe('click', loadJSONP);
  });
})();