/* File Name: FirstLevel.js
 * Author: Mathew Boland
 * Last Updated: November 8, 2019
 * Description: This class is used to create the scene for the first level of the game.
 * With the help of other classes it creates the user interface, keybindings, map, saves 
 * progress and makes animations. 
*/
import {CST} from "../CST";
import { LevelManager } from "../LevelManager";
import { AnimationManager } from "../AnimationManager";

export class FirstLevel extends Phaser.Scene{
    
    constructor(){
		super({
			key: CST.SCENES.FIRSTLEVEL
		})
    }
    
	create(){
        //start up the theme for level, commenting out now cause its annoying 
		/*this.sound.play(CST.AUDIO.THEME1, {
			loop: true
        })*/       
        //Set up tiled map
        let mappy = this.add.tilemap("FirstLevel");
        let terrain1 = mappy.addTilesetImage("ground1");
        let terrain2 = mappy.addTilesetImage("ground2"); 
        let terrain3 = mappy.addTilesetImage("ground3");      
        let holster = mappy.addTilesetImage("holster"); 
        let lightwood = mappy.addTilesetImage("lightwood");    
        //layers
        mappy.createStaticLayer("bottom_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(-1);
        this.furnishing = mappy.createStaticLayer("furnishing", [holster, lightwood, terrain2], 0, 0).setDepth(2);
        this.topLayer = mappy.createStaticLayer("top_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(2);
        //Create the level using this scene and the map made above
        this.lm = new LevelManager(this, mappy); 
        //map collisions
        this.physics.add.collider(this.player, this.topLayer);
        this.physics.add.collider(this.player, this.furnishing);
        //add whip colliders for enemies
        this.physics.add.collider(this.enemySet, this.whip, this.whip.whipHitEnemy, null, this);
        this.topLayer.setCollisionByProperty({collides:true});  
        this.furnishing.setCollisionByProperty({collides:true});        
    }   

    update(){
        //Play enemy animations and move them as needed
        this.lm.updateSprites();      
        //Make sure the player isnt attacking before moving him
        if(!this.player.state){
            //Set player movement on keypress
            if (this.keyboard.D.isDown === true) {
                this.player.setVelocityX(512);
            }
            if (this.keyboard.W.isDown === true) {
                this.player.setVelocityY(-512);
            }
            if (this.keyboard.S.isDown === true) {
                this.player.setVelocityY(512);
            }
            if (this.keyboard.A.isDown === true) {
                this.player.setVelocityX(-512);
            }
            if (this.keyboard.A.isUp && this.keyboard.D.isUp) { //not moving on X axis
                this.player.setVelocityX(0);      
            }
            if (this.keyboard.W.isUp && this.keyboard.S.isUp) { //not pressing y movement
                this.player.setVelocityY(0);
            }        
            //set animations for player
            if (this.player.body.velocity.x > 0) { //moving right
                this.player.play("right", true);
                this.player.isFacing = "right";
            } else if (this.player.body.velocity.x < 0) { //moving left
                this.player.play("left", true);
                this.player.isFacing = "left";
            } else if (this.player.body.velocity.y < 0) { //moving up
                this.player.play("up", true);
                this.player.isFacing = "up";
            } else if (this.player.body.velocity.y > 0) { //moving down
                this.player.play("down", true);
                this.player.isFacing = "down";
            }
        }
    }

	preload(){
        //Load all the levels animations through the animation manager
        this.am = new AnimationManager(this);
        this.am.setAnimations();        
        //load map assets
        this.load.image("ground1", "./assets/image/ground1.png");
        this.load.image("ground2", "./assets/image/ground2.png");
        this.load.image("ground3", "./assets/image/ground3.png");
        this.load.image("holster", "./assets/image/holster.png");
        this.load.image("lightwood", "./assets/image/lightwood.png");
        this.load.tilemapTiledJSON("FirstLevel", "./assets/maps/FirstLevel.json");
    }
}
