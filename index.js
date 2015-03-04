var strftime = require('prettydate').strftime;

module.exports = function generateCommonLog(request, response)
{
    var protocol = 'HTTP/' + request.httpVersion;
    var tstamp =  '[' + strftime(new Date(response._time), '%d/%b/%Y:%H:%M:%S %z') + ']';
    var requestline = '"' + [request.method, request.url, protocol].join(' ') + '"';
    var payload_len = response._data ? response._data.length : '-';

    return [request.socket.remoteAddress, '-', '-', tstamp, requestline, response.statusCode, payload_len].join(' ');
};
