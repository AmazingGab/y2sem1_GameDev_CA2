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
    //jump: './resources/audio/jump.mp3', // The file path of the jump sound.
    //collect: './resources/audio/collect.mp3' // The file path of the collect sound.
    // Add more audio file paths as needed
};

// Set the source of the enemy image.
Images.smoothMiddle.src = "./resources/images/environment/midsection.png";
Images.smoothLeft.src = "./resources/images/environment/smoothfinishLeft.png";
Images.smoothRight.src = "./resources/images/environment/smoothfinishRight.png";
Images.upFinish.src = "./resources/images/environment/upfinish.png";
Images.checkpoint.src = "./resources/images/checkpoint/checkpoint.png";
Images.hammer.src = "./resources/images/collectible/Hammer.png";
Images.hp.src = "./resources/images/collectible/HealthPack.png";


// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles};
