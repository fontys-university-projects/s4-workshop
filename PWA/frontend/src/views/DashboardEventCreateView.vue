<template>
  <div class="min-h-full">
    <DashboardSidebarComponent ref="sidebarRef" />

    <div class="flex flex-col flex-1 lg:pl-64">
      <main class="flex-1 pb-8">
        <!-- Page header -->
        <div class="bg-white shadow dark:bg-gray-800">
          <div class="px-4 sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
            <div class="py-6 md:flex md:items-center md:justify-between">
              <div class="flex-1 min-w-0">
                <!-- Profile -->
                <div class="flex items-center">
                  <button
                    type="button"
                    class="px-4 mr-4 text-gray-400 border-r border-gray-200 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
                    @click="openSidebar()"
                  >
                    <span class="sr-only">Open sidebar</span>
                    <MenuAlt1Icon class="w-6 h-6" aria-hidden="true" />
                  </button>
                  <div>
                    <div class="flex items-center">
                      <h1
                        class="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:leading-9 sm:truncate"
                      >
                        Create Event
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="mt-8 sm:mx-auto w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
        >
          <div
            class="px-4 py-8 bg-white shadow dark:bg-slate-800 sm:rounded-lg sm:px-10"
          >
            <form class="space-y-6" action="#" method="POST">
              <div>
                <label
                  for="event-name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Event Name
                </label>
                <div class="mt-1">
                  <input
                    id="event-name"
                    name="event-name"
                    type="text"
                    placeholder="Funny Beans"
                    required=""
                    v-model="form.name"
                    class="block w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  for="eventURL"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Event Cover Image (url)
                </label>
                <div class="mt-1">
                  <input
                    id="eventURL"
                    name="eventURL"
                    type="text"
                    placeholder="https://upload.wikimedia.org/wikipedia/commons/7/7e/Microsoft_Edge_logo_%282019%29.png"
                    required=""
                    v-model="form.logoURL"
                    class="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  for="description"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Event Description
                </label>
                <div class="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    required=""
                    placeholder="lorem ipsum"
                    v-model="form.description"
                    rows="3"
                    class="block w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <div class="grid grid-cols-2 gap-4 mt-1">
                  <div>
                    <label
                      for="date"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      placeholder="2022-03-28"
                      type="text"
                      required=""
                      v-model="form.date"
                      class="block w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      for="time"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Time
                    </label>
                    <input
                      id="time"
                      name="time"
                      type="text"
                      placeholder="16:20:00"
                      required=""
                      v-model="form.time"
                      class="block w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  for="location"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Location
                </label>
                <div class="mt-1">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required=""
                    placeholder="Rachelsmolen 1, 5612 MA Eindhoven"
                    v-model="form.location"
                    class="block w-full px-3 py-2 text-black placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { MenuAlt1Icon } from "@heroicons/vue/outline";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent.vue";
const axios = require("axios");
const cards = [
  {
    title: "Twitch Con 2022 Amsterdam",
    href: "#",
    datetime: "2022-03-28T14:20:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    stats: { name: "Total Tickets", value: 12 },
  },
  {
    title: "asd",
    href: "#",
    datetime: "2022-03-28T14:20:00.000Z",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    stats: { name: "Total Tickets", value: 12 },
  },
  // More items...
];

// "name": "Funny Beans",
//   "logoURL": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Microsoft_Edge_logo_%282019%29.png",
//   "description": "lorem ipsum",
//   "date": "2022-03-28",
//   "time": "16:20:00",
//   "location":"Rachelsmolen 1, 5612 MA Eindhoven"

export default {
  components: {
    MenuAlt1Icon,
    DashboardSidebarComponent,
  },
  setup() {
    return {
      cards,
      form: {
        name: "",
        logoURL: "",
        description: "",
        date: "",
        time: "",
        location: "",
      },
    };
  },
  methods: {
    openSidebar: function () {
      this.$refs.sidebarRef.openSidebar();
    },
    convertDate(date) {
      const dateConversion = new Date(date);
      return dateConversion.toLocaleString();
    },
    createEvent() {
      axios
        .post("http://localhost:5000/api/dashboard/create", this.form)
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
