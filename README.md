This is a clone of the code from the Chrome Store, I am not the original author.

Properly support libnotify notifications in Chrome.
===
This is an extension for Chrome in Linux.  It won't do anything for Windows users.

This catches Chrome Webkit notifications from webpages and displays those notifications in native Libnotify (xfce4-notify, notify-osd, etc) popups instead.

This is rewrite of Linux Native Notification for Chrome, which is based on Chromify-OSD.  Both of those solutions only work with selected libnotify servers.  This aims to work with everything based on libnotify.  A list of servers that should work is [here](https://wiki.archlinux.org/index.php/Desktop_notifications)

Also, the previous solutions are based on NPAPI, which is being phased out.  This is a Native Messaging implementation, so you also need to install the "host" portion of this software, which is written in C.  You can download that zip file [here](https://drive.google.com/file/d/0BzOewlVTs_tpdTNFckZKeG5HRE0/edit?usp=sharing).

Installation
===
Extract it and run the install.sh.  Hopefully this can be automated in the future.

TODO:
===
- make it work with gmail :(

If you are interested, the code base is here:

https://drive.google.com/folderview?id=0BzOewlVTs_tpek54TDVNbFFxWlk&usp=sharing

Want a test?

[Notifications API](http://jsfiddle.net/yoshi6jp/Umc9A/)
[webkitnotifications API](http://0xfe.muthanna.com/notifyme.html)

This depends on libnotify, curl, and json-c

Run `./host/install.sh` to install the host native function manifest file.
