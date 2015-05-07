var strftime = require('prettydate').strftime;

module.exports = function generateCommonLog(request, response, options)
{
    var protocol = 'HTTP/' + request.httpVersion;
    var payload_len = response._data ? response._data.length : '-';
    var UA = request.headers['user-agent'] || '-';
    var referer = request.headers['referer'] || '-';
    var tstamp = response._time ? new Date(response._time) : new Date();
    var remote = (options && options.ipHeader ? request.headers[options.ipHeader] : '') ||
                 (request.socket ? request.socket.remoteAddress : '') || '';
    var accepts = request.headers['accept'] || '-';
    var elapsed = response._time ? (Date.now() - response._time) + ' ms' : '';

    var fields = [
        remote.replace('::ffff:', ''), // client ip
        '-',  // RFC 1413, never used
        '-',   // userid as determined by http auth
        '[' + strftime(tstamp, '%d/%b/%Y:%H:%M:%S %z') + ']', // time
        '"' + [request.method, request.url, protocol].join(' ') + '"',
        response.statusCode,
        payload_len,
        '"' + referer + '"',
        '"' + UA + '"',
        '"' + accepts + '"',
        elapsed,
    ];

    return fields.join(' ');
};