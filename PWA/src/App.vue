<template>
  <v-offline
    online-class="online"
    offline-class="offline"
    @detected-condition="amIOnline"
  >
    <template v-if="online">
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </template>
    <template v-if="!online">
      <OfflineMode msg="Offline Mode" />
    </template>
  </v-offline>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import OfflineMode from "./components/OfflineMode.vue";
import { VOffline } from "v-offline";
export default {
  name: "App",
  components: {
    HelloWorld,
    OfflineMode,
    VOffline,
  },
  data() {
    return {
      online: true,
      onlineSlot: "online",
      offlineSlot: "offline",
    };
  },
  methods: {
    amIOnline(e) {
      console.log("am i online?: ", e);
      this.online = e;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
