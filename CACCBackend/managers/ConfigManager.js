const config = require(rootDirectory + '/config.json');

module.exports = class ConfigManager
{
	static async initialize()
	{
		
	}

	static get(key)
	{
		return config[key];
	}
}