# common-log-string

Dead stupid function to generate a common-log-format-ish string from request & response objects. Not guaranteed to work with anything other than node-restify.

I wrote this because I wanted something that didn't attempt to write things to a log file and could be plugged into restify as middleware.

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

## LICENSE

ISC.
