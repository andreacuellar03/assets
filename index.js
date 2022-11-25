const core = require("@actions/core");
const flat = require("flat");

try {
  const config_es = require("./config/config-es.json");
  const config_en = require("./config/config.json");
  const en_keys = Object.keys(flat(config_en));
  const es_keys = Object.keys(flat(config_es));

  let not_found_keys = [];
  en_keys.forEach((key) => {
    if (!es_keys.includes(key)) {
      not_found_keys.push(key);
    }
  });

  if (not_found_keys.length > 0) {
    let errorMessage = ``;
    if (not_found_keys.length === 1) {
      errorMessage += `Key: `;
    } else {
      errorMessage += `Keys: `;
    }
    errorMessage += JSON.stringify(...not_found_keys);
    errorMessage += ` not found in config-es.json.`;
    core.setFailed(errorMessage);
  } else {
    core.info("All keys are the same in both config files");
  }
} catch (error) {
  core.setFailed(error.message);
}
