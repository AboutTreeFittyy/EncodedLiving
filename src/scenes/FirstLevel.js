/* File Name: FirstLevel.js
 * Author: Mathew Boland
 * Last Updated: October 1, 2019
 * Description: This class is used to create the scene for the first level of the game.
 * With the help of other classes it creates the user interface, keybindings, map, saves 
 * progress and makes animations. 
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
import {CST} from "../CST";
import { CharacterSprite } from "../CharacterSprite";
import { Sprite } from "../Sprite";

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
        
        //add game sprites              
        this.player = new CharacterSprite(this, 400, 400, CST.SPRITE.PLAYER, 130);
        this.player.setCollideWorldBounds(true);
        this.whip = new CharacterSprite(this, 400, 400, CST.SPRITE.WHIP, 3);
        this.whip.setVisible(false);
        this.whip.setScale(3);
        this.playerCont = this.add.container(0, 0, [this.player, this.whip]).setDepth(1);
        this.input.keyboard.on("keydown-F", ()=>{
            this.playerCont.list[0].play("playerwhipleft");
            this.playerCont.list[1].play("whip_left");
        })
        //set up keyboard controls
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

        //Set up tiled map
        let mappy = this.add.tilemap("map1");
        let terrain = mappy.addTilesetImage("sheet1");
        let itemset = mappy.addTilesetImage("itemsall");        
        //layers
        let botLayer = mappy.createStaticLayer("bottom_layer", [terrain], 0, 0).setDepth(-1);
        let topLayer = mappy.createStaticLayer("top_layer", [terrain], 0, 0);
        //map collisions
        this.physics.add.collider(this.player, topLayer);
        topLayer.setCollisionByProperty({collides:true});
        //get interactive object
        let items = mappy.createFromObjects("items", 67, {key: CST.SPRITE.ITEM, frame: 2}).map((sprite)=>{
            sprite.setScale(2);
            sprite.setInteractive();
        });
        //have camera follow player around
        this.cameras.main.startFollow(this.player);
        this.physics.world.setBounds(0,0, mappy.widthInPixels, mappy.heightInPixels);
    }
    update(){
        if (this.keyboard.D.isDown === true) {
            this.player.setVelocityX(128);
        }

        if (this.keyboard.W.isDown === true) {
            this.player.setVelocityY(-128);
        }

        if (this.keyboard.S.isDown === true) {
            this.player.setVelocityY(128);
        }

        if (this.keyboard.A.isDown === true) {
            this.player.setVelocityX(-128);
        }
        if (this.keyboard.A.isUp && this.keyboard.D.isUp) { //not moving on X axis
            this.player.setVelocityX(0);      
        }
        if (this.keyboard.W.isUp && this.keyboard.S.isUp) { //not pressing y movement
            this.player.setVelocityY(0);
        }
        
        //set animations for player
        if (this.player.body.velocity.x > 0) { //moving right
            this.whip.setPosition(this.player.x+70,this.player.y);
            this.player.play("right", true);
        } else if (this.player.body.velocity.x < 0) { //moving left
            this.whip.setPosition(this.player.x-70,this.player.y);
            this.player.play("left", true);
        } else if (this.player.body.velocity.y < 0) { //moving up
            this.whip.setPosition(this.player.x,this.player.y-70);
            this.player.play("up", true);
        } else if (this.player.body.velocity.y > 0) { //moving down
            this.whip.setPosition(this.player.x,this.player.y+70);
            this.player.play("down", true);
        }
    }

	preload(){
        //add in player attack sprites
        this.anims.create({
            key: "playerwhipleft",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.PLAYER, {
                start: 169,
                end: 174
            })
        });

        this.anims.create({
            key: "whip_left",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.WHIP, {
                start: 0,
                end: 5
            }),
            showOnStart: true,
            hideOnComplete: true
        });
        //make player movements
        this.anims.create({
            key: "left",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.PLAYER, {
                start: 117,
                end: 125
            })
        });
        this.anims.create({
            key: "right",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.PLAYER, {
                start: 143,
                end: 151
            })
        });
        this.anims.create({
            key: "up",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.PLAYER, {
                start: 104,
                end: 112
            })
        });
        this.anims.create({
            key: "down",
            frameRate: 10,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.PLAYER, {
                start: 130,
                end: 138
            })
        });
        //load map assets
        this.load.image("sheet1", "./assets/image/sheet1.png");
        this.load.image("itemsall", CST.SPRITE.ITEM);
        this.load.tilemapTiledJSON("map1", "./assets/maps/map1.json");
    }
}
