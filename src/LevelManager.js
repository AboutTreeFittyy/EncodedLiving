/* File Name: LevelManager.js
 * Author: Mathew Boland
 * Last Updated: November 12, 2019
 * Description: A class to build a levels animations and sprites for the game
 * given the map and scene.
*/
import {CST} from "./CST";
import { Sprite } from "./Sprite";
import { EnemySprite } from "./EnemySprite";
import { CharacterSprite } from "./CharacterSprite";
export class LevelManager{
    
    constructor(scene, map) {
        this.scene = scene;
        this.map = map;
        this.setPlayer();
        this.setObjects();
        this.setCMDS();
        this.setCameras();
        this.setInputs();
    }

    //returns the npc from the container of the given name
    getNPC(name){
        for(let i = 0; i < this.scene.npcCont.count('visible', true); i++){
            if(this.scene.npcCont.list[i].name == name){
                return this.scene.npcCont.list[i];
            }
        }
        return null;
    }

    spawnProjectile(x, y, cst, st, name, rep, dmg, size, time, sprite){
        let projectile = new EnemySprite(this.scene, x, y, cst, st, name, rep, dmg).setDepth(5);
        //Make projectile hit walls and players.
        this.scene.physics.add.collider(this.scene.player, projectile, projectile.projectileHitPlayer, null, this.scene);
        this.scene.physics.add.collider(this.scene.topLayer, projectile, projectile.projectileHitWall, null, this.scene);
        projectile.setScale(size);
        //Make timer to destroy projectile after certain amount of time.
        this.scene.time.delayedCall(time, projectile.projectileTimeOut, [projectile, sprite], this.scene);
        return projectile;
    }

