/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  var maxLengths = {};
  
  function bindMaxLengthFeedbacks() {
    var mlClass, maxLength, feedback;
    $$('*[class^=maxLength]').each(function(field) {
      field.up('p').addClassName('lengthFeedback');
      mlClass = field.className.match(/\bmaxLength(\d+)\b/)[0];
      maxLength = parseInt(mlClass.replace(/\D+/g, ''), 10);

      feedback = new Element('span', { 'class': 'feedback' });
      maxLengths[field.identify()] = [maxLength, feedback];
      updateFeedback(field);
      field.observe('keyup', updateFeedback).
        observe('keypress', updateFeedback);

      feedback.clonePosition(field, { setHeight: false,
        offsetTop: field.offsetHeight + 2 });
      field.insert({ after: feedback });
    });
  }
  
  function updateFeedback(e) {
    var field = e.tagName ? e : e.element();
    var current = field.getValue().length,
      data = maxLengths[field.id], max = data[0],
      delta = current < max ? max - current : 0;
    data[1].update('Remaining: ' + delta);
    if (current > max) {
      field.setValue(field.getValue().substring(0, max));
    }
  }

  document.observe('dom:loaded', bindMaxLengthFeedbacks);
})();