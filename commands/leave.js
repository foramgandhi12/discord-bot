const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    description: "Leave the channel",
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel // User's current voice channel

        const connection = getVoiceConnection(message.guild.id);

        if(!connection) return message.channel.send("Not currently connected to a voice channel!")

        connection.destroy();
    }
}