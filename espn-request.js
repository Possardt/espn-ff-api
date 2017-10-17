const request   = require('request');
const rp        = require('request-promise');
const tough     = require('tough-cookie');
const cookieJar = rp.jar();


function requestToPromise(url, cookies){
  const espnS2 = new tough.Cookie({
    key    : 'espn_s2',
    value  : cookies.espnS2,
    domain : 'espn.com'
  });
  const SWID = new tough.Cookie({
    key    : 'SWID',
    value  : cookies.SWID,
    domain : 'espn.com'
  });

  cookieJar.setCookie(espnS2, 'http://games.espn.com/');
  cookieJar.setCookie(SWID, 'http://games.espn.com/');

  const options = {
    method : 'GET',
    jar    : cookieJar,
    uri    : url,
    json   : true,
    "cache-control": "no-cache"
  };

  return rp(options);
}

module.exports = {
  requestToPromise : requestToPromise
}
