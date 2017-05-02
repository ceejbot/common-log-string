# common-log-string

[![Greenkeeper badge](https://badges.greenkeeper.io/ceejbot/common-log-string.svg)](https://greenkeeper.io/)

Dead stupid function to generate a common-log-format-ish string from request & response objects. Not guaranteed to work with anything other than node-restify.

[![on npm](http://img.shields.io/npm/v/common-log-string.svg?style=flat)](https://www.npmjs.org/package/common-log-string)  [![Tests](http://img.shields.io/travis/ceejbot/common-log-string.svg?style=flat)](http://travis-ci.org/ceejbot/common-log-string)

I wrote this because I wanted something that didn't attempt to write things to a log file and could be plugged into restify as middleware. Sample output:

```
- - [12/Mar/2015:08:54:46 -0700] "GET /_monitor/ping HTTP/1.1" 200 6 "" "HTTPie/0.8.0"
```

How to use:

```javascript
var restify = require('restify');
var logstring = require('common-log-string');

var server = restify.createServer();
server.on('after', request, response, route, error)
{
    var output = logstring(request, response);
    request.logger.info(output);
});
```

Order of fields:

1. client ip
1. client id as per RFC 1413; (unfilled)
1. userid as determined by http auth (unfilled by this implementation)
1. timestamp
1. http request line
1. response status code
1. length of response body, if available
1. referrer string, from request headers
1. user agent string, from request headers
1. accept string, from request headers
2. elapsed time in milliseconds

The second to last is non-standard but useful.

## Options

You may optionally pass an options object as the third parameter to the function. One option is currently respected:

`ipHeader`: report the client IP from this header instead of the address of the remote socket. Useful if you wish to log X-Forwarded-For IPs instead of the IP of an intermediate proxy.

## LICENSE

ISC.
