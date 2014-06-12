/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  var FREQUENT_SEARCHES = [
    'JavaScript', 'JavaScript frameworks', 'Prototype', 'jQuery', 'Dojo',
    'MooTools', 'Ext', 'Ext JS', 'script.aculo.us', 'Scripty2', 'Ajax',
    'XHR', '42'
  ];
  
  function initLocalCompletions() {
    var field = $('edtCachedSearch'), zone = field.next('.completions');
    new Autocompleter.Local(field, zone, FREQUENT_SEARCHES, 
	                        { fullSearch: true });
  }
  
  function initAjaxCompletions() {
    var field = $('edtAjaxSearch'), zone = field.next('.completions');
    new Ajax.Autocompleter(field, zone, 'autocomplete.php', {
      method: 'get', paramName: 'search' });
  }

  function customWidthInitAjaxCompletions() {
    var field = $('edtAjaxSearch'), zone = field.next('.completions');
    new Ajax.Autocompleter(field, zone, 'autocomplete.php', {
      // The default onShow callback does all this, but setWidth: true, which
      // will definitely truncate results here…  Still, it's a visual detail
      // irrelevant to the in-book sample code.
      method: 'get', paramName: 'search', onShow: function(element, update){ 
        if(!update.style.position || update.style.position=='absolute') {
          update.style.position = 'absolute';
          Position.clone(element, update, {
            setHeight: false, setWidth: false,
            offsetTop: element.offsetHeight
          });
        }
        Effect.Appear(update,{duration:0.15});
      }
    });
  }

  document.observe('dom:loaded', function() {
    initLocalCompletions();
    customWidthInitAjaxCompletions();
  });
})();