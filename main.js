const color = require('colors');
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages, MessageContent } = GatewayIntentBits;
const { User, Message, GuildMember } = Partials;

const client = new Client({
	intents: [Guilds, GuildMembers, GuildMessages, MessageContent],
	partials: [User, Message, GuildMember ],
});

client.config = require("./config.json");

client.on('messageCreate', async (message) => {

	const content = message.content

	const prefix = client.config.Prefix;
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (message.channel.id != "781504409418989568") return; // welcome channel id

	if(command === 'kinit') { // expecting ".kinit"
		const piscineux = "782281297925373962"; // piscineux role
		const role = "876614161168207993"; // 42_student role
		const user = message.member.user;
		const login = args[0]; // login of the member
		message.delete(); // deletes member msg/command
		user.roles.remove(piscineux).catch(err => { console.log(err); }); // removes piscineux role to the member
		user.roles.add(role).catch(err => { console.log(err); }); // adds 42_student role to the member
		user.setNickname(login).catch(err => { console.log(err); }); // change member nickname to the login(assuming there are not going to get it wrong or impersonate someone else)
		// then probably fetch the api to set the correct coalition (The Order, Asembly, Federation, Alliance)
		// ...
	}

});

client.on("ready", () => {
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} | ${guild.id} | ${guild.memberCount} members`.brightRed);
	})

	console.log(`${client.user.username} bot is online!`.brightMagenta.bold);
})

client.login(client.config.Token);