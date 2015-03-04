var strftime = require('prettydate').strftime;

module.exports = function generateCommonLog(request, response)
{
    var protocol = 'HTTP/' + request.httpVersion;
    var payload_len = response._data ? response._data.length : '-';
    var UA = request.headers['user-agent'] || '';
    var referer = request.headers['referer'] || '';

    var fields = [
        request.socket.remoteAddress, // client ip
        '-',  // RFC 1413, never used
        '-',   // userid as determined by http auth
        '[' + strftime(new Date(response._time), '%d/%b/%Y:%H:%M:%S %z') + ']', // time
        '"' + [request.method, request.url, protocol].join(' ') + '"',
        response.statusCode,
        payload_len,
        '"' + referer + '"',
        '"' + UA + '"',
    ];

    return fields.join(' ');
};
