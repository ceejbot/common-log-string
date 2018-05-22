var cls = require('./');

require("must/register");

describe('common-log-string', function()
{
    it('uses request.socket.remoteAddress if no ipHeader provided', function()
    {
        var str = cls({socket: {remoteAddress: '9.9.9.9'}, headers: {}, httpVersion: '1.1'}, {}, {});
        str.must.match(/9\.9\.9\.9 -/)
    });

    it('uses ipHeader if option set and header exists', function()
    {
        var str = cls({socket: {remoteAddress: '9.9.9.9'}, headers: {
          'x-forwarded-for': '8.8.8.8'
        }, httpVersion: '1.1'}, {}, {ipHeader: 'x-forwarded-for'});
        str.must.match(/8\.8\.8\.8 -/)
    });

    it('falls back to remoteAddress if ipHeader not found', function()
    {
        var str = cls(
          {socket: {remoteAddress: '9.9.9.9'}, headers: {}, httpVersion: '1.1'},
          {},
          {ipHeader: 'x-forwarded-for'}
        );
        str.must.match(/9\.9\.9\.9 -/)
    });
    it('falls back to remoteAddress on request object if neither socket nor ipHeader found', function()
    {
        var str = cls(
          {remoteAddress: '9.9.9.9', headers: {}, httpVersion: '1.1'},
          {},
          {ipHeader: 'x-forwarded-for'}
        );
        str.must.match(/9\.9\.9\.9 -/)
    });

    it('falls back to content-length header if no response._data', function()
    {
        var str = cls({remoteAddress: '9.9.9.9', headers: {'content-length': 5432}, httpVersion: '1.1'}, {}, {});
        str.must.match(/5432/)
    });

    it('uses request.start if response._time is unavailable', function()
    {
        var str = cls({remoteAddress: '9.9.9.9', headers: {}, httpVersion: '1.1', start: 1426582929848}, {}, {});
        str.must.match(/Mar\/2015/)
    });

    it('uses request.latency if response._time is unavailable', function()
    {
        var str = cls({remoteAddress: '9.9.9.9', headers: {}, httpVersion: '1.1', latency: 7654}, {}, {});
        str.must.match(/7654 ms/)
    });
});
