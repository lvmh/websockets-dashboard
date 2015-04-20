plugins.demo = {

  html: null,

  start: function() {
    dashletbase = ('<div class="plugin" id="demo"> \
                <h1>Demo</h1> \
                <div class="lastchange"></div> \
                </div>');
    $('div#body').append(dashletbase);
    $.getScript(base_url + '/plugin/demo/jquery.timeago.js');

    // Stale Content Plugin
    // #demo = wrapping div for content
    // .fadeTo(20000, "0.33"); replace 20000 with the amount of time in MS that you want it to take before it goes stale
    // on Dom update, sets opacity back to 1 (in case it is stale), then initiates a timer to make the content stale. 1 day = 86400000, 5 minutes = 300000

    $('#demo').bind("DOMSubtreeModified", function() {
      $(this).css("opacity", "1").stop().fadeTo(20000, "0.33");
    });
  },

  receiveData: function(data) {
    // Check for an array message (is array?)
    if ($.isArray(data)) {
      // Only care about the newest message
      data = data.pop();
    }

    var dashletdiv = $('div#demo');
    var existing = $('li', dashletdiv).clone();


    // Last change
    var lastchange = $('div.lastchange', dashletdiv);
    if (data['lastchange']) {
      var c = new Date();
      c.setTime(data['lastchange'] * 1000);
      lastchange.html('Last change: ' + c.toDateString() + ' ' + c.toTimeString());
    }
    divid = 'demodatadiv'
    escapeddivid = jq(divid) // To escape any '.', ':' etc.
    var datadiv = $('#' + escapeddivid)
    var newdatadiv = $('<div id="' + divid + '"><span class="datadata">' + data['data'] + '</span></div>');
    if (datadiv.length == 0) {
      // There was no div of that id in dashletdiv.
      // Create one.
      dashletdiv.append(newdatadiv) // Put the new div at the end of the dashlet content.
    } else {
      // Clear out the existing one.
      datadiv.replaceWith(newdatadiv)
    }
    datadiv = newdatadiv
  }
}

// Escape dom 'id' values - replace '.' with '\\.'.
function jq(myid) {
  return myid.replace(/(:|\.|\[|\]|,)/g, "\\$1");
}