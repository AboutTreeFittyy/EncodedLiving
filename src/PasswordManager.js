/* File Name: PasswordManager.js
 * Author: Mathew Boland
 * Last Updated: December 9, 2019
 * Description: A class to generate and decode passwords.
*/
export class PasswordManager{
    
    constructor() {}

    //Function that manipulates the scene to be loaded from the password passed in
    usePassword(pw, scene, player){
        //Set player progress
        let prog = this.getNumFromChar(pw.slice(0, 1));
        if(prog == 1){//At kitchen room (Test code: SUUURWR)
            //console.log("Loaded: Kitchen Room");
            scene.lm.getNPC("chad").state++;
            scene.lm.getNPC("Kyle").state++;
        }else if(prog == 2){//At first exam (Test code: MNNNKQK)
            //console.log("Loaded: First Exam");
            scene.claireRoom.visible = false;
            scene.claireRoomCollider.active = false;
            scene.lm.getNPC("Kyle").state++;
            scene.lm.getNPC("Stevie").state++;
            scene.lm.getNPC("Claire1").state++;
            scene.lm.getNPC("Brad").state++;        
            scene.finished1 = true; //Prevents dialogue from previous section playing too
        }else if(prog == 3){//At Chad room (Test code: RRRROUO)
            //console.log("Loaded: Chad Room");
            let chad = scene.lm.getNPC("chad");
            chad.x = 0;
            chad.y = 0;
            chad.startX = 0;
            chad.startY = 0;
            scene.claireRoom.visible = false;
            scene.claireRoomCollider.active = false;
            scene.chadRoom.visible = false;
            scene.chadRoomCollider.active = false;
            scene.lm.getNPC("Nicole").state = 5;
        }else if(prog == 4){//At Vlad room (Test code: EDDCAGA)
            //console.log("Loaded: Vlad Room");
            scene.claireRoom.visible = false;
            scene.claireRoomCollider.active = false;
            scene.chadRoom.visible = false;
            scene.chadRoomCollider.active = false;
            //Stevie to vlad room
            let stevie = scene.lm.getNPC("Stevie");
            stevie.x = 5800;
            stevie.y = 6820;
            stevie.startX = 5800;
            stevie.startY = 6820;
            stevie.state = 4;
            //Kyle to chad room
            let kyle = scene.lm.getNPC("Kyle");
            kyle.x = 1680;
            kyle.y = 6220;
            kyle.startX = 1680;
            kyle.startY = 6220;
            kyle.state = 5;
            //Brad in front of player
            let brad = scene.lm.getNPC("Brad");
            brad.x = 0;
            brad.y = 0;
            brad.startX = 0;
            brad.startY = 0;
            //Delete Claire1 by sending her into oblivion
            let claire1 = scene.lm.getNPC("Claire1");
            claire1.x = 0;
            claire1.y = 0;
            claire1.startX = 0;
            claire1.startY = 0;
            //Make sure claire2 is in state 0 now in case they got the chad mask
            let claire2 = scene.lm.getNPC("Claire2");
            claire2.state = 2;
            claire2.startX = 1250;
            claire2.startY = 4100;
            claire2.x = 1250;
            claire2.y = 4100;
            //Make NicoleD visible
            let nicoled = scene.lm.getNPC("NicoleD");
            nicoled.state = 3;
            //turn off Nicole
            let nicole = scene.lm.getNPC("Nicole");
            nicole.state = 6;
            nicole.setVisible(false);
            nicole.disableBody();
        }else if(prog == 5){//At final exam (Test code: ZYXWUCU)
            //console.log("Loaded: Final Exam");
            scene.finished3 = true;
            scene.claireRoom.visible = false;
            scene.claireRoomCollider.active = false;
            scene.chadRoom.visible = false;
            scene.chadRoomCollider.active = false;
            scene.vladRoom.visible = false;
            scene.vladRoomCollider.active = false;
            //Stevie to vlad room
            let stevie = scene.lm.getNPC("Stevie");
            stevie.x = 5800;
            stevie.y = 6820;
            stevie.startX = 5800;
            stevie.startY = 6820;
            stevie.state = 5;
            //Kyle to chad room
            let kyle = scene.lm.getNPC("Kyle");
            kyle.x = 1680;
            kyle.y = 6220;
            kyle.startX = 1680;
            kyle.startY = 6220;
            kyle.state = 5;
            //Brad in front of player
            let brad = scene.lm.getNPC("Brad");
            brad.x = 0;
            brad.y = 0;
            brad.startX = 0;
            brad.startY = 0;
            //Set Vlad to boss fight mode
            let vlad = scene.lm.getNPC("Vlad");
            vlad.state = 1;
            //Delete Claire1 by sending her into oblivion
            let claire1 = scene.lm.getNPC("Claire1");
            claire1.x = 0;
            claire1.y = 0;
            claire1.startX = 0;
            claire1.startY = 0;
            //Make sure claire2 is in state 0 now in case they got the chad mask
            let claire2 = scene.lm.getNPC("Claire2");
            claire2.state = 2;
            claire2.startX = 1250;
            claire2.startY = 4100;
            claire2.x = 1250;
            claire2.y = 4100;
            //Hide chad
            let chad = scene.lm.getNPC("chad");
            chad.x = 0;
            chad.y = 0;
            chad.startX = 0;
            chad.startY = 0;
            //turn off Nicole
            let nicole = scene.lm.getNPC("Nicole");
            nicole.state = 6;
            nicole.setVisible(false);
            nicole.disableBody();
        }else if(prog == 6){//Has the chad mask (Test code: GEDCAJA)
            //console.log("Loaded: ChadMask");
            //Player cheated so this only sets them up as if they just started and got the Chad mask
            player.addItem(player, "mask");
        }//No need to check for prog == 0, as that just means there wasn't enough progress to save and nothing needs to be loaded (Test code: NQQQNRN)
        //Set player level
        for(var i = 0; i < this.getNumFromChar(pw.slice(1, 2)); i++){
            //Have everything update to player level
            player.knowledgeProgress = player.knowledgeNeeded-1;
            player.addItem(player, "examsheet");
        }
        //Set upgrades
        let up = this.getNumFromChar(pw.slice(2, 3));
        if(up == 3){
            //Both upgrades bought
            player.balls++;
            player.maxBalls++;
            player.whipUpgrade++;
        }else if(up == 2){
            //Just ping pong ball bought
            player.balls++;
            player.maxBalls++;
        }else if(up == 1){
            //Just whip upgraded
            player.whipUpgrade++;
        }//No need for else on upgrades because 0 is just nothing upgraded, so nothing to be done
        //Set player lives/grade
        player.lives = this.getNumFromChar(pw.slice(3, 4)) + 1;
        //Set player money
        let firstDigit = this.getNumFromChar(pw.slice(4, 5));
        let secondDigit = this.getNumFromChar(pw.slice(5, 6));
        player.money = firstDigit * 10 + secondDigit;
        //Refresh inventory
        player.displayInventory();
    }

