const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Super reserved command only for admin role DO NOT TOUCH!!!!!!11111!!1!!!!!1!11!11')
		.setDefaultPermission(false),
	permissions: [
		{
			id: '1234567890123465',
			type: 'ROLE',
			permission: true,
		},
	],
	async execute(interaction, client) {
		await interaction.reply('*insert cat image*!');
	},
};