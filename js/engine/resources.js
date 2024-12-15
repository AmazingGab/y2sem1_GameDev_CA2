// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
    smoothMiddle: new Image(),
    smoothLeft: new Image(),
    smoothRight: new Image(),
    upFinish: new Image(),
    checkpoint: new Image(),
    hammer: new Image(),
    hp: new Image()
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
    jump: new Audio('./resources/audios/jump.wav'),
    ouch: new Audio('./resources/audios/ouch.mp3'),
    success: new Audio('./resources/audios/SuccessSound.mp3'),
    music: new Audio('./resources/audios/BackgroundSound.mp3'),
    barrelbreak: new Audio('./resources/audios/BarrelBreak.wav'),
    fail: new Audio('./resources/audios/Fail.mp3'),
    pickup: new Audio('./resources/audios/Pickup.ogg')
};

// Set the source of the enemy image.
Images.smoothMiddle.src = "./resources/images/environment/midsection.png";
Images.smoothLeft.src = "./resources/images/environment/smoothfinishLeft.png";
Images.smoothRight.src = "./resources/images/environment/smoothfinishRight.png";
Images.upFinish.src = "./resources/images/environment/upfinish.png";
Images.checkpoint.src = "./resources/images/checkpoint/checkpoint.png";
Images.hammer.src = "./resources/images/collectible/Hammer.png";
Images.hp.src = "./resources/images/collectible/HealthPack.png";

AudioFiles.music.loop = true;

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles};
