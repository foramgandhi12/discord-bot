const { YOUTUBE } = require('../token')
const ytdl = require('ytdl-core');
const YouTube = require("discord-youtube-api") 
const youtube = new YouTube(YOUTUBE) 
const { createAudioResource, createAudioPlayer, joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'play',
    description: "Play Song Command",
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel //User's current voice channel

        if (!voiceChannel) return message.channel.send('You need to be in a channel to use this command!') //Reply to user if not in a voice channel
        const permissions = voiceChannel.permissionsFor(message.client.user); //Gather user's permissions
        if (!permissions.has('CONNECT')) return message.channel.send("You don't have the correct permissions!") //Check if user has connect permissions
        if (!permissions.has('SPEAK')) return message.channel.send("You don't have the correct permissions!") //Check if user has speak permissions
        if (!args.length) return message.channel.send("Please include a search query!") //Check if user entered a query after command

        const videoFinder = async (query) => { 
            const videoResult = await youtube.searchVideos(query) //Will use library to find a video from query
            return videoResult //Return the result 
        }

        const video = await videoFinder(args.join(' ')) //Call videoFinder function with query

        const player = createAudioPlayer(); //Create an audio player

        const connection = joinVoiceChannel({ //Join the channel the user is in
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        }).subscribe(player)

        if (video) { //If video is found
            let resource = createAudioResource(ytdl(video.url, { filter: 'audioonly' })) //Convert the youtube video to a audio only format and create audio resource from it
            player.play(resource) //Player the resource
            await message.reply(`Now playing **${video.title}**`) //Send message that the requested video is now playing
        } else {
            message.channel.send('No video results found') //Otherwise no videos found
        }
    }
}