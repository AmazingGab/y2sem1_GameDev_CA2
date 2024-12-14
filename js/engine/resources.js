// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
    player: new Image(), // The Image instance for the player.
    collectible: new Image(), // The Image instance for the enemy.
    smoothMiddle: new Image(),
    smoothLeft: new Image(),
    smoothRight: new Image(),
    upFinish: new Image()
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


// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles};
