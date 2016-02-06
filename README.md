# pgbuilddemo
PhoneGap Build Demo That Makes an Ajax Call, with Content Security Policy configured to permit access to http://reddit.com and https://www.reddit.com

This uses two domains as the Ajax call seems to get redirected and without both the app was failing with CSP errors.

StackOverflow question relating to this repo: http://stackoverflow.com/questions/34032873/will-getjson-work-with-phonegap-build
