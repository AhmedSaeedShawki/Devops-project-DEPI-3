// metrics.js
const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 }); // cpu, memory, etc.

const register = client.register;

// Custom counters
const urlShortenedCounter = new client.Counter({
  name: 'url_shortened_total',
  help: 'Total number of URLs shortened'
});

const redirectSuccessCounter = new client.Counter({
  name: 'redirect_success_total',
  help: 'Total number of successful redirects'
});

const redirectNotFoundCounter = new client.Counter({
  name: 'redirect_not_found_total',
  help: 'Total number of failed redirects (404)'
});

// Histogram for latency (seconds)
const requestLatency = new client.Histogram({
  name: 'request_latency_seconds',
  help: 'Request latency in seconds',
  labelNames: ['route', 'method'],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

module.exports = {
  client,
  register,
  urlShortenedCounter,
  redirectSuccessCounter,
  redirectNotFoundCounter,
  requestLatency
};

