var ActionStep_BrowserTests = function() {
    this._popupObject;

    this.start = function() {
        this.testCookiesEnabled();
        //this.testAcrobatReaderInstalled(); // Todo - check for chrome plugin.
        // this.testFlashInstalled();
        // this.testPopupsEnabled();
        this.testBrowserVersion();
    }

    this.testBrowserVersion = function() {

        // this is bad

        var ua = navigator.userAgent.toLowerCase();

        if (ua.indexOf('msie') > -1) {
            if ((ua.indexOf('msie 7') > 0) | (ua.indexOf('msie 8') > 0) | (ua.indexOf('msie 9') > 0) | (ua.indexOf('msie 10') > 0)) {
                // old IE - IE11 passes by coincidence because theres no msie in user agent
                this.displayInternetExplorerOutdatedWarning();
            }
        }
        if (ua.indexOf('firefox/1.') > -1 || ua.indexOf('firefox/2.') > -1 || ua.indexOf('firefox/3.') > -1 || ua.indexOf('firefox/4.') > -1) {
            // old firefox
            this.displayFireFoxOutdatedWarning();
        }

        if (ua.indexOf('msie') === -1 && ua.indexOf('trident/7.0') === -1 && ua.indexOf('firefox/') === -1 && ua.indexOf('chrome/') === -1 && ua.indexOf('safari/') === -1) {
            // unsupported browser
            this.displayUnknownBrowserWarning();
        }
    }

    this.displayTabbedBrowsingWarning = function() {
        this.appendWarning("Tabbed browsing does not appear to be enabled on your browser")
    }

    this.appendWarning = function(message) {
        jQuery(".js-browser-warning").show();
        // if (jQuery(".browserWarning").length == 0) {
        //     jQuery('<div class="browserWarning"><ul></ul></div>').appendTo(jQuery(".js-browser-warning"));
        // }
        jQuery("<li>").html(message).appendTo(jQuery(".js-browser-warning ul"));
    }

    this.displayInternetExplorerOutdatedWarning = function() {
        this.appendWarning("Your version of Internet Explorer is out-dated. You might experience display or performance issues in Actionstep using your current browser. <br> Please upgrade to EDGE, IE11+ or perhaps consider switching to <a href='https://www.google.com/chrome'>Google Chrome</a>");
    }

    this.displayFireFoxOutdatedWarning = function() {
        this.appendWarning("Your version of FireFox is out-dated. Please upgrade or change browser to Google Chrome");
    }
    this.displayUnknownBrowserWarning = function() {
        this.appendWarning('You are using a browser which is not a "supported" Actionstep browser (EDGE, IE11+, FireFox, Chrome or Safari).');
    }

    this.displayPopupsDisabledWarning = function() {
        try {
            this._popupObject.close();
        } catch (e) {

        }
        this.appendWarning("Pop-ups do not appear to be enabled. Please check your browser configuration and try again.");
    }

    this.displayCookiesDisabledWarning = function() {
        this.appendWarning("Cookies do not appear to be enabled. Please check your <a target='_blank' href='http://www.wikihow.com/Enable-Cookies-in-Your-Internet-Web-Browser'>browser configuration</a> and try again.");
    }

    this.displayAcrobatReaderWarning = function() {
        this.appendWarning("Acrobat Reader plugin is not enabled. Please check you have Acrobat Reader installed and enabled");
    }

    this.displayFlashWarning = function() {
        this.appendWarning("Flash-Player plugin is not enabled. Please check you have Flash Player installed and enabled");
    }

    this.isChrome = function() {
        return (navigator.userAgent.toLowerCase().indexOf('chrome/') > -1);
    }

    this.isFireFox = function() {
        return (navigator.userAgent.toLowerCase().indexOf('firefox/') > -1);
    }

    this.testPopupsEnabled = function() {
        try {

            var ua = navigator.userAgent.toLowerCase();

            if (ua.indexOf('mobxxile') >= 0) {
                return; // mobile browsers don't work so good either
            }
            if (this.isFireFox() || this.isChrome()) {
                this._popupObject=window.open("about:blank", "dummyPopupWindow"); // should open in a new tab :)
            } else {
                this._popupObject=window.open("about:blank", "dummyPopupWindow"); //, "width=1px,height=1px,scrollbars=no,left=1px,top=1px");
            }

            if (typeof(this._popupObject) == 'undefined') {
                return this.displayPopupsDisabledWarning();
            }

            if (!this._popupObject) {
                this.displayPopupsDisabledWarning();
                return false;
            }

            if (typeof(this._popupObject.closed) == 'undefined') {
                return this.displayPopupsDisabledWarning();
            }

            this._popupObject.document.write('<html><head><script type="text/javascript"' + '> window.setTimeout(function(){window.close();},100); window.testPopups=function() {  return window.innerHeight; }<' + '/script></head><body>&nbsp;</body></html>' );

            window.setTimeout(function() {
                var self=browserTests;
                if (!self._popupObject) {
                    self.displayPopupsDisabledWarning();
                    try {
                        self._popupObject.close();
                    } catch (e) {
                        // ignore
                    }
                    return false;
                }
                var height=self._popupObject.testPopups();
                if (height <= 0) {
                    self.displayPopupsDisabledWarning();
                    try {
                        self._popupObject.close();
                    } catch (e) {
                        // ignore
                    }
                    return false;
                }
                self._popupObject.close();
                if ((height > 200) || (self.isChrome() === true)) {
                    //ok, looks like it opened in a tab.
                } else {
                    self.displayTabbedBrowsingWarning();
                }
            }, 100);

        } catch (e) {
            alert(e.message);
            this.displayPopupsDisabledWarning();
            try {
                self._popupObject.close();
            } catch (e) {
                // ignore
            }
            return false;
        }
    }

    this.testCookiesEnabled = function() {

        var result=false;
        jQuery.cookie('test', true);
        if (jQuery.cookie('test')) {
            result = true
            jQuery.cookie('test', null);
        }
        if (result !== true) {
            this.displayCookiesDisabledWarning();
        }
    }


    this.testAcrobatReaderInstalled = function() {
        if (PluginDetect.isMinVersion('AdobeReader', 0) <= 0) {
            this.displayAcrobatReaderWarning();
        }
    }

    this.testFlashInstalled = function() {
        if (PluginDetect.isMinVersion('Flash', 0) <= 0) {
            this.displayFlashWarning();
        }
    }



};

var browserTests = new ActionStep_BrowserTests();
jQuery(window).ready(function() {
    browserTests.start();
});