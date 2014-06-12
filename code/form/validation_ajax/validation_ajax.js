/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  var FIELD_PATTERNS = {
    integer: /^\d+$/,
    number: /^\d+(?:\.\d+)?$/,
    email: /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]\.)+[A-Z]{2,6}$/i
  };
  
  function checkField(field) {
    var value = $F(field).toString().strip();
    for (var pattern in FIELD_PATTERNS) {
      if (!field.hasClassName(pattern)) continue;
      if (!FIELD_PATTERNS[pattern].test(value)) return false;
    }
    return true;
  }

  function checkForm(e) {
    var firstOffender, value;
    this.getElements().each(function(field) {
      var line = field.up('p'), value = field.getValue();
      if (value && !value.blank()) {
        line.removeClassName('missing');
        if (checkField(field)) {
          line.removeClassName('invalid');
        } else {
          firstOffender = firstOffender || field;
          line.addClassName('invalid');
        }
      } else if (field.hasClassName('required')) {
        firstOffender = firstOffender || field;
        line.removeClassName('invalid').addClassName('missing');
      }
    });
    if (firstOffender) {
      e.stop(); firstOffender.focus();
    }
  }

  document.observe('dom:loaded', function() {
    $('registration').observe('submit', checkForm);
  });

  document.observe('dom:loaded', function checkLogin() {
    var feedback = $('user_login').next('.feedback'),
      spinner = $('user_login').next('.spinner');
    new Field.Observer('user_login', 0.8, function(_, value) {
      if (value.length < 2) return;
      feedback.hide(); spinner.show();
      new Ajax.Request('check_login.php', {
        method: 'get', parameters: { login: value },
        onComplete: function(res) {
          if (Ajax.activeRequestCount > 1) return;
          if (res.request.success() && res.status) {
            feedback.update('Login available!').removeClassName('ko');
          } else {
            feedback.update('Login taken!').addClassName('ko');
          }
          spinner.hide(); feedback.show();
        },
      });
    });
  });
})();