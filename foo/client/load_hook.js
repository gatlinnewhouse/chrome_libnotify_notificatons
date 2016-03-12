//we have chrome. here, but not inside 

// we can't run chrome.runtime.* from the script injection below, so we have to
// pass stuff through the DOM
var transferDOM = document.createElement('div');
transferDOM.setAttribute('id', 'libnotify-notifications-transfer-dom-area');
transferDOM.style.display = 'none';
document.body.appendChild(transferDOM);
document.getElementById('libnotify-notifications-transfer-dom-area').addEventListener('change', function() { 
    j = JSON.parse(this.innerText);
	chrome.runtime.sendMessage({title:j.title, body:j.body, iconUrl:j.iconUrl});
});

// we have to actually load a JS in the DOM and run it or it won't catch 
// webkitNotifications.createNotification
var s = document.createElement("script");
s.src = chrome.extension.getURL("notify_hook.js");
s.type = "text/javascript";
// document.getElementsByTagName("body")[0].appendChild(s);
document.getElementsByTagName("head")[0].appendChild(s);


