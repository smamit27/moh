export function generateRandomString(stringLength = 10) {
    let randomString = ''
    let randomAscii;
    let asciiLow = 65;
    let asciiHigh = 90;
    for(let i = 0; i< stringLength; i +=1){
        randomAscii = Math.floor((Math.random() * (asciiHigh-asciiLow)) +asciiLow)
        randomString += String.fromCharCode(randomAscii)
    }
    return randomString

}