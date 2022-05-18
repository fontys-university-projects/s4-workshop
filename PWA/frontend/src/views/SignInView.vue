<template>
  <div class="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="w-auto h-12 mx-auto"
        src="@/assets/default-monochrome.svg"
        alt="Workflow"
      />
      <h2
        class="mt-6 text-3xl font-extrabold text-center text-gray-900 dark:text-white"
      >
        Sign in to your account
      </h2>
      <p class="mt-2 text-sm text-center text-gray-600 dark:text-gray-300">
        Don't have an account?
        {{ " " }}
        <router-link
          to="/register"
          class="font-medium text-indigo-700 dark:text-indigo-500 hover:text-indigo-500"
        >
          Sign Up now and get ready to party!
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div
        class="px-4 py-8 bg-white shadow dark:bg-slate-800 sm:rounded-lg sm:px-10"
      >
        <form class="space-y-6" method="POST" v-on:submit.prevent="submitForm">
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required=""
                v-model="form.email"
                class="block w-full px-3 py-2 placeholder-gray-400 dark:placeholder-gray-700 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required=""
                v-model="form.password"
                class="block w-full px-3 py-2 placeholder-gray-400 dark:placeholder-gray-700 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div
            class="grid max-w-lg gap-3 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none"
          >
            <div
              v-for="(ticket, index) in tickets"
              :key="ticket.tid"
              class="flex flex-col overflow-hidden rounded-lg shadow-lg shadow-indigo-300 dark:shadow-indigo-500"
            >
              <div class="flex-shrink-0">
                <img
                  class="object-cover w-full h-80"
                  :src="ticket.concert.logoURL"
                  alt=""
                />
              </div>
              <div
                class="flex flex-col justify-between flex-1 p-4 text-center bg-white dark:bg-gray-900"
              >
                <div class="flex-1">
                  <p
                    class="text-xl font-semibold text-indigo-700 dark:text-indigo-500"
                  >
                    {{ ticket.concert.name }}
                  </p>
                  <p
                    id="div1"
                    v-if="!ticket.hidden"
                    class="mt-3 text-base text-gray-500 dark:text-gray-200"
                  >
                    {{ ticket.concert.description }}
                  </p>
                  <img
                    v-if="ticket.hidden"
                    class="object-contain object-center mx-auto mt-3 w-44 h-44"
                    :src="qrcode[index]"
                    :alt="'Qr Image of ' + ticket.concert.name"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    @click="toggleElement(index)"
                    :key="index"
                    class="inline-flex items-center px-6 py-3 mt-6 text-base font-medium text-white bg-indigo-700 border border-transparent rounded-md shadow-sm dark:bg-indigo-500 shadow-indigo-700 dark:shadow-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <QrcodeIcon class="w-5 h-5 mr-3 -ml-1" aria-hidden="true" />
                    Reveal QR Code
                  </button>
                </div>
                <div class="flex items-center justify-center mt-6">
                  <div class="">
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <time :datetime="convertDate(ticket.concert.date)">
                        {{ convertDate(ticket.concert.date) }}
                      </time>
                      <span> Entrance {{ ticket.entrance }}</span>
                      <span aria-hidden="true"> &middot; </span>
                      <span> Sector {{ ticket.sector }}</span>
                      <span aria-hidden="true"> &middot; </span>
                      <span> Row {{ ticket.row }}</span>
                      <span aria-hidden="true"> &middot; </span>
                      <span> Seat {{ ticket.seat }}</span>
                    </div>
                    <div class="flex space-x-1 text-sm text-gray-500">
                      <span>
                        Location
                        <a
                          class="text-indigo-500 underline dark:text-indigo-400"
                          :href="
                            `https://www.google.com/maps/search/?api=1&query= ` +
                            ticket.concert.location
                          "
                          target="_blank"
                          rel="noopener noreferrer"
                          >{{ ticket.concert.location }}</a
                        ></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      axios
        .post("http://192.168.31.173:5000/api/auth/login", this.form)
        .then((res) => {
          //Perform Success Action
          // console.log(res.data.data.accessToken);
          localStorage.setItem("token", res.data.data.accessToken);
          this.$router.go("/");
        })
        .catch((error) => {
          // error.response.status Check status code
          window.alert(error);
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
html {
  @apply h-full bg-gray-50;
}
body {
  @apply h-full;
}
</style>
