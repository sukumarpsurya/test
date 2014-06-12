/***
 * Excerpted from "Pragmatic Guide to JavaScript",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/pg_js for more book information.
***/
(function() {
  var CHUNK_INTERVAL = 25; // ms.
  var running = false, progress = 0, processTimer;

  function runChunk() {
    window.clearTimeout(processTimer);
    processTimer = null;
    if (!running) return;
    // Some work chunk.  Let's simulate it:
    for (var i = 0; i < 10000; i += (Math.random() * 5).round())
      ;
    ++progress;
    updateUI(); // See source archive -- just updates a progressbar
    if (progress < 100) {
      processTimer = window.setTimeout(runChunk, CHUNK_INTERVAL);
    } else {
      progress = 0, running = false;
    }
  }
  
  function toggleProcessing() {
    running = !running;
    if (running) {
      processTimer = window.setTimeout(runChunk, CHUNK_INTERVAL);
    }
  }
  
  var progressbar, visual, figure;
  
  function updateUI() {
    visual.setStyle('width: ' + progress + '%;');
    progressbar[progress < 50 ? 'removeClassName' : 'addClassName']('over50');
    figure.update(progress + '%');
  }
  
  document.observe('dom:loaded', function() {
    $('btnToggle').observe('click', toggleProcessing);
    $('btnOtherTask').observe('click', function() {
      $$('h1').first().insert(', yeah');
    });
    progressbar = $('progress');
    visual = progressbar.down('.visual');
    figure = progressbar.down('.figure');
  });
})();