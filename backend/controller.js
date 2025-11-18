// controller.js
const { Url, GenCount, RedCount } = require("./model");
const { nanoid } = require("nanoid");
const metrics = require("./metrics");

// Helper to measure route latency
function observeLatency(route, method, start) {
  const diff = (Date.now() - start) / 1000; // seconds
  metrics.requestLatency.labels(route, method).observe(diff);
}

exports.shortenLink = async (req, res) => {
  const start = Date.now();
  try {
    const long_url = req.body.long_url;
    if (!long_url) return res.status(400).json({ message: "long_url required" });

    const shorten_text = nanoid(7);
    const short_url = `${req.protocol}://${req.get("host")}/${shorten_text}`;

    await Url.create({ long_url, short_url, shorten_text });

    // Update GenCount collection (optional backup counter)
    let counter = await GenCount.findOne();
    if (!counter) counter = await GenCount.create({ count: 1 });
    else {
      counter.count += 1;
      await counter.save();
    }

    // Prometheus counter
    metrics.urlShortenedCounter.inc();

    res.json({ short_url, shorten_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Error" });
  } finally {
    observeLatency('/shorten', 'POST', start);
  }
};

exports.getgencount = async (req, res) => {
  const data = await GenCount.findOne();
  res.json({ count: data?.count || 0 });
};

exports.getredcount = async (req, res) => {
  const data = await RedCount.findOne();
  res.json({ count: data?.count || 0 });
};

exports.redirectLink = async (req, res) => {
  const start = Date.now();
  try {
    const text = req.params.text;
    const obj = await Url.findOne({ shorten_text: text });
    if (!obj) {
      metrics.redirectNotFoundCounter.inc();
      return res.status(404).json({ message: "URL Not Found" });
    }

    // Update RedCount collection
    let counter = await RedCount.findOne();
    if (!counter) counter = await RedCount.create({ count: 1 });
    else {
      counter.count += 1;
      await counter.save();
    }

    // Prometheus counter
    metrics.redirectSuccessCounter.inc();

    // Redirect
    res.redirect(obj.long_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Error" });
  } finally {
    observeLatency('/{short}', 'GET', start);
  }
};

