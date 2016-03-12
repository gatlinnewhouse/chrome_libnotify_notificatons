// we can run chrome.runtime.sendMessage anywhere in here, so we have to 
// bubble up what we want to send to load_hook

if (window.Notification) {
        // much easier to override.. just stomp on the function
        window.Notification = function(title, options) {
            // load up our "transfer area"
            document.getElementById('libnotify-notifications-transfer-dom-area').innerText = JSON.stringify({title:title, body:options.body, iconUrl:options.icon});

            // load_hook is listening for "change" on 
            // libnotify-notifications-transfer-dom-area
            // so make a new UI event, call it change, 
            // and then fire it off
            var event = document.createEvent("UIEvents");
            event.initUIEvent("change", true, true);
            document.getElementById('libnotify-notifications-transfer-dom-area').dispatchEvent(event);
        }
} 

if (window.webkitNotifications) {
    // and we have to load the override this way, or it just won't override 
    // webkitNotifications.createNotification
	(function() {
        // we must keep the old ones or we'll get a stack error when
		// we try and override show() below	
		window.webkitNotifications.originalCreateNotification = window.webkitNotifications.createNotification;
		window.webkitNotifications.createNotification = function(iconUrl, title, body) {
			// yes actually override the copy's show.. seem like it
			// shouldn't be this, but it is :)
			var n = window.webkitNotifications.originalCreateNotification(iconUrl, title, body);
			n.show = function() {
				// load up our "transfer area"
				document.getElementById('libnotify-notifications-transfer-dom-area').innerText = JSON.stringify({title:title, body:body, iconUrl:iconUrl});

				// load_hook is listening for "change" on 
				// libnotify-notifications-transfer-dom-area
				// so make a new UI event, call it change, 
				// and then fire it off
				var event = document.createEvent("UIEvents");
				event.initUIEvent("change", true, true);
				document.getElementById('libnotify-notifications-transfer-dom-area').dispatchEvent(event);
			}

			// doesn't matter what we return here, we are eating
			// the original event
			return n;
		}
	})();
}
