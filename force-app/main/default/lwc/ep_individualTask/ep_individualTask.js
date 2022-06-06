import { LightningElement,api,track } from 'lwc';
import images from '@salesforce/resourceUrl/Custom_Images';
import changeTaskStatus from '@salesforce/apex/ep_HistoryClass.changeTaskStatus';

export default class Ep_individualTask extends LightningElement {

@track btnText='';
@track timeText='';

 imgIndex=Math.ceil(3*Math.random());
 imgPath='morning'+this.imgIndex+'.jpg';
 @track backImg=images+'/CustomImages/'+this.imgPath; 
 @track today=new Date();
   @api sampObject=
   {"Id":'a025g000003ifojAAA',
     "Name": 'Something',
     "Subject__c":'History',
     "Completed__c": false,
     "Description__c": "This contains some kind of random and shitty information",
     "Date__c": this.today.getDate(),
     "Session__c": 'Morning',
     "Value__c": 1.5     
}; 

handleUpdate(e){
//alert(e.target.value);
changeTaskStatus({recordId: this.sampObject.Id}).then(()=>{
  alert("UPDATED");
}).then(()=>{
  location.reload();
});
}

renderedCallback(){
  // var cls=this.template.querySelectorAll('.details');
  console.log("TEMPLATE= " +'IMAG= '+this.backImg);
  // cls.backgroundImage=this.backImg;
  var current=new Date();
  var currTime=current.getHours();
  
  if(this.sampObject.isRecurring__c){
    //this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.display='none';
  }

  if(this.sampObject.Important__c){
    this.timeText='Scheduled Time: '+this.sampObject.newTestTime__c;
    this.template.querySelector('.last-container').classList.add('imp-cls');
  }

  switch(this.sampObject.Session__c){
  case "Morning":
  console.log(' TIME: '+currTime);
  if(currTime>=12 && current>=this.sampObject.Date__c && !this.sampObject.Completed__c){
    this.btnText='OVERDUE';
    this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.backgroundColor='Red';
    this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.color='#fff';
    this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.textShadow="-1px 1px 2px black";
  }
  else if(this.sampObject.Completed__c){
    this.btnText='COMPLETED';
    this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.backgroundColor='#61e90c';
    this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.color='#fff';
    this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.textShadow="-1px 1px 2px black";
  }
  else{
    this.btnText='PENDING';
  }
  this.template.querySelector('.last-container').classList.add('morning-cls');
  break;
  case "Afternoon":
    if(currTime>=18 && current>=this.sampObject.Date__c &&  !this.sampObject.Completed__c){
      this.btnText='OVERDUE';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.backgroundColor='Red';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.color='#fff';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.textShadow="-1px 1px 2px black";
    }
    else if(this.sampObject.Completed__c){
      this.btnText='COMPLETED';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.backgroundColor='#61e90c';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.color='#fff';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.textShadow="-1px 1px 2px black";
    }
    else{
      this.btnText='PENDING';
    }  
  console.log(this.sampObject.Session__c);
  this.template.querySelector('.last-container').classList.add('afternoon-cls');
  break;
  case "Night":
    if(current>=this.sampObject.Date__c){
      this.btnText='OVERDUE';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.backgroundColor='Red';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.color='#fff';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.textShadow="-1px 1px 2px black";
    }
    else if(this.sampObject.Completed__c){
      this.btnText='COMPLETED';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.backgroundColor='#61e90c';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.color='#fff';
      this.template.querySelector(`[data-id="${this.sampObject.Id}"]`).style.textShadow="-1px 1px 2px black";
    }
    else{
      this.btnText='PENDING';
    }  
  console.log(this.sampObject.Session__c);
  this.template.querySelector('.last-container').classList.add('night-cls');
  break;
  }
}


handleEdit(){
   // Creates the event with the contact ID data.
   const selectedEvent = new CustomEvent('edit', { detail: this.sampObject });

   // Dispatches the event.
   this.dispatchEvent(selectedEvent);
}
}