    updateSprites(){
        //Scan through all the NPCs to update them
        for(let i = 0; i < this.scene.npcCont.count('visible', true); i++){
            let go = this.scene.npcCont.list[i];
            switch(go.name){
                case "Nicole":
                case "NicoleD":
                    this.followPlayer(go);
                    break;
                case "Kyle":
                case "Claire1":
                case "Claire2":
                case "Brad":
                case "Prof":
                case "Stevie":       
                    //Now check if they've been pushed from their origin and make them face the player
                    this.watchPlayer(go, go.down, go.up, go.right, go.left);
                case "chad":                   
                    if(go.state < 5){
                        //Now check if they've been pushed from their origin and make them face the player
                        this.watchPlayer(go, go.down, go.up, go.right, go.left);
                    }    
                    //Check if chad is currently an enemy and needs to attack the player
                    if(go.state == 5){
                        //Timer has reset chad state to 5. Have him attack.
                        /*for(var i = -2; i < 3; i++){
                            this.spawnProjectile(go.x, go.y + (i * 160), CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
                        }*/
                        this.spawnProjectile(go.x, go.y + 100, CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
                        this.spawnProjectile(go.x, go.y -100, CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
                        go.play("chadFlex", true);                        
                        //Set flag to 6 so he doesn't attack again.
                        go.state = 6;
                        //Set new timer to make him attack again in 2 seconds.
                        this.scene.time.delayedCall(2000, go.chadAttack, [this.scene.player, go], this.scene);
                    }else{
                        //Keep him in the right area, don't let him be pushed out of bounds
                        if(go.startY - 50 > go.y){
                            go.setVelocityY(128);
                        }else if (go.startY + 50 < go.y){
                            go.setVelocityY(-128);
                        }else{
                            go.setVelocityY(0);
                        }
                        if(go.startX - 50 > go.x){
                            go.setVelocityX(128);
                        }else if (go.startX + 50 < go.x){
                            go.setVelocityX(-128);
                        }else{
                            go.setVelocityX(0);
                        }
                    }
                    break
            }
        } 
        //Scan through all the enemy objects to update them
        for(let i = 0; i < this.scene.enemyCont.count('visible', true); i++){
            let go = this.scene.enemyCont.list[i];
            switch(go.name){
                case "nerd1down":
                    go.play("nerd1down", true);
                    go.setVelocityY(90);
                    break;
                case "nerd1up":
                    go.play("nerd1up", true);
                    go.setVelocityY(-90);
                    break;
                case "nerd1left":
                        go.play("nerd1left", true);
                        go.setVelocityX(-90);
                        break;
                case "nerd1right":
                        go.play("nerd1right", true);
                        go.setVelocityX(90);
                        break;
                case "nerd2down":
                    go.play("nerd2down", true);
                    go.setVelocityY(90);
                    break;
                case "nerd2up":
                    go.play("nerd2up", true);
                    go.setVelocityY(-90);
                    break;
                case "nerd2left":
                        go.play("nerd2left", true);
                        go.setVelocityX(-90);
                        break;
                case "nerd2right":
                        go.play("nerd2right", true);
                        go.setVelocityX(90);
                        break;
                case "jason":
                    //Now check if they've been pushed from their origin
                    this.watchPlayer(go, 4, 40, 28, 16);        
                    //get the difference of the player and jason coordinates
                    let x = this.scene.player.x - go.x;
                    let y = this.scene.player.y - go.y;            
                    //check if jason can project another json or if he's close enough to
                    if(go.jsons > 0 && Math.abs(x) < 250 && Math.abs(y) < 250){
                        go.jsons--;
                        //create the new ball sprite to throw, with colliders and a timer to destroy it on contact or no contact
                        let randTime = this.randomNum(1000, 3000);
                        let json = this.spawnProjectile(go.x, go.y, CST.SPRITE.JSON, 0, 'json', 1, 1, .5, randTime, go);                      
                        //get random speeds
                        let randX = this.randomNum(1, 256);
                        let randY = this.randomNum(1, 256);
                        //Aim for the player general area using their coordinates as reference for scatter shot
                        if(x > 0 && y > 0){
                            //to the right & below
                            json.setVelocityX(randX);
                            json.setVelocityY(randY);
                        }else if(x < 0 && y > 0){
                            //to left and below
                            json.setVelocityX(-randX);
                            json.setVelocityY(randY);
                        }else if(x < 0 && y < 0){
                            //to left and above
                            json.setVelocityX(-randX);
                            json.setVelocityY(-randY);
                        }else{
                            //to right and above
                            json.setVelocityX(randX);
                            json.setVelocityY(-randY);
                        }
                    }
                    
                    break;
                case "nerdgirl":
                    //Now check if they've been pushed from their origin
                    this.watchPlayer(go, 2, 12, 8, 4);
                    break;
            }
        } 
    }

    randomNum(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    followPlayer(go){
        let anim = 'nothing';
        //Have her follow the player around                                      
        if(this.scene.player.y - 150 > go.y){
            //player below
            go.setVelocityY(256);
            anim = "down";
        }else if (this.scene.player.y + 150 < go.y){
            //player above
            go.setVelocityY(-256);
            anim = "up";
        }else{
            go.setVelocityY(0);
        }
        if(this.scene.player.x - 150 > go.x){
            //player in front
            go.setVelocityX(256);
            anim = "right";
        }else if (this.scene.player.x + 150 < go.x){
            //player behind
            go.setVelocityX(-256);
            anim = "left";
        }else{
            go.setVelocityX(0);
        }
        if(anim != "nothing"){
            go.play(go.name + anim, true);
        }
    }

    watchPlayer(go, down, up, right, left){
        let anim = "nothing";
        if(go.startY - 50 > go.y){
            //npc below
            go.setVelocityY(128);
            anim = "down";
        }else if (go.startY + 50 < go.y){
            //npc above
            go.setVelocityY(-128);
            anim = "up";
        }else{
            go.setVelocityY(0);
        }
        if(go.startX - 50 > go.x){
            //npc in front
            go.setVelocityX(128);
            anim = "right";
        }else if (go.startX + 50 < go.x){
            //npc behind
            go.setVelocityX(-128);
            anim = "left";
        }else{
            go.setVelocityX(0);
        }
        if(anim != "nothing"){
            go.play(go.name + anim, true);
        }else{
            //have npc look at player general direction unless behind
            if(this.scene.player.y > go.y+25){
                //face down
                go.setFrame(down);                        
            }else if(this.scene.player.y < go.y-100){
                //face up
                go.setFrame(up);
            }else if(this.scene.player.x > go.x){
                //face right to player
                go.setFrame(right);
            }else if(this.scene.player.x < go.x){
                //face left to player
                go.setFrame(left);
            }
        }
    }

    setPlayer(){
        //add game sprites              
        this.scene.player = new CharacterSprite(this.scene, 700, 4100, CST.SPRITE.PLAYER, 143).setDepth(1);
        //align the player hitbox and set its size
        this.scene.player.setSize(32,48);
        this.scene.player.setOffset(16,12);
        //the whip sprite takes any
        this.scene.whip = new CharacterSprite(this.scene, 0, 0, CST.SPRITE.WHIP, 0).setDepth(1);
        this.scene.whip.setVisible(false);
        this.scene.whip.setScale(3);
        //initialize player and whip to face down at start
        this.scene.player.isFacing = "down";
        this.scene.player.setPosition(this.scene.player.x,this.scene.player.y);
        //Set timer to decrement willpower by 1 every 15 seconds
        this.scene.time.delayedCall(15000, this.scene.player.decrementWill, [this.scene.player], this.scene);
    }

    setCMDS(){
        //create info cmd prompts on sides
        this.scene.cmd1 = this.scene.add.image(-1000, -1000, CST.IMAGE.CMD).setDepth(1);
        this.scene.cmd1.displayHeight = this.scene.game.renderer.height;
        this.scene.cmd2 = this.scene.add.image(-1000, 1000, CST.IMAGE.CMD).setDepth(1);
        this.scene.cmd2.displayHeight = this.scene.game.renderer.height;
        //now make their text fields
        this.scene.cmd1Text = this.scene.add.text(this.scene.cmd1.x - (this.scene.cmd1.width/2), this.scene.cmd1.y - (this.scene.cmd1.height/2), '', { fontFamily: '"Roboto Condensed"' }).setDepth(7);
        this.scene.player.displayInventory();
        this.scene.cmd1Text.setColor("green");
        this.scene.cmd2Text = this.scene.add.text(this.scene.cmd2.x - (this.scene.cmd2.width/2), this.scene.cmd2.y - (this.scene.cmd2.height/2), 'C:/Users/Player/Conversations>\n', { fontFamily: '"Roboto Condensed"' }).setDepth(7);
        this.scene.cmd2Text.setColor("green");
        //Create a counter for the lines entered so we can keep track of when they run out
        this.scene.cmd1Lines = 1;
        this.scene.cmd2Lines = 1;
    }

    setInputs(){
        //set up keyboard controls
        this.scene.keyboard = this.scene.input.keyboard.addKeys("W, A, S, D, E");
        //Set listener for p to pause game
        this.scene.input.keyboard.on('keyup-P', ()=>{
            this.scene.scene.launch(CST.SCENES.PAUSE);
            this.scene.scene.pause();
        })
        this.scene.input.keyboard.on('keyup-Y', ()=>{
            this.scene.scene.launch(CST.SCENES.SHOP);
            this.scene.scene.pause();
        })
        //Adjust zoom out
        this.scene.input.keyboard.on('keyup-U', ()=>{
            this.scene.cameras.main.setZoom(0.5);
        })
        //Adjust zoom in
        this.scene.input.keyboard.on('keyup-I', ()=>{
            this.scene.cameras.main.setZoom(1);
        })
        //attack with whip input
        this.scene.input.keyboard.on("keydown-F", ()=>{
            //indicate that attack animation is playing
            this.scene.player.setState(1);
            //stop player from moving if they were
            this.scene.player.setVelocityY(0);
            this.scene.player.setVelocityX(0);
            //Create a one time listener to make player movable again after animation finishes
            this.scene.whip.once("animationcomplete", this.toggleAttack);
            //Play sound effect
            this.scene.sound.play(CST.AUDIO.WHIP, {
                loop: false
            }) 
            switch(this.scene.player.isFacing){
                case "left":this.scene.whip.setPosition(this.scene.player.x-70,this.scene.player.y+20);
                this.scene.player.play("attackleft", true);
                this.scene.whip.play("whip_left", true);                    
                break;
                case "right": this.scene.whip.setPosition(this.scene.player.x+70,this.scene.player.y);    
                this.scene.player.play("attackright");
                this.scene.whip.play("whip_right");
                break;
                case "up":this.scene.whip.setPosition(this.scene.player.x,this.scene.player.y-70);
                this.scene.player.play("attackup");
                this.scene.whip.play("whip_up");
                break;
                case "down":this.scene.whip.setPosition(this.scene.player.x,this.scene.player.y+70);
                this.scene.player.play("attackdown");
                this.scene.whip.play("whip_down");
                break;
            }         
        })
        //attack with ping pong ball input
        this.scene.input.keyboard.on("keydown-SPACE", ()=>{
            if(this.scene.player.balls >= 1){ 
                //Play sound effect
                this.scene.sound.play(CST.AUDIO.THROW, {
                    loop: false
                })  
                this.scene.player.balls--;
                this.scene.player.displayInventory();
                //create the new ball sprite to throw, with colliders and a timer to destroy it on contact or no contact
                let ball = new CharacterSprite(this.scene, this.scene.player.x, this.scene.player.y, CST.SPRITE.BALL, 0).setDepth(5);
                this.scene.physics.add.collider(this.scene.enemySet, ball, ball.ballHitEnemy, null, this.scene);
                this.scene.physics.add.collider(this.scene.topLayer, ball, ball.ballHitWall, null, this.scene);
                //see if chad is agro and needs a collider
                let chad = this.getNPC("chad");
                if(chad != null){
                    if(chad.state > 4){
                        this.scene.physics.add.collider(ball, chad, ball.ballHitEnemy, null, this.scene);
                    }
                }
                //delay call by amount of player will power, so lower will power makes throws go less far
                this.scene.time.delayedCall(50 * this.scene.player.will, ball.ballHitWall, [ball, ball], this.scene);
                ball.setOffset(8,6);
                switch(this.scene.player.isFacing){
                    case "left":this.scene.player.play("attackleft");
                    ball.setVelocityX(-512);  
                    ball.x -=25;              
                    break;                
                    case "right":this.scene.player.play("attackright");
                    ball.setVelocityX(512);
                    ball.x +=25
                    break;                
                    case "up":this.scene.player.play("attackup");
                    ball.setVelocityY(-512);
                    ball.y -=25;
                    break;                
                    case "down":this.scene.player.play("attackdown");
                    ball.setVelocityY(512);
                    ball.y+=25;
                    break;
                } 
            }           
        })
    }

    toggleAttack(){
        //this flag checks if the player can move or not
        this.scene.player.setState(0);
        //this flag checks if an enemy has already taken damage from the whip
        this.scene.whip.setState(0);
        //this puts the whip sprite out of view until its needed again
        this.scene.whip.x = 0;
        this.scene.whip.y = 0;
    }

    setCameras(){
        //have camera follow player around
        this.scene.cameras.add( 0, 0, this.scene.cmd1.displayWidth, this.scene.game.renderer.height, false, "cmd1");
        let cam1 = this.scene.cameras.getCamera("cmd1");
        cam1.centerOn(-1000,-1000);
        //have camera follow player around
        this.scene.cameras.add( this.scene.game.renderer.width-this.scene.cmd2.displayWidth-50, 0, this.scene.cmd2.displayWidth, this.scene.game.renderer.height, false, "cmd2");
        let cam2 = this.scene.cameras.getCamera("cmd2");
        cam2.centerOn(-1000,1000);
        this.scene.cameras.main.startFollow(this.scene.player);
        this.scene.physics.world.setBounds(0,0, this.map.widthInPixels, this.map.heightInPixels);
    }

    setObjects(){
        //Make item physcis group
        this.itemSet = this.scene.physics.add.group();
        //Make items from map
        this.createItems(459, 0, "dvd");
        this.createItems(460, 1, "examsheet");
        this.createItems(461, 2, "money");
        this.createItems(462, 3, "energy");
        //add the collider for all the items
        this.scene.physics.add.collider(this.scene.player, this.itemSet, this.scene.player.collectItem, null, this);
        //make group for npcs physics
        this.scene.npcSet = this.scene.physics.add.group();
        //make npcs from map
        //add the collider for all the npcs
        this.scene.physics.add.collider(this.scene.player, this.npcSet, this.scene.player.npcSpeak, null, this);
        
        this.scene.npcCont = this.scene.add.container();
        this.createNPCS(470, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 8, 44, 20, 32, "Nicole");
        //this.createNPCS(593, CST.SPRITE.NPCS, 6, CST.SPRITE.NICOLED, 2, 14, 6, 10, "NicoleD");
        this.createNPCS(4704, CST.SPRITE.NPCS, 6, CST.SPRITE.CHAD, 0, 3, 1, 4, "chad");
        this.createNPCS(512, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 49, 85, 61, 73, "Claire1");
        this.createNPCS(473, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 10, 46, 22, 34, "Claire2");
        this.createNPCS(515, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 52, 88, 64, 76, "Prof");
        this.createNPCS(4741, CST.SPRITE.NPCS, 6, CST.SPRITE.KYLE, 2, 14, 6, 10, "Kyle");
        this.createNPCS(4756, CST.SPRITE.NPCS, 6, CST.SPRITE.BRAD, 2, 14, 6, 10, "Brad");
        this.createNPCS(4792, CST.SPRITE.NPCS, 6, CST.SPRITE.STEVIE, 18, 0, 9, 27, "Stevie");
        //make enemies group and container to handle them with*/
        this.scene.enemySet = this.scene.physics.add.group();
        this.scene.enemyCont = this.scene.add.container();
        //using npcs 6 frame to have blank sprite generated so I can make my own inside the function
        //Make different enemies
        this.createEnemies(560, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1down", 5, 1, 2);
        this.createEnemies(564, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1up", 5, 1, 2);
        this.createEnemies(568, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1right", 5, 1, 2);
        this.createEnemies(572, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd1left", 5, 1, 2);
        this.createEnemies(576, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2down", 5, 1, 2);
        this.createEnemies(588, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2up", 5, 1, 2);
        this.createEnemies(580, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2right", 5, 1, 2);
        this.createEnemies(584, CST.SPRITE.NPCS, 6, CST.SPRITE.NERD1,  1, "nerd2left", 5, 1, 2);
        this.createEnemies(467, CST.SPRITE.NPCS, 6, CST.SPRITE.NPC_LOT, 5, "jason", 5, 0, 1.5);
        this.createEnemies(4724, CST.SPRITE.NPCS, 6, CST.SPRITE.NERDGIRL, 2, "nerdgirl", 4724, 0, 1.5);
        this.scene.physics.add.collider(this.scene.enemySet, this.scene.topLayer);
    }

    createItems(key, frame, name){
        this.map.createFromObjects("items", key, {key: CST.SPRITE.ITEM, frame: frame}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            sprite.name = name;
            this.itemSet.add(sprite);
            sprite.setSize(32,32);
            sprite.body.setOffset(0,0);
        });
    }

    createNPCS(key, cst1, frame, cst2, down, up, left, right, name){
        this.map.createFromObjects("npcs", key, {key: cst1, frame: frame}).map((sprite)=>{
            sprite = new Sprite(this.scene, sprite.x, sprite.y, cst2, down, up, left, right, name);
            sprite.body.setSize(sprite.displayWidth/2,sprite.displayHeight/2);
            sprite.setScale(1.5);
            sprite.body.setOffset(sprite.displayWidth/6,0);
            this.scene.npcSet.add(sprite);
            this.scene.npcCont.add(sprite);
            //This triggers when enemy hits player
            this.scene.physics.add.collider(this.scene.player, sprite, sprite.npcSpeak, null, this);
        });
    }

    createEnemies(key, cst1, frame, cst2, st, name, rep, dmg, size){
        this.map.createFromObjects("enemies", key, {key: cst1, frame: frame}).map((sprite)=>{
            sprite = new EnemySprite(this.scene, sprite.x, sprite.y, cst2, st, name, rep, dmg);
            sprite.body.setSize(22,44);
            sprite.setScale(size);
            sprite.body.setOffset(16,16);
            this.scene.enemySet.add(sprite);
            this.scene.enemyCont.add(sprite);
            sprite.setCollideWorldBounds(true);
            //This triggers when enemy hits player, npc, furnishings or the toplayer/borders of the game
            this.scene.physics.add.collider(this.scene.player, sprite, sprite.enemyCollide, null, this);
            this.scene.physics.add.collider(this.scene.npcSet, sprite, sprite.enemyCollide, null, this);
            this.scene.physics.add.collider(this.scene.furnishing, sprite, sprite.enemyCollide, null, this);
            this.scene.physics.add.collider(this.scene.topLayer, sprite, sprite.enemyCollide, null, this);
        });
    }
}