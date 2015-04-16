plugins.demo = {

    html: null,

    start: function() {
        dashletbase = ('<div class="plugin" id="demo"> \
                <h1>Demo</h1> \
                <div class="lastchange"></div> \
                </div>');
        $('div#body').append(dashletbase);
        $.getScript(base_url + '/plugin/demo/jquery.timeago.js');
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
            lastchange.html('Last change: '+c.toDateString()+' '+c.toTimeString());
        }
        divid = 'demodatadiv'
        escapeddivid = jq( divid ) // To escape any '.', ':' etc.
        var datadiv = $( '#' + escapeddivid )
        var newdatadiv = $('<div id="'+divid+'"><span class="datadata">'+ data['data'] +'</span></div>');
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
function jq( myid ) {
    return myid.replace( /(:|\.|\[|\]|,)/g, "\\$1" );
}
