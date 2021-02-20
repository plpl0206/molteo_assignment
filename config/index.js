const ENV_DEVELOPMENT = 'development';
const CONFIG_ENV = process.env.CONFIG_ENV || ENV_DEVELOPMENT;

let config = {};

if (CONFIG_ENV === ENV_DEVELOPMENT) {
  config = require('./config.json');
} else {
  config = require(`./config_${CONFIG_ENV}.json`);
}

config.PORT = process.env.PORT || 3000;

module.exports = config;
