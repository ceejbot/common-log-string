var strftime = require('prettydate').strftime;

module.exports = function generateCommonLog(request, response)
{
    var protocol = 'HTTP/' + request.httpVersion;
    var tstamp =  '[' + strftime(new Date(), '%d/%b/%Y:%H:%M:%S %z') + ']';
    var requestline = '"' + [request.method, request.url, protocol].join(' ') + '"';

    return [request.socket.remoteAddress, '-', '-', tstamp, requestline, response.statusCode, '-'].join(' ');
};
