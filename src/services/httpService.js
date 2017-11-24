import SHA256 from 'crypto-js/sha256';
import Config from '../config';

function getHeader(requestInfo) {
  let headers = requestInfo.headers;
  if(!headers) {
    headers = {};
    requestInfo.headers = headers;
  }
  return headers;
}

function getToken(provider, timestamp, secretkey) {
  let secretStr = provider + '#' + timestamp + '#' + secretkey;
  return SHA256(secretStr);
}

export default {
  requestWithTimeout(ms, promise) {
    // console.log('requestWithTimeout', ms);
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject({error_message: 'Request timeout'})
      }, ms)
      promise.then(resolve, reject)
    })
  },

  sentRequest(url, requestInfo, timeout = Config.requestTimeout) {
    requestInfo = requestInfo || {};
    // auto add email to header
    let headers = getHeader(requestInfo);
    let timestamp = parseInt(new Date().getTime() / 1000, 10);
    headers["Provider"] = Config.provider;
    headers["Timestamp"] = timestamp;
    headers["Checksum-Token"] = getToken(Config.provider, timestamp, Config.secretkey);

    let promise = fetch(url, requestInfo);
    return this.requestWithTimeout(timeout, promise);
  }
}