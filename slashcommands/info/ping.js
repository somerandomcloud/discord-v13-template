const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Get the bots ping!')
		.setDefaultPermission(true),
	async execute(interaction, client) {
		await interaction.reply(`Pong! The bots websocket ping is ${client.ws.ping}ms!`);
	},
};