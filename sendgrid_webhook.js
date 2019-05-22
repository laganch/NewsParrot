var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'ereretrrfgfgfgt' }, function(err, tunnel) {
  console.log(tunnel.url)
});