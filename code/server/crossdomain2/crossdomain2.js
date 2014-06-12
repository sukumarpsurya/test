/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  
  function loadUsingJSONP(e) {
    e.stop(); this.blur();
    window.jsonpCallback = function jsonpCallback(data) {
      $('responses').update(data.payload.escapeHTML());
    };
    document.documentElement.firstChild.appendChild(
      new Element('script', { type: 'text/javascript',
        src: this.href + '?r=' + Math.random() + '&callback=jsonpCallback' }));
  }
  
  function loadUsingYQLget(e) {
    e.stop(); this.blur();
    window.yqlCallback = function yqlCallback(data) {
      $('responses').update('<ul>' + data.results.map(function(td) {
        return '<li>' + td.replace(/<\/?(?:td|p)[^>]*>/g, '').
          replace(/href="/g, 'href="http://github.com') + '</li>';
      }).join("\n") + '</ul>');
    };
    var url = this.href, xpath = "//*[@class='title']",
      yql = 'select * from html where url="' + url + '" and xpath="' + xpath + '"',
      data = { q: yql, format: 'xml', callback: 'yqlCallback' };
    document.documentElement.firstChild.appendChild(
      new Element('script', { type: 'text/javascript',
        src: 'http://query.yahooapis.com/v1/public/yql?' + Object.toQueryString(data) +
          '&r=' + Math.random()
    }));
  }
  
  function loadUsingYQLpost(e) {
    e.stop(); this.blur();
    window.yqlCallback = function yqlCallback(data) {
      $('responses').update(data.query.results.postresult.p.join("<br/>"));
    };
    var post = Object.toQueryString({ foo: 'foo', bar: 'bar' }),
      url = this.href, xpath = "//p", env = 'store://datatables.org/alltableswithkeys',
      yql = 'select * from htmlpost where url="' + url + '" and postdata="' + post + '"' +
        ' and xpath="' + xpath + '"',
        data = { q: yql, format: 'json', env: env, callback: 'yqlCallback' };
    document.documentElement.firstChild.appendChild(
      new Element('script', { type: 'text/javascript',
        src: 'http://query.yahooapis.com/v1/public/yql?' + Object.toQueryString(data) +
          '&r=' + Math.random()
    }));
  }

  function loadUsingCHR(e) {
    e.stop(); this.blur();
    CSSHttpRequest.get(this.href, function(res) {
      $('responses').insert('<p>' + res.escapeHTML() + '</p>');
    });
  }

  document.observe('dom:loaded', function() {
    $('triggerJSONP').observe('click', loadUsingJSONP);
    $('triggerYQLget').observe('click', loadUsingYQLget);
    $('triggerYQLpost').observe('click', loadUsingYQLpost);
    $('triggerCHR').observe('click', loadUsingCHR);
  });
})();