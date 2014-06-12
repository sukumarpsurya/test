/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  var FLICKR_ENDPOINT='http://api.flickr.com/services/feeds/photos_public.gne';
  var FLICKR_USER_ID ='97027332@N00'; // That’s me!
  var item = new Template(
    '<li><a href="#{target}"><img src="#{src}" title="#{title}" /></a></li>');

  function jsonFlickrFeed(data) {
    var stream = $('flickrStream'), d, dateStr;
    data.items.each(function(photo) {
      d = photo.published.split(/\D/);
      dateStr = d[1] + '/' + d[2] + '/' + d[0];
      stream.insert(item.evaluate({
        src: photo.media.m.replace('_m', '_s'), target: photo.link,
        title: 'Published on ' + dateStr + ' GMT'
      }));
    });
    $('indicator').removeClassName('loading').update('Loaded!');
  }
  
  function loadFlickrPhotostream() {
    var uri = FLICKR_ENDPOINT + '?format=json&id=' + FLICKR_USER_ID;
    document.documentElement.firstChild.appendChild(
      new Element('script', { type: 'text/javascript',
        src: uri + '&r=' + Math.random() }));
  }

  window.jsonFlickrFeed = jsonFlickrFeed;
  
  document.observe('dom:loaded', function() {
    $('indicator').addClassName('loading').show();
    loadFlickrPhotostream();
  });
})();