    //Generates a password given the game scene and player
    generatePassword(scene, player){
        let pass = '';
        let upass = '';
        let seed = this.randomNum(0, 25);
        //Check what first letter should be based on player game progress
        //If Chad mask obtained then that is what game progress starts at
        if(player.maskChad == true){
            pass += this.getCharFromNum(this.getNumFromSeed(6, seed));
            upass += this.getCharFromNum(6);
        }else if(scene.finished4 == true){
            //Progress achieved up to final exam
            pass += this.getCharFromNum(this.getNumFromSeed(5, seed));
            upass += this.getCharFromNum(5);
        }else if(scene.finished3 == true){
            //Progress achieved up to vlad room unlock
            pass += this.getCharFromNum(this.getNumFromSeed(4, seed));
            upass += this.getCharFromNum(4);
        }else if(scene.lm.getNPC("NicoleD").state != 9){
            //Progress achieved up to chad room unlock (NicoleD state is no longer 9 after the chad boss fight)
            pass += this.getCharFromNum(this.getNumFromSeed(3, seed));
            upass += this.getCharFromNum(3);
        }else if(scene.finished2 == true){
            //Progress achieved up to first exam unlock
            pass += this.getCharFromNum(this.getNumFromSeed(2, seed));
            upass += this.getCharFromNum(2);
        }else if(scene.finished1 == true){
            //Progress achieved up to kitchen room unlock
            pass += this.getCharFromNum(this.getNumFromSeed(1, seed));
            upass += this.getCharFromNum(1);
        }else{
            //Not enough progress to save
            pass += this.getCharFromNum(this.getNumFromSeed(0, seed));
            upass += this.getCharFromNum(0);
        }
        //Check what second letter should be based on player level
        pass += this.getCharFromNum(this.getNumFromSeed(player.knowledgeLevel, seed));
        upass += this.getCharFromNum(player.knowledgeLevel);
        //Check what third letter should be based on player upgrades
        if(player.maxBalls > 3 && player.whipUpgrade > 0){
            //Both upgrades obtained
            pass += this.getCharFromNum(this.getNumFromSeed(3, seed));
            upass += this.getCharFromNum(3);
        }else if(player.maxBalls > 3){
            //Only ping pong ball upgraded
            pass += this.getCharFromNum(this.getNumFromSeed(2, seed));
            upass += this.getCharFromNum(2);
        }else if(player.whipUpgrade > 0){
            //Only whip upgraded
            pass += this.getCharFromNum(this.getNumFromSeed(1, seed));
            upass += this.getCharFromNum(1);
        }else{
            //Nothing upgraded
            pass += this.getCharFromNum(this.getNumFromSeed(0, seed));
            upass += this.getCharFromNum(0);
        }
        //Check what the fourth letter should be based on player grade
        pass += this.getCharFromNum(this.getNumFromSeed(player.lives - 1, seed));
        upass += this.getCharFromNum(player.lives - 1);
        //Check what the fifth/sixth letters are based on players money (half dollars are rounded down and not saved)
        let money = Math.floor(player.money);
        pass += this.getCharFromNum(this.getNumFromSeed(((money-(money % 10))/10), seed));
        upass += this.getCharFromNum(((money-(money % 10))/10));
        pass += this.getCharFromNum(this.getNumFromSeed(money % 10, seed));
        upass += this.getCharFromNum(money % 10);
        //Save the final letter as the seed used
        pass += this.getCharFromNum(seed);
        //console.log("Password without seed:" +upass);
        //console.log("Password generated: "+pass);
        return pass;
    }

