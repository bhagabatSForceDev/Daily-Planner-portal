import { track,LightningElement } from 'lwc';

export default class Ep_sample_navigate_button extends LightningElement {
   @track selected=false;

   handleSelected(){
    this.selected=true;
   }

   handleUnselected(){
    this.selected=false;
   }

}