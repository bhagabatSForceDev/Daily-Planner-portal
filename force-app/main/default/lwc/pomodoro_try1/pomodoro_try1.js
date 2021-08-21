import { track,LightningElement } from 'lwc';

export default class Pomodoro_try1 extends LightningElement {

 @track yid='kDhsYABUjVc';
 @track player=false;  
 @track timerMin=0; 
 @track timerSec=0;

 get youtubeUrl(){
     return 'https://www.youtube.com/embed/'+this.yid+'?autoplay=1&mute=1';
 }

 get Time(){
     return this.timerMin+' : '+this.timerSec;
 }
//start=397&
startTimer(){
    this.timerMin=0;
    this.timerSec=0;
    this.updateTimer();
    
}

startRest(){


}

doNothing(){
    console.log("DO NOTHiNG");
}

updateTimer(){
//this.player=false;
if(this.timerMin==2){
    this.player=true;
}
if(this.timerMin==3){
    this.player=false;
}
if(this.timerSec+1==60){
this.timerMin=this.timerMin+1;
this.timerSec=0;
}
else{   
this.timerSec=this.timerSec+1;
} 
setTimeout(() => {
    this.updateTimer();       
}, 1000);

}

}