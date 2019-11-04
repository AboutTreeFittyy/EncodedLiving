/* File Name: FirstLevel.js
 * Author: Mathew Boland
 * Last Updated: November, 2019
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
        //Set listener for p to pause game
        this.input.keyboard.on('keyup-P', ()=>{
            this.scene.launch(CST.SCENES.PAUSE);
            this.scene.pause();
        })
        //create info cmd prompt on side
        this.cmd = this.add.image(-500, -500, CST.IMAGE.CMD).setDepth(1);
        this.cmd.displayHeight = this.game.renderer.height;
        this.cmd.displayWidth = this.game.renderer.width * 0.3;
        //cmd.setPosition(0,0);
        //add game sprites              
        this.player = new CharacterSprite(this, 400, 400, CST.SPRITE.PLAYER, 130);
        this.player.setCollideWorldBounds(true);
        //align the player hitbox and set its size
        this.player.setSize(32,48);
        this.player.setOffset(16,12);
        //the whip sprite takes any
        this.whip = new CharacterSprite(this, 400, 400, CST.SPRITE.WHIP, 3);
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
        this.addObjects(mappy);       
        //have camera follow player around
        this.cameras.add( 0, 0, 365, this.game.renderer.height, false, "cmd");
        let cam = this.cameras.getCamera("cmd");
        cam.centerOn(-500,-500);
        this.cameras.main.startFollow(this.player);
        this.physics.world.setBounds(0,0, mappy.widthInPixels, mappy.heightInPixels);
    }

    addObjects(map){
        //get interactive objects from the map
        let itemSet = this.physics.add.group();
        map.createFromObjects("items", 67, {key: CST.SPRITE.ITEM, frame: 2}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            itemSet.add(sprite);
            sprite.setSize(32,32);
            sprite.body.setOffset(0,0);
        });
        //add the collider for all the items
        this.physics.add.collider(this.player, itemSet, this.player.collectItem, null, this);
        //make npcs
        let npcSet = this.physics.add.group();
        map.createFromObjects("npcs", 69, {key: CST.SPRITE.NPCS, frame: 0}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            npcSet.add(sprite);
            sprite.setScale(1.5);
            sprite.name = "Nicole";
            sprite.setSize(128,240);
            sprite.body.setOffset(0,0);
            sprite.body.immovable = true;
        });
        //add the collider for all the items
        this.physics.add.collider(this.player, npcSet, this.player.npcSpeak, null, this);
        map.createFromObjects("npcs", 71, {key: CST.SPRITE.NPCS, frame: 2}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            npcSet.add(sprite);
            sprite.setScale(1.5);
            sprite.name = "Hannah";
            sprite.setSize(128,240);
            sprite.body.setOffset(0,0);
            sprite.body.immovable = true;
        });
        //add the collider for all the items
        this.physics.add.collider(this.player, npcSet, this.player.npcSpeak, null, this);
        //add the collider for all the items
        this.physics.add.collider(this.player, npcSet, this.player.npcSpeak, null, this);
        map.createFromObjects("npcs", 72, {key: CST.SPRITE.NPCS, frame: 3}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            npcSet.add(sprite);
            sprite.setScale(1.5);
            sprite.name = "Claire";
            sprite.setSize(128,240);
            sprite.body.setOffset(0,0);
            sprite.body.immovable = true;
        });
        //add the collider for all the items
        this.physics.add.collider(this.player, npcSet, this.player.npcSpeak, null, this);
        map.createFromObjects("npcs", 73, {key: CST.SPRITE.NPCS, frame: 4}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            npcSet.add(sprite);
            sprite.setScale(1.5);
            sprite.name = "Stevie";
            sprite.setSize(128,240);
            sprite.body.setOffset(0,0);
            sprite.body.immovable = true;
        });
        //add the collider for all the items
        this.physics.add.collider(this.player, npcSet, this.player.npcSpeak, null, this);
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
        //this.cmd.setPosition(this.player.x - 420,this.player.y);
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
