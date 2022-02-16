<template>
  <h1>asdasd</h1>
  <v-offline
    online-class="online"
    offline-class="offline"
    @detected-condition="amIOnline"
  >
    <template v-if="online">
      <div class="flex w-full h-full justify-center items-center text-6xl">
        ⚡️
      </div>
    </template>
    <template v-if="!online">
      <div class="flex w-full h-full justify-center items-center text-6xl">
        💩
      </div>
    </template>
  </v-offline>
</template>

<script>
import { VOffline } from "v-offline";
export default {
  components: {
    VOffline,
  },
  data() {
    return {
      online: null,
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
