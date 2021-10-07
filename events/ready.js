module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setActivity('a Trolling Tournament!', { type: 'COMPETING' });

		console.log('The bot has awakened');
		console.log(`Logged in as: ${client.user.tag}`);
	},
};