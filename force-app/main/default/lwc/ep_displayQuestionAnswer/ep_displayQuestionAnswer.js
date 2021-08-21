import { track,wire,LightningElement } from 'lwc';
import getQuestionList from '@salesforce/apex/ep_questionAnswerClass.getQuestionList';
export default class Ep_displayQuestionAnswer extends LightningElement {

 @track allQuery=[];
 @track question;
 @track index=0;
 @track answer;   
    @wire(getQuestionList) query(result){
        if(result.data){
          console.log("REsult:"+result.data);
          this.allQuery=result.data;
          this.question=this.allQuery[this.index].Question;
          this.answer=this.allQuery[this.index].Answer;
          console.log(this.question + this.answer);
        }
        else{
          console.log('NO DATA');
        }
    };
    
    handlePrev(){
      if(this.index>0){
        this.index--;
        this.question=this.allQuery[this.index].Question;
        this.answer=this.allQuery[this.index].Answer;
      }
    }

    handleNext(){
       if(this.index<this.allQuery.length-1){
         this.index++;
         this.question=this.allQuery[this.index].Question;
         this.answer=this.allQuery[this.index].Answer;
       }  
    }

}