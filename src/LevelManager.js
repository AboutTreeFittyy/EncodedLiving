/* File Name: LevelManager.js
 * Author: Mathew Boland
 * Last Updated: December 1, 2019
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
        for(let i = 0; i < this.scene.npcCont.list.length; i++){
            if(this.scene.npcCont.list[i].name == name){
                return this.scene.npcCont.list[i];
            }
        }
        return null;
    }

    //Spawns a projectile sprite at the given coordinates
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

    //Updates sprite values for enemies and NPCs.
    //2 giant switch statements that update things like sprite velocity, direction or states
    updateSprites(){
        //Scan through all the NPCs to update them
        for(let i = 0; i < this.scene.npcCont.count('visible', true); i++){
            let go = this.scene.npcCont.list[i];
            switch(go.name){
                case "Nicole":
                    if(go.state == 5){
                        //Start new semester, move sprites to new positions
                        //Player back to start
                        this.scene.player.x = 1200;
                        this.scene.player.y = 4110;
                        //Stevie to vlad room
                        let stevie = this.scene.lm.getNPC("Stevie");
                        stevie.x = 5800;
                        stevie.y = 6820;
                        stevie.startX = 5800;
                        stevie.startY = 6820;
                        stevie.state = 4;
                        //Kyle to chad room
                        let kyle = this.scene.lm.getNPC("Kyle");
                        kyle.x = 1680;
                        kyle.y = 6220;
                        kyle.startX = 1680;
                        kyle.startY = 6220;
                        kyle.state = 4;
                        //Brad in front of player
                        let brad = this.scene.lm.getNPC("Brad");
                        brad.x = 1350;
                        brad.y = 4100;
                        brad.startX = 1400;
                        brad.startY = 4100;
                        //Delete Claire1 by sending her into oblivion
                        let claire1 = this.scene.lm.getNPC("Claire1");
                        claire1.x = 0;
                        claire1.y = 0;
                        claire1.startX = 0;
                        claire1.startY = 0;
                        //Make sure claire2 is in state 0 now in case they got the chad mask
                        let claire2 = this.scene.lm.getNPC("Claire2");
                        claire2.state = 0;
                        //Make NicoleD visible
                        let nicoled = this.scene.lm.getNPC("NicoleD");
                        nicoled.state = 0;
                        //turn off this flag
                        go.state = 6;
                        go.setVisible(false);
                        go.disableBody();
                        //Start Brad convo
                        brad.state = 2;
                        this.scene.keyboard.E.isDown = true;
                        brad.npcSpeak(this.scene.player, brad); 
                        this.scene.scene.pause(); 
                    }
                    this.followPlayer(go);
                    break;
                case "NicoleD":
                    if(go.state != 9){
                        this.followPlayer(go);
                    }
                    break;              
                case "chad":                   
                    if(go.state < 5){
                        //Now check if they've been pushed from their origin and make them face the player
                        this.watchPlayer(go, go.down, go.up, go.right, go.left);
                    }    
                    //Check if chad is currently an enemy and needs to attack the player
                    if(go.state == 5){
                        //Timer has reset chad state to 5. Have him attack.
                        this.spawnProjectile(go.x, go.y + 100, CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
                        this.spawnProjectile(go.x, go.y -100, CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
                        this.spawnProjectile(go.x, go.y + 100, CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(200);
                        this.spawnProjectile(go.x, go.y -100, CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(200);
                        this.spawnProjectile(go.x, go.y, CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityY(200);
                        this.spawnProjectile(go.x, go.y, CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityY(-200);
                        go.play("chadFlex", true);                        
                        //Set flag to 6 so he doesn't attack again.
                        go.state = 6;
                        //Set new timer to make him attack again in 2 seconds.
                        this.scene.time.delayedCall(2000, go.npcAttack, [this.scene.player, go], this.scene);
                    }else if(go.state == 7){
                        go.makeNPCAgro(this.scene.player, go); 
                        go.state = 5;  
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
                    case "Brad":
                        //See if i should agro Brad into a jason    
                        if(go.state == 3){
                            let sprite = new EnemySprite(this.scene, go.x, go.y, CST.SPRITE.NPC_LOT, 5, "jason", 5, 0);
                            sprite.body.setSize(22,44);
                            sprite.setScale(1.5);
                            sprite.body.setOffset(16,16);
                            this.scene.enemySet.add(sprite);
                            this.scene.enemyCont.add(sprite);
                            sprite.setCollideWorldBounds(true);
                            //This triggers when enemy hits player, npc, furnishings or the toplayer/borders of the game
                            this.scene.physics.add.collider(this.scene.player, sprite, sprite.enemyCollide, null, this);
                            this.scene.physics.add.collider(this.scene.npcSet, sprite, sprite.enemyCollide, null, this);
                            this.scene.physics.add.collider(this.scene.furnishing, sprite, sprite.enemyCollide, null, this);
                            this.scene.physics.add.collider(this.scene.topLayer, sprite, sprite.enemyCollide, null, this);
                            //Now move brad to Claire1 in oblivion and get rid of this flag so it doesn't spawn more jasons
                            go.x = 0;
                            go.y = 0;
                            go.startX = 0;
                            go.startY = 0;
                            go.state = 4;
                            //Unblock the chad room
                            this.scene.chadRoom.visible = false;
                            this.scene.physics.world.removeCollider(this.scene.chadRoomCollider);
                            this.scene.examRoomCollider = this.scene.physics.add.collider(this.scene.player, this.scene.examRoom, this.scene.player.examBlocked, null, this.scene);
                            this.scene.examRoom.visible = true;
                        }
                    case "Kyle":
                    case "Claire1":                    
                    case "Prof":
                    case "Stevie":       
                        //Now check if they've been pushed from their origin and make them face the player
                        this.watchPlayer(go, go.down, go.up, go.right, go.left);
                    break;
                    case "Claire2":
                        //Check for final game conversation state
                        if(go.state == 6){
                            this.scene.player.winGame(this.scene.player);
                        }
                        //Now check if they've been pushed from their origin and make them face the player
                        this.watchPlayer(go, go.down, go.up, go.right, go.left);
                    break;
                    case "Vlad":                 
                    if(go.state < 5){
                        //Now check if they've been pushed from their origin and make them face the player
                        this.watchPlayer(go, go.down, go.up, go.right, go.left);
                    }    
                    //Check if chad is currently an enemy and needs to attack the player
                    if(go.state == 5){
                        //Timer has reset vlad state to 5. Have him attack.
                        this.spawnProjectile(go.x, go.y + 100, CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
                        this.spawnProjectile(go.x, go.y -100, CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
                        this.spawnProjectile(go.x, go.y + 100, CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(200);
                        this.spawnProjectile(go.x, go.y -100, CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(200);
                        this.spawnProjectile(go.x, go.y, CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityY(200);
                        this.spawnProjectile(go.x, go.y, CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityY(-200);
                        go.play("VladCry", true);                        
                        //Set flag to 6 so he doesn't attack again.
                        go.state = 6;
                        //Set new timer to make him attack again in 2 seconds.
                        this.scene.time.delayedCall(2000, go.npcAttack, [this.scene.player, go], this.scene);
                    }else if(go.state == 7){
                        go.makeNPCAgro(this.scene.player, go); 
                        go.state = 5;  
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
                    go.setVelocityY(256);
                    break;
                case "nerd1up":
                    go.play("nerd1up", true);
                    go.setVelocityY(-256);
                    break;
                case "nerd1left":
                        go.play("nerd1left", true);
                        go.setVelocityX(-256);
                        break;
                case "nerd1right":
                        go.play("nerd1right", true);
                        go.setVelocityX(256);
                        break;
                case "nerd2down":
                    go.play("nerd2down", true);
                    go.setVelocityY(256);
                    break;
                case "nerd2up":
                    go.play("nerd2up", true);
                    go.setVelocityY(-256);
                    break;
                case "nerd2left":
                        go.play("nerd2left", true);
                        go.setVelocityX(-256);
                        break;
                case "nerd2right":
                        go.play("nerd2right", true);
                        go.setVelocityX(256);
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

    //Return random number inbetween min and max
    randomNum(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Have gameobject follow player
    followPlayer(go){
        let anim = 'nothing';
        //Have her follow the player around                                      
        if(this.scene.player.y - 150 > go.y){
            //player below
            go.setVelocityY(512);
            anim = "down";
        }else if (this.scene.player.y + 150 < go.y){
            //player above
            go.setVelocityY(-512);
            anim = "up";
        }else{
            go.setVelocityY(0);
        }
        if(this.scene.player.x - 150 > go.x){
            //player in front
            go.setVelocityX(512);
            anim = "right";
        }else if (this.scene.player.x + 150 < go.x){
            //player behind
            go.setVelocityX(-512);
            anim = "left";
        }else{
            go.setVelocityX(0);
        }
        if(anim != "nothing"){
            go.play(go.name + anim, true);
        }
    }

    //Have sprite watch the player by moving their idle frame to face the player
    //Also makes the sprite walk back to their starting position if they get too far from it somehow
    watchPlayer(go, down, up, right, left){
        let anim = "nothing";
        if(go.startY - 50 > go.y){
            //npc below
            go.setVelocityY(256);
            anim = "down";
        }else if (go.startY + 50 < go.y){
            //npc above
            go.setVelocityY(-256);
            anim = "up";
        }else{
            go.setVelocityY(0);
        }
        if(go.startX - 50 > go.x){
            //npc in front
            go.setVelocityX(256);
            anim = "right";
        }else if (go.startX + 50 < go.x){
            //npc behind
            go.setVelocityX(-256);
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

    //Sets up important data for the player
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

    //Creates the CMD stat screens
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

    //Creates all the input handlers for the game
    setInputs(){
        //set up keyboard controls
        this.scene.keyboard = this.scene.input.keyboard.addKeys("W, A, S, D, E");
        //Set listener for p to pause game
        this.scene.input.keyboard.on('keyup-P', ()=>{
            this.scene.scene.launch(CST.SCENES.PAUSE);
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
            let pre = "";
            if(this.scene.player.whipUpgrade > 0){
                pre = "red";
            }
            switch(this.scene.player.isFacing){
                case "left":this.scene.whip.setPosition(this.scene.player.x-70,this.scene.player.y+20);
                this.scene.player.play("attackleft", true);
                this.scene.whip.play(pre+"whip_left", true);                    
                break;
                case "right": this.scene.whip.setPosition(this.scene.player.x+70,this.scene.player.y);    
                this.scene.player.play("attackright");
                this.scene.whip.play(pre+"whip_right");
                break;
                case "up":this.scene.whip.setPosition(this.scene.player.x,this.scene.player.y-70);
                this.scene.player.play("attackup");
                this.scene.whip.play(pre+"whip_up");
                break;
                case "down":this.scene.whip.setPosition(this.scene.player.x,this.scene.player.y+70);
                this.scene.player.play("attackdown");
                this.scene.whip.play(pre+"whip_down");
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
                //see if vlad is agro and needs a collider
                let vlad = this.getNPC("Vlad");
                if(vlad != null){
                    if(vlad.state > 4){
                        this.scene.physics.add.collider(ball, vlad, ball.ballHitEnemy, null, this.scene);
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

    //Changes player state to not attacking and moves the whip out of view 
    toggleAttack(){
        //this flag checks if the player can move or not
        this.scene.player.setState(0);
        //this flag checks if an enemy has already taken damage from the whip
        this.scene.whip.setState(0);
        //this puts the whip sprite out of view until its needed again
        this.scene.whip.x = 0;
        this.scene.whip.y = 0;
    }

    //Sets up the three cameras for the games display
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

    //Creates all the game objects for the NPCs, items and enemies as well as their bodies and groups
    setObjects(){
        //Make item physcis group
        this.itemSet = this.scene.physics.add.group();
        //Make items from map
        this.createItems(459, 0, "dvd");
        this.createItems(460, 1, "examsheet");
        this.createItems(461, 2, "money");
        this.createItems(462, 3, "energy");
        this.createItems(463, 4, "mask");
        //add the collider for all the items
        this.scene.physics.add.collider(this.scene.player, this.itemSet, this.scene.player.collectItem, null, this);
        //make group for npcs physics
        this.scene.npcSet = this.scene.physics.add.group();
        //make npcs from map
        //add the collider for all the npcs
        this.scene.physics.add.collider(this.scene.player, this.npcSet, this.scene.player.npcSpeak, null, this);        
        this.scene.npcCont = this.scene.add.container();
        this.createNPCS(4705, CST.SPRITE.VLAD, 8, CST.SPRITE.CHAD, 0, 3, 1, 4, "chad");
        this.createNPCS(5097, CST.SPRITE.VLAD, 8, CST.SPRITE.VLAD, 0, 3, 1, 4, "Vlad");
        this.createNPCS(513, CST.SPRITE.VLAD, 8, CST.SPRITE.NPC_LOT, 49, 85, 61, 73, "Claire1");
        this.createNPCS(474, CST.SPRITE.VLAD, 8, CST.SPRITE.NPC_LOT, 10, 46, 22, 34, "Claire2");
        this.createNPCS(516, CST.SPRITE.VLAD, 8, CST.SPRITE.NPC_LOT, 52, 88, 64, 76, "Prof");
        this.createNPCS(4742, CST.SPRITE.VLAD, 8, CST.SPRITE.KYLE, 2, 14, 6, 10, "Kyle");
        this.createNPCS(4757, CST.SPRITE.VLAD, 8, CST.SPRITE.BRAD, 2, 14, 6, 10, "Brad");
        this.createNPCS(4793, CST.SPRITE.VLAD, 8, CST.SPRITE.STEVIE, 18, 0, 9, 27, "Stevie");
        this.createNPCS(594, CST.SPRITE.VLAD, 8, CST.SPRITE.NICOLED, 2, 14, 6, 10, "NicoleD");
        this.createNPCS(471, CST.SPRITE.VLAD, 8, CST.SPRITE.NPC_LOT, 8, 44, 20, 32, "Nicole");
        //make enemies group and container to handle them with*/
        this.scene.enemySet = this.scene.physics.add.group();
        this.scene.enemyCont = this.scene.add.container();
        //using npcs 6 frame to have blank sprite generated so I can make my own inside the function
        //Make different enemies
        this.createEnemies(561, CST.SPRITE.VLAD, 8, CST.SPRITE.NERD1,  1, "nerd1down", 5, 1, 2);
        this.createEnemies(565, CST.SPRITE.VLAD, 8, CST.SPRITE.NERD1,  1, "nerd1up", 5, 1, 2);
        this.createEnemies(569, CST.SPRITE.VLAD, 8, CST.SPRITE.NERD1,  1, "nerd1right", 5, 1, 2);
        this.createEnemies(573, CST.SPRITE.VLAD, 8, CST.SPRITE.NERD1,  1, "nerd1left", 5, 1, 2);
        this.createEnemies(578, CST.SPRITE.VLAD, 8, CST.SPRITE.NERD1,  1, "nerd2down", 5, 1, 2);
        this.createEnemies(589, CST.SPRITE.VLAD, 8, CST.SPRITE.NERD1,  1, "nerd2up", 5, 1, 2);
        this.createEnemies(581, CST.SPRITE.VLAD, 8, CST.SPRITE.NERD1,  1, "nerd2right", 5, 1, 2);
        this.createEnemies(582, CST.SPRITE.VLAD, 8, CST.SPRITE.NERD1,  1, "nerd2left", 5, 1, 2);
        this.createEnemies(468, CST.SPRITE.VLAD, 8, CST.SPRITE.NPC_LOT, 5, "jason", 5, 0, 1.5);
        this.createEnemies(4725, CST.SPRITE.VLAD, 8, CST.SPRITE.NERDGIRL, 2, "nerdgirl", 4724, 0, 1.5);
        this.scene.physics.add.collider(this.scene.enemySet, this.scene.topLayer);
    }

    //Generic item making function
    createItems(key, frame, name){
        this.map.createFromObjects("items", key, {key: CST.SPRITE.ITEM, frame: frame}).map((sprite)=>{            
            //enable body for the items to interact with player collision
            sprite.name = name;
            this.itemSet.add(sprite);
            sprite.setSize(32,32);
            sprite.body.setOffset(0,0);
        });
    }

    //Generic NPC creating function
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

    //Generic enemy creating function
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