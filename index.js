var strftime = require('prettydate').strftime;

module.exports = function generateCommonLog(request, response, options)
{
    if (!request || !response) return '';

    options = options || {};

    var protocol = 'HTTP/' + request.httpVersion;
    var payload_len = (response._data && response._data.length) || request.headers['content-length'];
    payload_len = payload_len || '-';

    var UA = request.headers['user-agent'] || '-';
    var referer = request.headers['referer'] || '-';
    var tstamp = (response._time && new Date(response._time)) || (request.start && new Date(request.start));
    tstamp = tstamp || new Date();

    var accepts = request.headers['accept'] || '-';
    var elapsed = (response._time && (Date.now() - response._time)) || request.latency
    elapsed = (elapsed && elapsed + ' ms') || '';

    var remote;

    if (options.ipHeader && request.headers[options.ipHeader])
    {
        remote = request.headers[options.ipHeader];
    }
    else if (request.socket)
    {
        remote = request.socket.remoteAddress;
    }
    else if (request.remoteAddress)
    {
        remote = request.remoteAddress;
    }

    remote = remote || '';

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
