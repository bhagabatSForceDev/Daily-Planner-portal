import { wire,track,LightningElement } from 'lwc';
import weeklyData from '@salesforce/apex/ep_Weekly.weekList';

export default class Ep_WeeklyDisplay extends LightningElement {
    options=[
        {label:'Education', value:'Education'},
        {label:'Physical', value:'Physical'},
        {label:'Entertainment', value:'Entertainment'}];

     value='Education';   
    
    edList=[];
   @track isEd=true;
    phyList=[];
    @track isPhy=false;
    entList=[];
    @track isEnt=false; 
        
    @wire(weeklyData) getWeekData(result){
        this.isEd=false;
        if(result.data){
            console.log("DATA---> "+JSON.stringify(result.data));
            let sampArr=result.data;
            this.isEd=true;
            for(let i=0;i<result.data.length;i++){
                if(sampArr[i].Category__c=='Education'){
                    this.edList.push(sampArr[i]);
                }
                else if(sampArr[i].Category__c=='Physical'){
                    this.phyList.push(sampArr[i]);
                }
                else if(sampArr[i].Category__c=='Entertainment'){
                    this.entList.push(sampArr[i]);
                }
            }
            console.log('EDLIST -->'+JSON.stringify(this.edList));
            console.log('PHYLIST -->'+JSON.stringify(this.phyList));
            console.log('ENTLIST -->'+JSON.stringify(this.entList));
        }
        else{
            console.log("ERROR");
        }
    }
     
     handleSelect(e){
         console.log("SELECTED VAL: "+e.target.value);
         this.value=e.target.value;
         if(this.value=='Education'){
            this.isEd=true;
            this.isPhy=false;
            this.isEnt=false;
         }
        else if(this.value=='Physical'){
            this.isEd=false;
            this.isPhy=true;
            this.isEnt=false;
        }
        else if(this.value=='Entertainment'){
            this.isEd=false;
            this.isPhy=false;
            this.isEnt=true;
        }
     }
}