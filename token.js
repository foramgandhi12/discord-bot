if (process.env.NODE_ENV === 'production') {
    module.exports = {TOKEN:process.env.TOKEN, YOUTUBE:process.env.YOUTUBE}
} 
else {
    module.exports = {TOKEN:"", YOUTUBE: ""}
}