const axios = require("axios");
const http = require("http");
const https = require("https");

const httpHttpAgentOpts = {
  keepAlive: true
};
const httpHttpsAgentOpts = {
  keepAlive: true
};

const client = axios.create({
  httpAgent: new http.Agent(httpHttpAgentOpts),
  httpsAgent: new https.Agent(httpHttpsAgentOpts),
  timeout: 60000
});

const httpClient = ({ url, method, body, headers = {}, timeout }) => {
  return client({
    url,
    method,
    ...(body && { data: body }),
    ...(headers && { headers }),
    ...(timeout && { timeout })
  });
};

module.exports = httpClient;
