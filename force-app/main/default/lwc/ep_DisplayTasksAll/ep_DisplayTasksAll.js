import { wire,track,api,LightningElement } from 'lwc';
import images from '@salesforce/resourceUrl/Custom_Images';
import getDailyTasks from '@salesforce/apex/ep_HistoryClass.getDailyTasks';
import deleteTasks from '@salesforce/apex/ep_HistoryClass.deletePrevTasks';
import { publish, MessageContext } from 'lightning/messageService';
import popMC from '@salesforce/messageChannel/popMessageChannel__c';
import { refreshApex } from '@salesforce/apex';
export default class Ep_DisplayTasksAll extends LightningElement {

imgIndex=Math.ceil(3*Math.random());
imgPath='morning'+this.imgIndex+'.jpg';
@track backImg=images+'/CustomImages/'+this.imgPath;
@track morningTaskList=[];
@track afternoonTaskList=[];
@track nightTaskList=[];
@track isMorning=true;
@track isAfternoon=false;
@track isNight=false;
@track noMorning=true;
@track noAfternoon=true;
@track noNight=true;
@track currentVal=0;
@track totalVal=10;
@track imgIndex=Math.ceil(3*Math.random());
@track modalOpen=false;
@track editId;

renderedCallback(){   

//  var cls=this.template.querySelectorAll('.container');
//  console.log("TEMPLATE= " +'IMAG= '+this.backImg);
//  cls.backgroundImage=url(this.backImg);

   if(this.isMorning){
    this.template.querySelector('.container').classList.remove("m1","m2","m3","a1","a2","a3","n1","n2","n3"); 
    let mstr='m'+this.imgIndex;
    this.template.querySelector('.container').classList.add(mstr);   
    this.template.querySelector('.morning').classList.add('morning-btn');
    this.template.querySelector('.afternoon').classList.remove('afternoon-btn');
    this.template.querySelector('.night').classList.remove('night-btn');
   }
   else if(this.isAfternoon){
    this.template.querySelector('.container').classList.remove("m1","m2","m3","a1","a2","a3","n1","n2","n3");    
    let mstr='a'+this.imgIndex;
    this.template.querySelector('.container').classList.add(mstr); 
    this.template.querySelector('.morning').classList.remove('morning-btn');
    this.template.querySelector('.afternoon').classList.add('afternoon-btn');
    this.template.querySelector('.night').classList.remove('night-btn');
   }
   else if(this.isNight){
    this.template.querySelector('.container').classList.remove("m1","m2","m3","a1","a2","a3","n1","n2","n3");    
    let mstr='n'+this.imgIndex;
    this.template.querySelector('.container').classList.add(mstr); 
    this.template.querySelector('.morning').classList.remove('morning-btn');
    this.template.querySelector('.afternoon').classList.remove('afternoon-btn');
    this.template.querySelector('.night').classList.add('night-btn');
   }

}

@wire(MessageContext) messageContext;

wiredProperty;
@wire(getDailyTasks) getAllTasks(result){  
    this.wiredProperty=result;
    var current=new Date();
    var currTime=current.getHours();    
    
    if(currTime<12){
    this.isMorning=true;
    console.log("IT'S MORNING "+this.isMorning);
    this.isAfternoon=false;
    this.isNight=false;
    
    }
    else if(currTime>=12 && currTime<18){
    this.isMorning=false;
    this.isAfternoon=true;
    console.log("IT'S AFTERNOON "+this.isAfternoon);
    this.isNight=false;
    
    }
    else{
    this.isMorning=false;
    this.isAfternoon=false;
    this.isNight=true; 
    
    console.log("IT'S NIGHT "+this.isNight);
    }  
        

if(result.data){  

let tList=result.data;
this.totalVal=0;
for(let i=0;i<tList.length;i++){
    console.log("LENGTH="+i);
    this.totalVal=this.totalVal+tList[i].Value__c;
    console.log("TOTAL VAL: "+this.totalVal);
    if(tList[i].Completed__c){
        this.currentVal=this.currentVal+tList[i].Value__c;
    }
    if(tList[i].Session__c=='Morning'){
        if(tList[i].Important__c){
            this.morningTaskList.unshift(tList[i]);
        }
        else{
        this.morningTaskList.push(tList[i]);
    }
        this.noMorning=false;
        console.log(JSON.stringify(this.morningTaskList));
    }
    else if(tList[i].Session__c=='Afternoon'){
        if(tList[i].Important__c){
            this.afternoonTaskList.unshift(tList[i]);
        }
        else{
        this.afternoonTaskList.push(tList[i]);
    }
        // this.afternoonTaskList.push(tList[i]);
        this.noAfternoon=false;
        console.log(JSON.stringify(this.afternoonTaskList));
    }
    else if(tList[i].Session__c=='Night'){
        if(tList[i].Important__c){
            this.nightTaskList.unshift(tList[i]);
        }
        else{
        this.nightTaskList.push(tList[i]);
    }
        // this.nightTaskList.push(tList[i]);
        this.noNight=false;
        console.log(JSON.stringify(this.nightTaskList));
    }

}
if(this.currentVal>0){
this.currentVal=this.currentVal/this.totalVal*100;
console.log("CURRENT VAL: "+this.currentVal);}
}
else{
console.log("NO TASKS!!");
}
};   


handleSession(e){
let sess= e.target.value;
if(sess=='Morning'){
    this.isMorning=true;
    this.isAfternoon=false;
    this.isNight=false;
    // let mstr='m'+this.imgIndex;
    // this.template.querySelector('.container').classList.add(mstr);
    this.template.querySelector('.morning').classList.add('morning-btn');
    this.template.querySelector('.afternoon').classList.remove('afternoon-btn');
    this.template.querySelector('.night').classList.remove('night-btn');
    
    console.log('Morning click');
}
else if(sess=='Afternoon'){
    this.isMorning=false;
    this.isAfternoon=true;
    this.isNight=false;
    // let mstr='a'+this.imgIndex;
    // this.template.querySelector('.container').classList.add(mstr);
    this.template.querySelector('.morning').classList.remove('morning-btn');
    this.template.querySelector('.afternoon').classList.add('afternoon-btn');
    this.template.querySelector('.night').classList.remove('night-btn');
    console.log('Afternoon click');
}
else if(sess=='Night'){
    this.isMorning=false;
    this.isAfternoon=false;
    this.isNight=true; 
    // let mstr='m'+this.imgIndex;
    // this.template.querySelector('.container').classList.add(mstr);
    this.template.querySelector('.morning').classList.remove('morning-btn');
    this.template.querySelector('.afternoon').classList.remove('afternoon-btn');
    this.template.querySelector('.night').classList.add('night-btn');
    console.log('Night click');
}
else if(sess=='Add'){
    console.log("Pre-Publish");
    const message={popValue: 'Add'};
    publish(this.messageContext, popMC, message);
    console.log("Post-Publish");
    //window.open("/Admin/s/add-tasks","_self");
}
else if(sess=='Delete'){
    if(window.confirm('CAUTION: All the previous records will be deleted')){
    deleteTasks().then(()=>{
        alert("DELETED SUCCESSFULLY");
      });
    }
}
}

handleReport(){
    window.open("/Admin/s/report-page");
}

handleEdit(e){
// alert("IN DEVELOPMENT:" +e.detail);
this.editId=e.detail;
this.modalOpen=true;
}

handleClose(e){
    this.modalOpen=false;  
}


}