/* File Name: FirstLevel.js
 * Author: Mathew Boland
 * Last Updated: November 11, 2019
 * Description: This class is used to create the scene for the first level of the game.
 * With the help of other classes it creates the user interface, keybindings, map, saves 
 * progress and makes animations. 
*/
import {CST} from "../CST";
import { LevelManager } from "../LevelManager";
import { AnimationManager } from "../AnimationManager";
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
        //Set up tiled map
        let mappy = this.add.tilemap("FirstLevel");
        let terrain1 = mappy.addTilesetImage("ground1");
        let terrain2 = mappy.addTilesetImage("ground2"); 
        let terrain3 = mappy.addTilesetImage("ground3");      
        let holster = mappy.addTilesetImage("holster"); 
        let lightwood = mappy.addTilesetImage("lightwood");  
        let fat = mappy.addTilesetImage("fat");   
        //layers
        mappy.createStaticLayer("bottom_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(-1);
        this.furnishing = mappy.createStaticLayer("furnishing", [holster, lightwood, terrain2], 0, 0).setDepth(2);
        this.topLayer = mappy.createStaticLayer("top_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(2);
        this.claireRoom = mappy.createStaticLayer("claireRoom", fat, 0, 0).setDepth(1);
        this.chadRoom = mappy.createStaticLayer("chadRoom", fat, 0, 0).setDepth(1);
        this.vladRoom = mappy.createStaticLayer("vladRoom", fat, 0, 0).setDepth(1);
        this.examRoom = mappy.createStaticLayer("examRoom", fat, 0, 0).setDepth(1);
        //Create the level using this scene and the map made above
        this.lm = new LevelManager(this, mappy); 
        //map collisions
        this.physics.add.collider(this.player, this.topLayer);
        this.physics.add.collider(this.player, this.furnishing);
        //add whip colliders for enemies
        this.physics.add.collider(this.enemySet, this.whip, this.whip.whipHitEnemy, null, this);
        //add colliders for chick blocks        
        this.claireRoom.setCollisionByProperty({collides:true});
        this.chadRoom.setCollisionByProperty({collides:true});
        this.vladRoom.setCollisionByProperty({collides:true});
        this.examRoom.setCollisionByProperty({collides:true});
        this.claireRoomCollider = this.physics.add.collider(this.player, this.claireRoom, this.player.claireBlocked, null, this);
        this.examRoomCollider = this.physics.add.collider(this.player, this.examRoom, this.player.examBlocked, null, this);
        this.chadRoomCollider = this.physics.add.collider(this.player, this.chadRoom, this.player.chadBlocked, null, this);
        this.vladRoomCollider = this.physics.add.collider(this.player, this.vladRoom, this.player.vladBlocked, null, this);        
        //create chick blocks sprites for talking
        this.skinny = new Sprite(this,0,0,CST.SPRITE.FAT,0,0,0,0,"skinny");
        this.medium = new Sprite(this,0,0,CST.SPRITE.FAT,0,0,0,0,"medium");
        this.large = new Sprite(this,0,0,CST.SPRITE.FAT,0,0,0,0,"large");
        this.extralarge = new Sprite(this,0,0,CST.SPRITE.FAT,0,0,0,0,"extralarge");
        //add colliders for terrain
        this.topLayer.setCollisionByProperty({collides:true});  
        this.furnishing.setCollisionByProperty({collides:true});
        //start talk with nicole
        let nicole = this.lm.getNPC("Nicole");
        this.player.scene.keyboard.E.isDown = true;
        nicole.npcSpeak(this.player, nicole);   
        //progress tracking flags
        this.finished1 = false;   
        this.finished2 = false;   
        this.finished3 = false;   
        this.finished4 = false;     
    }   

    /*This progress check, checks the following: If the player has talked to Chad
    * and Kyle. And if the player has reached the first level. Then it gets rid of the
    * blocker to the cooking class. Nicole then informs the player this is available 
    * when the check passes.
    */
    checkProgress1(){
        let chad = this.lm.getNPC("chad");
        let kyle = this.lm.getNPC("Kyle");
        //See if this has been done already, check that all needed conversations are done and player level is high enough
        if(this.finished1 == false && chad.state > 0 && kyle.state > 0 && this.player.knowledgeLevel >= 1){
            let nicole = this.lm.getNPC("Nicole");
            nicole.state = 2;
            //hide blocker and remove their collider
            this.claireRoom.visible = false;
            this.physics.world.removeCollider(this.claireRoomCollider);
            this.player.scene.keyboard.E.isDown = true;
            nicole.npcSpeak(this.player, nicole);  
            this.finished1 = true;
        } 
    }

    /*This blocker checks that the player has talked to Claire, Stevie and Brad. It also checks if the player is level 2 yet.
    * If these conditions are met then it unblocks the exam room and moves Chad to his fighting position there. Nicole then
    * informs the player this is available when the check passes.
    */
    checkProgress2(){
        let stevie = this.lm.getNPC("Stevie");
        let claire = this.lm.getNPC("Claire1");
        let brad = this.lm.getNPC("Brad");
        //See if this has been done already, check that all needed conversations are done and player level is high enough
        if(this.finished2 == false && stevie.state > 0 && claire.state > 0 && brad.state > 0 && this.player.knowledgeLevel >= 2){
            let nicole = this.lm.getNPC("Nicole");
            let chad = this.lm.getNPC("chad");
            nicole.state = 3; //4th state is her at chad fight
            //hide blocker and remove their collider
            this.examRoom.visible = false;
            this.physics.world.removeCollider(this.examRoomCollider);
            this.player.scene.keyboard.E.isDown = true;
            nicole.npcSpeak(this.player, nicole);  
            //Move chad to 6200,4020 in the exam room and set him to fight mode
            chad.x = 6200;
            chad.y = 4020;
            chad.startX = 6200;
            chad.startY = 4020;
            chad.state = 4;
            this.finished2 = true;
        } 
    }

    /*This progress check is for after the first boss fight with Chad, which should open Chads room. This check unlocks 
    * Vlads room if you have talked to Claire2 and Kyle this semester. You also must be level 3 to pass the check.
    * NicoleD informs the player this is available when the check passes.
    */
    checkProgress3(){
        let claire2 = this.lm.getNPC("Claire2");
        let kyle = this.lm.getNPC("Kyle");
        //See if this has been done already, check that all needed conversations are done and player level is high enough
        if(this.finished3 == false && kyle.state > 4 && claire2.state > 1 && this.player.knowledgeLevel >= 3){
            let nicole = this.lm.getNPC("Nicole");
            nicole.state = 2;
            //hide blocker and remove their collider
            this.chadRoom.visible = false;
            this.physics.world.removeCollider(this.chadRoomCollider);
            this.player.scene.keyboard.E.isDown = true;
            nicole.npcSpeak(this.player, nicole);  
            this.finished3 = true;
        } 
    }

    /*This progress check is for unlocking the final exam and boss fight with Vlad. This makes sure you have talked to 
    * Stevie again and Vlad before entering as well as being level 4. NicoleD informs player this is ready when the check passes.
    */
    checkProgress4(){
        let stevie = this.lm.getNPC("Stevie");
        let vlad = this.lm.getNPC("Vlad");
        //See if this has been done already, check that all needed conversations are done and player level is high enough
        if(this.finished4 == false && stevie.state > 4 && vlad.state > 0 && this.player.knowledgeLevel >= 4){
            let nicole = this.lm.getNPC("Nicole");
            nicole.state = 2;
            //hide blocker and remove their collider
            this.vladRoom.visible = false;
            this.physics.world.removeCollider(this.vladRoomCollider);
            this.player.scene.keyboard.E.isDown = true;
            nicole.npcSpeak(this.player, nicole);  
            this.finished4 = true;
        } 
    }

    update(){
        //Play enemy animations and move them as needed
        this.lm.updateSprites();  
        //See if the player can move on to the next level
        this.checkProgress1(); 
        this.checkProgress2(); 
        this.checkProgress3(); 
        this.checkProgress4();    
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
        this.load.image("fat", "./assets/sprite/fat.png");
        this.load.image("lightwood", "./assets/image/lightwood.png");
        this.load.tilemapTiledJSON("FirstLevel", "./assets/maps/FirstLevel.json");
    }
}
