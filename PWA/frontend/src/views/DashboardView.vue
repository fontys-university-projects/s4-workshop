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
                        {{ greetingsMessage() }}, Emilia Birch
                      </h1>
                    </div>
                    <dl
                      class="flex flex-col mt-6 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap"
                    >
                      <dt class="sr-only">Company</dt>
                      <dd
                        class="flex items-center text-sm font-medium text-gray-500 capitalize dark:text-gray-200 sm:mr-6"
                      >
                        <OfficeBuildingIcon
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-300"
                          aria-hidden="true"
                        />
                        Duke street studio
                      </dd>
                      <dt class="sr-only">Account status</dt>
                      <dd
                        class="flex items-center mt-3 text-sm font-medium text-gray-500 capitalize dark:text-gray-200 sm:mr-6 sm:mt-0"
                      >
                        <CheckCircleIcon
                          class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400 dark:text-green-500"
                          aria-hidden="true"
                        />
                        Verified account
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <h2
              class="text-2xl font-medium leading-6 text-gray-900 dark:text-white"
            >
              Overview
            </h2>
            <div
              class="grid grid-cols-1 gap-5 mt-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <!-- Card -->
              <div
                class="overflow-hidden bg-white shadow rounded-xl dark:bg-gray-800"
              >
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <FireIcon
                        class="w-8 h-8 text-gray-400 dark:text-gray-200"
                      />
                    </div>
                    <div class="flex-1 w-0 ml-5">
                      <dl>
                        <dt
                          class="text-base font-medium text-gray-500 truncate dark:text-gray-300"
                        >
                          Total Events
                        </dt>
                        <dd>
                          <div
                            class="text-lg font-medium text-gray-900 dark:text-white"
                          >
                            {{ tickets.length }}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="overflow-hidden bg-white shadow rounded-xl dark:bg-gray-800"
              >
                <div class="p-5">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <TicketIcon
                        class="w-8 h-8 text-gray-400 dark:text-gray-200"
                      />
                    </div>
                    <div class="flex-1 w-0 ml-5">
                      <dl>
                        <dt
                          class="text-base font-medium text-gray-500 truncate dark:text-gray-300"
                        >
                          Total Tickets
                        </dt>
                        <dd>
                          <div
                            class="text-lg font-medium text-gray-900 dark:text-white"
                          >
                            {{ concerts.length }}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2
            class="px-4 mx-auto mt-8 text-2xl font-medium leading-6 text-gray-900 max-w-7xl dark:text-white sm:px-6 lg:px-8"
          >
            Recent activity
          </h2>

          <!-- Activity list (smallest breakpoint only) -->
          <div class="shadow sm:hidden">
            <ul
              role="list"
              class="mt-2 overflow-hidden divide-y divide-gray-200 shadow sm:hidden"
            >
              <li v-for="ticket in tickets" :key="ticket.tid">
                <a
                  href="#"
                  class="block px-4 py-4 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <span class="flex items-center space-x-4">
                    <span class="flex flex-1 space-x-2 truncate">
                      <CashIcon
                        class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-200"
                        aria-hidden="true"
                      />
                      <span
                        class="flex flex-col text-sm text-gray-500 truncate dark:text-gray-300"
                      >
                        <span class="truncate"
                          >Ticket purchased by
                          {{
                            ticket.user.firstName + " " + ticket.user.lastName
                          }}</span
                        >
                        <time :datetime="convertDate(ticket.purchased)">{{
                          convertDate(ticket.purchased)
                        }}</time>
                      </span>
                    </span>
                    <ChevronRightIcon
                      class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-300"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Activity table (small breakpoint and up) -->
          <div class="hidden sm:block">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div class="flex flex-col mt-2">
                <div
                  class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-xl"
                >
                  <table
                    class="min-w-full divide-y divide-gray-200 dark:divide-gray-400"
                  >
                    <thead>
                      <tr>
                        <th
                          class="px-6 py-3 text-sm font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
                        >
                          Transaction
                        </th>
                        <th
                          class="px-6 py-3 text-sm font-medium tracking-wider text-right text-gray-500 uppercase text bg-gray-50 dark:bg-gray-800 dark:text-gray-200"
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="bg-white divide-y divide-gray-200 dark:divide-gray-400 dark:bg-gray-800"
                    >
                      <tr
                        v-for="ticket in tickets"
                        :key="ticket.tid"
                        class="bg-white dark:bg-gray-800"
                      >
                        <td
                          class="w-full px-6 py-4 text-sm text-gray-900 dark:text-gray-200 max-w-0 whitespace-nowrap"
                        >
                          <div class="flex">
                            <a
                              href="#"
                              class="inline-flex space-x-2 text-sm truncate group"
                            >
                              <CashIcon
                                class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-200 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <p
                                class="text-gray-500 truncate dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-400"
                              >
                                Ticket purchased by
                                {{
                                  ticket.user.firstName +
                                  " " +
                                  ticket.user.lastName
                                }}
                              </p>
                            </a>
                          </div>
                        </td>
                        <td
                          class="px-6 py-4 text-sm text-right text-gray-500 dark:text-gray-300 whitespace-nowrap"
                        >
                          <time :datetime="convertDate(ticket.purchased)">{{
                            convertDate(ticket.purchased)
                          }}</time>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { MenuAlt1Icon, FireIcon, TicketIcon } from "@heroicons/vue/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
} from "@heroicons/vue/solid";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent.vue";
const axios = require("axios");

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

export default {
  components: {
    CashIcon,
    CheckCircleIcon,
    ChevronRightIcon,
    MenuAlt1Icon,
    OfficeBuildingIcon,
    FireIcon,
    TicketIcon,
    DashboardSidebarComponent,
  },
  setup() {
    return {
      statusStyles,
    };
  },
  data() {
    return {
      tickets: [],
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
    axios
      .get("http://192.168.31.173:5000/api/dashboard/tickets", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //Perform Success Action
        this.tickets = res.data.data;
      })
      .catch((err) => {
        // error.response.status Check status code
        console.log(err);
      });
  },
  methods: {
    greetingsMessage() {
      let date = new Date();
      let hours = date.getHours();
      let message =
        hours < 12
          ? "Good Morning"
          : hours < 18
          ? "Good Afternoon"
          : "Good Evening";
      return message;
    },
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
