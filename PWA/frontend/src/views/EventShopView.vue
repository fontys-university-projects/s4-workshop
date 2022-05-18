<template>
  <div class="bg-white dark:bg-gray-900">
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="sr-only">Products</h2>

      <div
        class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <router-link
          v-for="concert in concerts"
          :key="concert.cid"
          :to="{ path: '/event-buy', query: { event: concert.cid } }"
          class="group"
        >
          <div
            class="w-full aspect-w-1 aspect-h-1 bg-indigo-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          >
            <img
              :src="concert.logoURL"
              :alt="concert.name + ' cover image'"
              class="w-full h-full object-center object-cover group-hover:opacity-75"
            />
          </div>
          <h3 class="mt-4 text-md text-indigo-600 dark:text-indigo-400">
            {{ concert.name }}
          </h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      concerts: [],
    };
  },
  mounted() {
    axios
      .get("http://192.168.31.173:5000/api/concert/concerts", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //Perform Success Action
        this.concerts = res.data.data;
      })
      .catch((err) => {
        // error.response.status Check status code
        console.log(err);
      });
  },
  methods: {
    convertDate(date) {
      const dateConversion = new Date(date);
      return dateConversion.toLocaleString();
    },
  },
};
</script>
