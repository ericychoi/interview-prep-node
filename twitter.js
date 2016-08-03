var request = require('request');
var creds = {
  'key': 'Zm3ipLxRCgPG4iM5CmF1YSOQ4',
  'secret': 'qvwwM81ZHDH49aTlFYgjPyBDSAn6ydr8zU5zdYOxMsLB8kqZRf',
};
var auth = [creds.key, creds.secret].join(':');
var buf = Buffer.from(auth, 'ascii');
auth = buf.toString('base64');
console.log(auth);

// auth request
var options = {
  headers: { 'Authorization': 'Basic ' + auth },
  form: {grant_type:'client_credentials'}
}

request.post('https://api.twitter.com/oauth2/token', options,
  function (error, response, body) {
    //if (!error && response.statusCode == 200) {
    console.log('err:' + error);
    console.log('resp:' + response);
    console.log('body:' + body);
    //}
  })
