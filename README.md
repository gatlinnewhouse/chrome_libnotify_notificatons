**FIXED (Hopefully)**

This repo contains fixes based on Faheem Pervez's review of the extension in the Chrome Store.

I have included their suggested fixes to the code and their review in the README.

Perhaps oneday I will make a MakeFile and PackageBuild and upload this to the AUR.

===
This is a fork of the clone of the code from the Chrome Store, I am not the original author.

Properly support libnotify notifications in Chrome.
===
This is an extension for Chrome in Linux.  It won't do anything for Windows users.

This catches Chrome Webkit notifications from webpages and displays those notifications in native Libnotify (xfce4-notify, notify-osd, etc) popups instead.

This is rewrite of Linux Native Notification for Chrome, which is based on Chromify-OSD.  Both of those solutions only work with selected libnotify servers.  This aims to work with everything based on libnotify.  A list of servers that should work is [here](https://wiki.archlinux.org/index.php/Desktop_notifications)

Also, the previous solutions are based on NPAPI, which is being phased out.  This is a Native Messaging implementation, so you also need to install the "host" portion of this software, which is written in C.  You can download that zip file [here](https://drive.google.com/file/d/0BzOewlVTs_tpdTNFckZKeG5HRE0/edit?usp=sharing).

Installation
===
~~Extract it and run the install.sh.  Hopefully this can be automated in the future.~~

Faheem Pervez said on Aug 28, 2015
```
I actually got this to work on Arch Linux & Chromium 44, but sadly it cannot intercept Chrome notifications created by extensions. To be fair, the author does say "this catches Chrome Webkit notifications from webpages" and my short-sightedness is my own.

If someone does have a need for web notifications then here's how I got this working:

* Make sure libcurl and json-c is installed (and their -dev packages if your distro likes to split them up)

In invoke_notify.c:

* add #include <stdint.h> under the string.h line

* remove the "json/" part from the relevant #include line
```
This is the part I have **already done**. Just clone the repo and follow these instructions:
```
* Build with: gcc -march=native -O2 -pipe -fstack-protector-strong --param=ssp-buffer-size=4 -o invoke_notify `pkg-config --cflags --libs libnotify json-c libcurl` invoke_notify.c

* Open com.initiated.chrome_libnotify_notifications.json and change the extension ID already in there to gphchdpdmccpjmpiilaabhpdfogeiphf

* Get a root shell

If using chromium:
TARGET=/etc/chromium/native-messaging-hosts/

Chrome:
TARGET=/etc/opt/chrome/native-messaging-hosts

* mkdir -p $TARGET

* cd $TARGET

* copy com.initiated.chrome_libnotify_notifications.json and invoke_notify into target

* edit com.initiated.chrome_libnotify_notifications.json and replace HOST_PATH with $TARGET/invoke_notify (perform the expansion manually in your mind)

* make sure the $TARGET directory has 755 permission and is owned by root:root, the json file is 644 and owned by root:root and the invoke_notify binary 755 and root:root
```

~~TODO:~~
===
- make it work with gmail :(

If you are interested, the code base is here:

https://drive.google.com/folderview?id=0BzOewlVTs_tpek54TDVNbFFxWlk&usp=sharing

Want a test?

[Notifications API](http://jsfiddle.net/yoshi6jp/Umc9A/)
[webkitnotifications API](http://0xfe.muthanna.com/notifyme.html)

This depends on libnotify, curl, and json-c

Run `./host/install.sh` to install the host native function manifest file.
