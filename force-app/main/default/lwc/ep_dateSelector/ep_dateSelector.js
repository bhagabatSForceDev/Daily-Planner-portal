import { track,LightningElement } from 'lwc';

export default class Ep_dateSelector extends LightningElement {

    @track defDate;

    handleChange(e){
        console.log('e.target.value'+e.target.value);
        this.dispatchEvent(new CustomEvent('datechanged',{detail: e.target.value}));
    } 

    connectedCallback(){
        
        const d= new Date();
        this.defDate=d.toISOString();
        console.log('DATE::::'+this.defDate);
    }
}