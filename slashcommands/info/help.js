const { MessageEmbed } = require('discord.js');
const { botColour } = require('../../config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get all bot commands!')
		.setDefaultPermission(true),
	async execute(interaction, client) {

		const scommands = client.slashcommands;

		const embed = new MessageEmbed()
			.setColor(botColour)
			.setTitle('All Slash Commands');


		function autoDeploy(value) {
			embed.addField(`/${value.name}`, value.description, false);
		}

		scommands.forEach(autoDeploy);

		await interaction.reply({ embeds: [embed] });

	},
};