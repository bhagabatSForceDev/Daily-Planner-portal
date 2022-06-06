import { api,LightningElement } from 'lwc';

export default class TestingHeadless extends LightningElement {

    @api invoke() {
        console.log("Hi, I'm an action.");
        eval("$A.get('e.force:refreshView').fire();");
      }
}