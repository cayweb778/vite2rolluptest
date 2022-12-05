import './public-path'
import TokenPage from './TokenPage/index.vue'
import {createApp} from "vue";
function goTokenPage(){
  window.helloApp22=createApp(TokenPage)
  window.helloApp22.mount('#system-web2', true);
}
goTokenPage()

