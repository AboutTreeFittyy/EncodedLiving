/* File Name: FirstLevel.js
 * Author: Mathew Boland
 * Last Updated: November 4, 2019
 * Description: This class is used to create the scene for the first level of the game.
 * With the help of other classes it creates the user interface, keybindings, map, saves 
 * progress and makes animations. 
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
import {CST} from "../CST";
import { CharacterSprite } from "../CharacterSprite";
import { EnemySprite } from "../EnemySprite";
import { LevelManager } from "../LevelManager";

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
        //Set listener for p to pause game
        this.input.keyboard.on('keyup-P', ()=>{
            this.scene.launch(CST.SCENES.PAUSE);
            this.scene.pause();
        })
        this.input.keyboard.on('keyup-Y', ()=>{
            this.scene.launch(CST.SCENES.SHOP);
            this.scene.pause();
        })
        //create info cmd prompts on sides
        this.cmd1 = this.add.image(-1000, -1000, CST.IMAGE.CMD).setDepth(1);
        this.cmd1.displayHeight = this.game.renderer.height;
        this.cmd2 = this.add.image(-1000, 1000, CST.IMAGE.CMD).setDepth(1);
        this.cmd2.displayHeight = this.game.renderer.height;
        //now make their text fields
        this.cmd1Text = this.add.text(this.cmd1.x - (this.cmd1.width/2), this.cmd1.y - (this.cmd1.height/2), 'C:/Users/Player/Stats>\n', { fontFamily: '"Roboto Condensed"' }).setDepth(2);
        this.cmd1Text.setColor("green");
        this.cmd2Text = this.add.text(this.cmd2.x - (this.cmd2.width/2), this.cmd2.y - (this.cmd2.height/2), 'C:/Users/Player/Conversations>\n', { fontFamily: '"Roboto Condensed"' }).setDepth(2);
        this.cmd2Text.setColor("green");
        //Create a counter for the lines entered so we can keep track of when they run out
        this.cmd2Lines = 1;
        //add game sprites              
        this.player = new CharacterSprite(this, 400, 400, CST.SPRITE.PLAYER, 130);
        this.player.setCollideWorldBounds(true);
        //align the player hitbox and set its size
        this.player.setSize(32,48);
        this.player.setOffset(16,12);
        //the whip sprite takes any
        this.whip = new CharacterSprite(this, 400, 400, CST.SPRITE.WHIP, 0);
        this.whip.setVisible(false);
        this.whip.setScale(3);
        this.playerCont = this.add.container(0, 0, [this.player, this.whip]).setDepth(1);
        //initialize player and whip to face down at start
        this.player.isFacing = "down";
        this.player.setPosition(this.player.x,this.player.y);
        this.whip.setPosition(this.player.x,this.player.y+70);
        this.input.keyboard.on("keydown-F", ()=>{
            switch(this.player.isFacing){
                case "left":this.playerCont.list[0].play("playerwhipleft");
                this.playerCont.list[1].play("whip_left");
                break;
                case "right":this.playerCont.list[0].play("playerwhipright");
                this.playerCont.list[1].play("whip_right");
                break;
                case "up":this.playerCont.list[0].play("playerwhipup");
                this.playerCont.list[1].play("whip_up");
                break;
                case "down":this.playerCont.list[0].play("playerwhipdown");
                this.playerCont.list[1].play("whip_down");
                break;
            }            
        })
        //set up keyboard controls
        this.keyboard = this.input.keyboard.addKeys("W, A, S, D");

        //Set up tiled map
        let mappy = this.add.tilemap("map1");
        let terrain = mappy.addTilesetImage("sheet1");        
        //layers
        mappy.createStaticLayer("bottom_layer", [terrain], 0, 0).setDepth(-1);
        let topLayer = mappy.createStaticLayer("top_layer", [terrain], 0, 0);
        //map collisions
        this.physics.add.collider(this.player, topLayer);
        topLayer.setCollisionByProperty({collides:true});
        //Add and configure the game objects that are interactive (NPCs/items)
        //this.addObjects(mappy);      
        this.lm = new LevelManager(this, mappy); 
        //have camera follow player around
        this.cameras.add( 0, 0, this.cmd1.displayWidth, this.game.renderer.height, false, "cmd1");
        let cam1 = this.cameras.getCamera("cmd1");
        cam1.centerOn(-1000,-1000);
        //have camera follow player around
        this.cameras.add( this.game.renderer.width-this.cmd2.displayWidth-50, 0, this.cmd2.displayWidth, this.game.renderer.height, false, "cmd2");
        let cam2 = this.cameras.getCamera("cmd2");
        cam2.centerOn(-1000,1000);
        this.cameras.main.startFollow(this.player);
        this.physics.world.setBounds(0,0, mappy.widthInPixels, mappy.heightInPixels);
    }

    

    update(){
        //Play enemy animations and move them as needed
        for(let i = 0; i < this.enemyCont.count('visible', true); i++){
            //check for nerds
            if(this.enemyCont.list[i].name=="nerddown"){
                this.enemyCont.list[i].play("nerd1down", true);
                this.enemyCont.list[i].setVelocityY(90);
            }else if(this.enemyCont.list[i].name=="nerdup"){
                this.enemyCont.list[i].play("nerd1up", true);
                this.enemyCont.list[i].setVelocityY(-90);
            }
            //check for jasons
            if(this.enemyCont.list[i].name=="jason"){
                //have jason look at player general direction unless behind
                if(this.player.y > this.enemyCont.list[i].y+50){
                    //face down
                    this.enemyCont.list[i].setFrame(1);
                }else if(this.player.x > this.enemyCont.list[i].x){
                    //face right to player
                    this.enemyCont.list[i].setFrame(7);
                }else if(this.player.x < this.enemyCont.list[i].x){
                    //face left to player
                    this.enemyCont.list[i].setFrame(4);
                }
                
            }
        }       
        //Set player movement on keypress
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
            this.player.isFacing = "right";
        } else if (this.player.body.velocity.x < 0) { //moving left
            this.whip.setPosition(this.player.x-70,this.player.y+20);
            this.player.play("left", true);
            this.player.isFacing = "left";
        } else if (this.player.body.velocity.y < 0) { //moving up
            this.whip.setPosition(this.player.x,this.player.y-70);
            this.player.play("up", true);
            this.player.isFacing = "up";
        } else if (this.player.body.velocity.y > 0) { //moving down
            this.whip.setPosition(this.player.x,this.player.y+70);
            this.player.play("down", true);
            this.player.isFacing = "down";
        }
    }

	preload(){
        //Make nerd1 sprite
        this.anims.create({
            key: "nerd1left",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.NERD1, {
                start: 5,
                end: 7
            })
        });
        this.anims.create({
            key: "nerd1right",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.NERD1, {
                start: 9,
                end: 11
            })
        });
        this.anims.create({
            key: "nerd1down",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.NERD1, {
                start: 1,
                end: 3
            })
        });
        this.anims.create({
            key: "nerd1up",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.NERD1, {
                start: 13,
                end: 15
            })
        });
        //add in whip attack sprites
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
            frames: this.anims.generateFrameNumbers(CST.SPRITE.WHIPL, {
                start: 0,
                end: 4
            }),
            showOnStart: true,
            hideOnComplete: true
        });
        this.anims.create({
            key: "playerwhipright",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.PLAYER, {
                start: 195,
                end: 200
            })
        });
        this.anims.create({
            key: "whip_right",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.WHIPR, {
                start: 0,
                end: 4
            }),
            showOnStart: true,
            hideOnComplete: true
        });
        //Player whip animation
        this.anims.create({
            key: "playerwhipup",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.PLAYER, {
                start: 156,
                end: 161
            })
        });
        this.anims.create({
            key: "whip_up",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.WHIPU, {
                start: 0,
                end: 4
            }),
            showOnStart: true,
            hideOnComplete: true
        });
        this.anims.create({
            key: "playerwhipdown",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.PLAYER, {
                start: 182,
                end: 187
            })
        });
        this.anims.create({
            key: "whip_down",
            frameRate: 5,
            frames: this.anims.generateFrameNumbers(CST.SPRITE.WHIPD, {
                start: 0,
                end: 4
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
        this.load.tilemapTiledJSON("map1", "./assets/maps/map1.json");
    }
}
