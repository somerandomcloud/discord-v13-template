const { testing } = require('../config.json');
const CommandDeployer = require('../utils/deploy.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		CommandDeployer.setClient(client);

		if(testing === true) {
			await CommandDeployer.loadGuildCommands();
			await CommandDeployer.setPermissions();
		}
		else if(testing === false) {
			await CommandDeployer.loadGlobalCommands();
			await CommandDeployer.setPermissions();
		}
		else if(testing !== true && testing !== false) {return console.log('Set either true or false in config.json in testing');}

		client.user.setActivity('a Trolling Tournament!', { type: 'COMPETING' });

		console.log('The bot has awakened! Run!');
		console.log(`Logged in as: ${client.user.tag}`);
	},
};