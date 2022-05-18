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
                        Events List
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="m-5 overflow-hidden bg-white rounded-md shadow dark:bg-gray-800"
        >
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-600">
            <li v-for="concert in concerts" :key="concert.cid">
              <a href="#" class="block hover:bg-gray-50 dark:hover:bg-gray-700">
                <div class="px-4 py-4 sm:px-6">
                  <div class="flex items-center justify-between">
                    <p
                      class="text-sm font-medium text-indigo-600 dark:text-indigo-500 truncate"
                    >
                      {{ concert.name }}
                    </p>
                  </div>
                  <div class="mt-2 sm:flex sm:justify-between">
                    <div class="sm:flex">
                      <p
                        class="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-300 sm:mt-0"
                      >
                        <LocationMarkerIcon
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-200"
                          aria-hidden="true"
                        />
                        {{ concert.location }}
                      </p>
                    </div>
                    <div
                      class="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-300 sm:mt-0"
                    >
                      <CalendarIcon
                        class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-200"
                        aria-hidden="true"
                      />
                      <p>
                        Event date
                        {{ " " }}
                        <time :datetime="convertDate(concert.date)">{{
                          convertDate(concert.date)
                        }}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { MenuAlt1Icon } from "@heroicons/vue/outline";
import { CalendarIcon, LocationMarkerIcon } from "@heroicons/vue/solid";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent.vue";
const axios = require("axios");
const positions = [
  {
    id: 1,
    title: "Twitch Con 2022 Amsterdam",
    type: "Full-time",
    location: "Rachelsmolen 1, 5612 MA Eindhoven",
    eventDate: "2022-03-28T14:20:00.000Z",
  },
  {
    id: 2,
    title: "Front End Developer",
    type: "Full-time",
    location: "Rachelsmolen 1, 5612 MA Eindhoven",
    eventDate: "2021-08-07T13:20:00.000Z",
  },
  {
    id: 3,
    title: "User Interface Designer",
    type: "Full-time",
    location: "Rachelsmolen 1, 5612 MA Eindhoven",
    eventDate: "2022-06-13T11:20:00.000Z",
  },
];

export default {
  components: {
    MenuAlt1Icon,
    DashboardSidebarComponent,
    CalendarIcon,
    LocationMarkerIcon,
  },
  setup() {
    return {
      positions,
    };
  },
  data() {
    return {
      concerts: [],
    };
  },
  mounted() {
    axios
      .get("http://192.168.31.173:5000/api/dashboard/concerts", {
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
    openSidebar: function () {
      this.$refs.sidebarRef.openSidebar();
    },
    convertDate(date) {
      const dateConversion = new Date(date);
      return dateConversion.toLocaleString();
    },
  },
};
</script>
