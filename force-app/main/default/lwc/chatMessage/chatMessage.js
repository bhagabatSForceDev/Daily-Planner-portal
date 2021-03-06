import BaseChatMessage from 'lightningsnapin/baseChatMessage';
import { track } from 'lwc';
// import { loadStyle } from 'lightning/platformResourceLoader';
// import chatMessageStyle from '@salesforce/resourceUrl/chatMessageStyle';

const DEFAULT_MESSAGE_PREFIX = 'PLAIN_TEXT';
const RICHTEXT_MESSAGE_PREFIX = 'RICH_TEXT';
const YOUTUBE_MESSAGE_PREFIX = 'YOUTUBE';
const IMAGE_MESSAGE_PREFIX = 'IMAGE';
const URL_MESSAGE_PREFIX = 'URL'
const ALERT_MESSAGE_PREFIX = 'ALERT';
const OPENGRAPH_MESSAGE_PREFIX = 'OPENGRAPH';
const FLOW_MESSAGE_PREFIX = 'FLOW';
const BUTTON_MESSAGE_PREFIX = 'BUTTON';
const SUPPORTED_MESSAGE_PREFIX = [DEFAULT_MESSAGE_PREFIX,
     RICHTEXT_MESSAGE_PREFIX,
      YOUTUBE_MESSAGE_PREFIX,
      FLOW_MESSAGE_PREFIX,
       IMAGE_MESSAGE_PREFIX,
        URL_MESSAGE_PREFIX,
         ALERT_MESSAGE_PREFIX,
          OPENGRAPH_MESSAGE_PREFIX,
          BUTTON_MESSAGE_PREFIX];
const OPENGRAPH_API_KEY = 'YOUR_OPENGRAPH_API_KEY';

/**
 * Displays a chat message using the inherited api messageContent and is styled based on the inherited api userType and messageContent api objects passed in from BaseChatMessage.
 */
export default class ChatMessageDefaultUI extends BaseChatMessage {
    messageType = DEFAULT_MESSAGE_PREFIX;
    @track content = '';
    @track ogpMeta = {};
    @track linkMsg = "For more FAQ's click ";
    //@track flowMsg ="To Launch the flow click ";
    @track flowMsg = "To better assist you, click";
    @track lastflowMsg = "to start the claim";

    connectedCallback() {

        if (!this.isAgent) {
            return;
        }

        const messageTypePrefixPosition = SUPPORTED_MESSAGE_PREFIX.indexOf(this.messageContent.value.split(':')[0]);
        if (messageTypePrefixPosition > -1) {
            this.messageType = SUPPORTED_MESSAGE_PREFIX[messageTypePrefixPosition];
        }

        const contentValue = (this.messageContent.value.split(this.messageType + ':').length === 1) ? this.messageContent.value : this.messageContent.value.split(this.messageType + ':')[1];

        if (this.isPlainText) {
            this.content = contentValue;
        } else if (this.isYoutube) {
            this.content = 'https://www.youtube.com/embed/' + contentValue
        } else if (this.isImage) {
            this.content = this.extractOriginalString(contentValue);
        }else if(this.isFlow){
            this.content = this.extractOriginalString(contentValue);
        }else if(this.isButton){
            this.content = this.extractOriginalString(contentValue);
        }
         else if (this.isOGP) {
            // Promise.all([
            //     loadStyle(this, chatMessageStyle + '/style.css')
            // ]);
            // this.content = this.extractOriginalString(contentValue);
            // const urlEncoded = encodeURIComponent(this.content);
            // const requestURL = 'https://opengraph.io/api/1.1/site/' + urlEncoded + '?app_id=' + OPENGRAPH_API_KEY;
            // console.log('requestURL ======= ', requestURL);
            // fetch(requestURL, { method: "GET" })
            //     .then(response => {
            //         return response.json();
            //     })
            //     .then(jsonResponse => {
            //         if (jsonResponse.hybridGraph) {
            //             this.ogpMeta.title = jsonResponse.hybridGraph.title;
            //             this.ogpMeta.description = jsonResponse.hybridGraph.description;
            //             this.ogpMeta.image = jsonResponse.hybridGraph.image;
            //             this.ogpMeta.site_name = jsonResponse.hybridGraph.site_name;
            //         }
            //     })
        } else if (this.isAlert) {
            this.content = contentValue;
        } else if (this.isUrl) {
            this.content = this.extractOriginalString(contentValue);
            this.content = this.content.replace(/&amp;/g, '&')
            console.log('URL --------------'+this.content);
        } else {
            this.content = contentValue
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '\\"');
        }
    }

    extractOriginalString(generatedString) {
        const matched = generatedString.match(/<a href.+>(.*?)<\/a>/);
        if (matched!=undefined) {
            if (matched.length > 1) {
                return matched[1];
            }
        }
        return generatedString;
    }

    fallback(event) {
        event.target.onerror = null;
        event.target.style.display = 'none';
        event.target.style.height = 0;
    }

    get isAgent() {
        return this.userType === 'agent';
    }

    get isPlainText() {
        return this.messageType === DEFAULT_MESSAGE_PREFIX;
    }

    get isRichText() {
        return this.messageType === RICHTEXT_MESSAGE_PREFIX;
    }

    get isYoutube() {
        return this.messageType === YOUTUBE_MESSAGE_PREFIX;
    }

    get isImage() {
        return this.messageType === IMAGE_MESSAGE_PREFIX;
    }

    get isUrl() {
        return this.messageType === URL_MESSAGE_PREFIX;
    }

    get isOGP() {
        return this.messageType === OPENGRAPH_MESSAGE_PREFIX;
    }

    get hasOGPInfo() {
        return this.ogpMeta.title !== undefined;
    }

    get isAlert() {
        return this.messageType === ALERT_MESSAGE_PREFIX;
    }

    get isFlow() {
        return this.messageType === FLOW_MESSAGE_PREFIX;
    }

    get isButton() {
        console.log("Button Type");
        return this.messageType === BUTTON_MESSAGE_PREFIX;
    }
}