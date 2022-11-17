<script>
import {applyPureReactInVue} from 'veaury';
import {ref} from 'vue';

import ChatReactComponent from '../react_app/Chat.jsx';

const config = {
  APP_ID: "YOU_SENDBIRD_APP_ID", 
  USER_ID: "Bob_1",
  NICKNAME: "Bob"
}
export default {
  components: {
    Chat: applyPureReactInVue(ChatReactComponent)
  },
  setup() {
    const userRef = ref(null);
    const messageCountRef = ref(null);
    return {
      config:config,
      setSbUserInfo: (user)=>{
        userRef.value = user; 
      },
      setUnreadMessageCount: (count)=>{
        messageCountRef.value = count;
      },
      sbUserInfo: userRef,
      messageCount: messageCountRef
    }
  }
}
</script>

<template>
  <header class="header">
  <svg class="logo" viewBox="0 0 128 128" width="24" height="24" data-v-97393f76=""><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" data-v-97393f76=""></path><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-97393f76=""></path></svg>
    Your Vue.js App 
      <div class="message-count">
        <img class="message-icon" src="src/assets/message.png" alt=""/>
        <div class="current-count" v-if="messageCount> 0 ">{{messageCount}}</div>
      </div>
      <div class="nickname">{{sbUserInfo?.nickname}}</div>

  </header>

  <main>
      <Chat :config="config" :setSbUserInfo="setSbUserInfo" :setUnreadMessageCount="setUnreadMessageCount"/>
  </main>
</template>

<style scoped>
.nickname{
  display:inline;
  font-size:17px;
  float:right;
  margin-right: 8px;
}
.message-count{
  display:inline;
  position:relative;
  font-size:17px;
  float:right;
}

.message-icon{
  width: 32px;
  filter: invert(1);
}

.current-count{
  position: absolute;
  top: -5px;
  right: -8px;
  font-size: 12px;
  background: #d02929;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
}

.header{
  border-bottom: 1px solid #eaeaea;
  font-weight:700;
  background-color: #742ddd;
  padding:15px;
  color:white;
  font-size: 18px;
  box-shadow: 0px 0px 2px 0px #ccc;
}

.logo{
  display: inline-block;
  vertical-align:text-bottom;
}
</style>