    //Gets the correct adjusted number based on the seed
    getNumFromSeed(num, seed){
        let gen = num + seed;  
        //If the seed generated something above the max character then have it overflow by subtracting the highest value 26 (since 0-25 is 26 numbers)      
        if(gen > 25){
            gen -= 26;
        }
        return gen;
    }

    //Decrypts the password given based on the final character seed if a proper password is found
    decodePassword(pw){
        //Check length, return null if improper length
        if(pw.length != 7){
            return null;
        }
        let dec = '';
        //Decode password with seed
        let seed = this.getNumFromChar(pw.slice(6, 7));
        dec += this.removeSeed(pw.slice(0, 1), seed);
        dec += this.removeSeed(pw.slice(1, 2), seed);
        dec += this.removeSeed(pw.slice(2, 3), seed);
        dec += this.removeSeed(pw.slice(3, 4), seed);
        dec += this.removeSeed(pw.slice(4, 5), seed);
        dec += this.removeSeed(pw.slice(5, 6), seed);
        //Check if any entries are invalid, return null if they are        
        if(this.getNumFromChar(dec.slice(0, 1)) > 6){
            return null; //No possible answers above 6 for game progress
        }
        if(this.getNumFromChar(dec.slice(1, 2)) > 5){
            return null; //No possible answers above 5, can't be above max level
        }
        if(this.getNumFromChar(dec.slice(2, 3)) > 3){
            return null; //No possible answers above 3 for upgrades
        }
        if(this.getNumFromChar(dec.slice(3, 4)) > 3){
            return null; //No possible answers above 3 for number of lives (3 is really 4 lives how its implemented)
        }
        if(this.getNumFromChar(dec.slice(4, 5)) > 9){
            return null; //No possible answers above 9 for a digit of base 10
        }
        if(this.getNumFromChar(dec.slice(5, 6)) > 9){
            return null; //No possible answers above 9 for a digit of base 10
        }
        //console.log(dec);
        return dec;
    }

    //Removes the seed offset from a number
    removeSeed(cha, seed){
        if(this.getNumFromChar(cha) >= seed){
            //Seed wouldn't cause it to wrap around so just subtract it
            return this.getCharFromNum(this.getNumFromChar(cha) - seed);
        }else{
            //Have to remove the wrap around from the seed
            return this.getCharFromNum(26 - (seed - this.getNumFromChar(cha)));
        }
    }

    //Return random number inbetween min and max
    randomNum(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Gets associated Char for number
    getCharFromNum(num){
        switch(num){
            case 0: return 'A';
            case 1: return 'B';
            case 2: return 'C';
            case 3: return 'D';
            case 4: return 'E';
            case 5: return 'F';
            case 6: return 'G';
            case 7: return 'H';
            case 8: return 'I';
            case 9: return 'J';
            case 10: return 'K';
            case 11: return 'L';
            case 12: return 'M';
            case 13: return 'N';
            case 14: return 'O';
            case 15: return 'P';
            case 16: return 'Q';
            case 17: return 'R';
            case 18: return 'S';
            case 19: return 'T';
            case 20: return 'U';
            case 21: return 'V';
            case 22: return 'W';
            case 23: return 'X';
            case 24: return 'Y';
            case 25: return 'Z';
        }
    }

    //Gets associated number for char
    getNumFromChar(cha){
        switch(cha){
            case 'A': return 0;
            case 'B': return 1;
            case 'C': return 2;
            case 'D': return 3;
            case 'E': return 4;
            case 'F': return 5;
            case 'G': return 6;
            case 'H': return 7;
            case 'I': return 8;
            case 'J': return 9;
            case 'K': return 10;
            case 'L': return 11;
            case 'M': return 12;
            case 'N': return 13;
            case 'O': return 14;
            case 'P': return 15;
            case 'Q': return 16;
            case 'R': return 17;
            case 'S': return 18;
            case 'T': return 19;
            case 'U': return 20;
            case 'V': return 21;
            case 'W': return 22;
            case 'X': return 23;
            case 'Y': return 24;
            case 'Z': return 25;
        }
    }
}