const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Collection } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');


class CommandDeployer {
	constructor() {
		this.commands = new Collection();
		this.scommandFolders = fs.readdirSync(__dirname + '/../slashcommands');
		this.commandFiles = fs.readdirSync(__dirname + '/../slashcommands').filter(file => file.endsWith('.js'));

		for (const file of this.commandFiles) {
			const command = require(__dirname + `/../slashcommands/${file}`);
			// Set a new item in the Collection
			// With the key as the command name and the value as the exported module
			this.commands.set(command.data.name, command);
		}

		this.scommandFolders.forEach((x) => {
			const scommandFiles = fs
				.readdirSync(__dirname + `/../slashcommands/${x}`)
				.filter((file) => file.endsWith('.js'));
			scommandFiles.forEach((d) => {
				const scommand = require(__dirname + `/../slashcommands/${x}/${d}`);

				this.commands.set(scommand.data.name, scommand);
			});
		});

		this.slashCommands = this.commands.map(command => command.data.toJSON());

		this.rest = new REST({ version: '9' }).setToken(token);
	}

	setClient(client) {
		this.client = client;
	}

	loadGuildCommands() {
		return new Promise(((resolve, reject) => {
			this.rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: this.slashCommands })
				.then(() => {
					console.log('Successfully registered application commands. (GUILD ONLY)');
					resolve(true);
				})
				.catch(error => {
					reject(error);
					console.error(error);
				});
		}));
	}

	loadGlobalCommands() {
		return new Promise(((resolve, reject) => {
			this.rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: this.slashCommands })
				.then(() => {
					console.log('Successfully registered application commands.(GLOBAL)');
					resolve(true);
				})
				.catch(error => {
					reject(error);
					console.error(error);
				});
		}));
	}

	async setPermissions() {
		const commands = await this.client.guilds.cache.get(guildId)?.commands.fetch();
		for (const command of commands) {
			for (const commandBuilder of this.commands) {
				if (command[1].name === commandBuilder[0]) {
					const matchingCommand = commands.get(command[1].id);
					if (commandBuilder[1]?.permissions) {
						await matchingCommand.permissions.add({ permissions : commandBuilder[1].permissions }).catch(console.error);
						console.log(`command: '${commandBuilder[1]?.data?.name}' | ${commandBuilder[1].permissions.length} permissions set!`);
					}
				}
			}
		}
	}
}

module.exports = new CommandDeployer();