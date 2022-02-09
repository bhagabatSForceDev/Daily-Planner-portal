import { api,track,LightningElement } from 'lwc';

export default class Ep_sample_navigate_button extends LightningElement {
   @track selected=false;

   @api homelink;
   @api jiralink;
   @api revisionlink;

   handleSelected(){
    this.selected=true;
   }

   handleUnselected(){
    this.selected=false;
   }

}