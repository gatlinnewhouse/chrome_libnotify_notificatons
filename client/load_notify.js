var port = null;

// listening in background to pipe this stuff over to our native messaging host
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if(!port) {
        port = chrome.runtime.connectNative('com.initiated.chrome_libnotify_notifications');
        port.onMessage.addListener(function(msg) { console.log(msg); });
        port.onDisconnect.addListener(function() { console.log("Disconnected"); });
    }
    port.postMessage({"title": request.title, "body": request.body, "iconUrl": request.iconUrl});

//    console.log(request);
});

