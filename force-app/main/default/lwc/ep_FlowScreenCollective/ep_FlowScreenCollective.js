import { api,track,wire,LightningElement } from 'lwc';
import TaskInputIntro from './TaskInputIntro.html';
import propertyError from './propertyError.html';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';
import images from '@salesforce/resourceUrl/Custom_Images';
export default class Ep_FlowScreenCollective extends LightningElement {

@api flowScreenName;

@track introImg=images+'/CustomImages/how-to-create-daily-routine-hero-9abc3e09a46b49fe85b7038f65a5abbc.jpg'
    render() {
        switch(this.flowScreenName) {
            case "TaskInputIntro":
              return TaskInputIntro;
            default:
              return propertyError;
          }
    }

    handleGoNext() {
          const navigateNextEvent = new FlowNavigationNextEvent();
          this.dispatchEvent(navigateNextEvent);
      
  }    

}