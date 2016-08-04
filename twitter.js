var request = require('request');
var async = require("async");

var searchStr = process.argv[2];
var creds = {
  'key': 'Zm3ipLxRCgPG4iM5CmF1YSOQ4',
  'secret': 'qvwwM81ZHDH49aTlFYgjPyBDSAn6ydr8zU5zdYOxMsLB8kqZRf',
};

// auth request
var requestToken = function (callback) {
  var auth = [creds.key, creds.secret].join(':');
  var buf = Buffer.from(auth, 'ascii');
  auth = buf.toString('base64');
  var options = {
    headers: { 'Authorization': 'Basic ' + auth },
    form: {grant_type:'client_credentials'}
  }
  request.post('https://api.twitter.com/oauth2/token', options, callback)
};

var requestSearch = function (resp, body, callback) {
  var access_token = JSON.parse(body).access_token;
  request({
    uri: 'https://api.twitter.com/1.1/search/tweets.json',
    qs: { q: searchStr }
  }, callback).auth(null, null, true, access_token);
};

var printResult = (resp, body, callback) => {
  var statuses = JSON.parse(body).statuses;
  statuses.forEach(function (twitter) {
    console.log(twitter.user.name + "\t" + twitter.text)
  });
};

async.waterfall([
  requestToken,
  requestSearch,
  printResult
]);
