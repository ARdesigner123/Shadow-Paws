export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.liveImage = document.getElementById('lives');
        this.backgroundMusic = document.getElementById("background-music");
        this.victorySound = document.getElementById('victory-sound');  // Load the victory sound
        this.defeatSound = document.getElementById('defeat-sound');  // Load the defeat sound
        this.retryButton = document.getElementById('retry-button');  // Get the retry button image
        this.victoryPlayed = false;  // A flag to ensure the victory sound plays only once
        this.defeatPlayed = false;   // A flag to ensure the defeat sound plays only once

        this.setupRetryButton();
    }

    setupRetryButton() {
        // Add click event listener to retry button image
        this.retryButton.addEventListener('click', () => {
            this.game.reset();  // Assuming you have a reset method in the game class
            this.retryButton.style.display = 'none';  // Hide retry button after clicking
        });
    }

    draw(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText('Score: ' + this.game.score, 20, 50);
        // timer 
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1), 20, 80);
        //lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.liveImage, 25 * i + 20, 95, 25, 25);
        }
        // game over messages
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score > this.game.winningScore) {
                context.fillText('YOU DID IT!!!', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('What are the creatures of the night afraid of? YOU!!!', this.game.width * 0.5, this.game.height * 0.5 + 20);

                // Play the victory sound effect only if it hasn't been played yet
                if (!this.victoryPlayed) {
                    this.victorySound.play();
                    this.backgroundMusic.pause();
                    this.victoryPlayed = true;  // Set the flag to true to prevent replaying
                }
            } else {
                context.fillText('love at first bite?', this.game.width * 0.5, this.game.height * 0.5 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Nope. Better luck next time', this.game.width * 0.5, this.game.height * 0.5 + 20);

                // Play defeat sound effect if not already played
                if (!this.defeatPlayed) {
                    this.defeatSound.play();
                    this.backgroundMusic.pause();
                    this.defeatPlayed = true;  // Ensure it only plays once
                }

                // Show retry button image if the player loses
                this.retryButton.style.display = 'block';
            }
        }
        context.restore();
    }
}