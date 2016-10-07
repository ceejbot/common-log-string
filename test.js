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
});
