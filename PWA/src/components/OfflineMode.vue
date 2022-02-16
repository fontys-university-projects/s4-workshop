<template>
  <div>
    <img alt="Offline" src="../assets/undraw_server_down_s-4-lk.svg" />
    <h1>Oh.. Umm.. You seem to be offline at the moment</h1>
    <a @click="reloadPage">when you have internet again click here</a>
  </div>
</template>
<script>
export default {
  methods: {
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>
