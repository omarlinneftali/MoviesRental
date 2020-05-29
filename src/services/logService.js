import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn:
      "https://085c43539797486fa6d92c84564b8e06@o396914.ingest.sentry.io/5250936",
  });
}

function log(error) {
  console.log(error);
}

export default {
  init,
};
