import { api,track, LightningElement } from 'lwc';
import saveQuestion from '@salesforce/apex/ep_questionAnswerClass.saveQuestion';
export default class Ep_Flow_Question_Screen extends LightningElement {

    @track question;
    @track answer;
    @api isSaved;
    
    handleQuestion(e){
     this.question=e.target.value;
    }

    handleAnswer(e){
    this.answer=e.target.value;
    }
    
    handleSave(){
     console.log("SAVED question: "+this.question+" answer:"+this.answer+'0125g000000g939AAA');
     saveQuestion({ ques: this.question, ans: this.answer, recType: '0125g000000g939AAA' }).then((result) => {
        alert('Saved');
        this.question='';
        this.answer='';
    })
    .catch((error) => {
        this.error = error;
        this.contacts = undefined;
    });;
           
    }

    

}