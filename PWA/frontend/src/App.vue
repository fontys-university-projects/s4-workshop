<template>
  <div>
    <Disclosure
      as="nav"
      class="relative z-10 bg-white shadow dark:shadow-lg dark:bg-gray-800"
      v-slot="{ open }"
    >
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex items-center flex-shrink-0">
              <img
                class="block w-auto h-8 lg:hidden"
                src="@/assets/default-monochrome.svg"
                alt="Workflow"
              />
              <img
                class="hidden w-auto h-8 lg:block"
                src="@/assets/default-monochrome.svg"
                alt="Workflow"
              />
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent dark:text-gray-300 hover:border-gray-300 dark:hover:text-white hover:text-gray-700"
              >
                Home
              </router-link>
              <router-link
                to="/event-shop"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent dark:text-gray-300 hover:border-gray-300 dark:hover:text-white hover:text-gray-700"
              >
                Event Shop
              </router-link>
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-1">
            <router-link
              v-if="role === 'PARTNER'"
              type="button"
              to="/dashboard"
            >
              <a
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Dashboard</a
              >
            </router-link>
            <router-link type="button" to="/scan-ticket">
              <a
                v-if="role === 'CHECKUP'"
                type="button"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >Scan Ticket</a
              >
            </router-link>
            <router-link type="button" to="/login">
              <a
                type="button"
                v-bind:class="
                  isLoggedIn
                    ? 'hidden'
                    : 'inline-flex items-center px-4 py-2 text-sm font-medium text-black dark:text-white bg-transparent border-2 border-indigo-600 rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                "
                >Sign In</a
              >
            </router-link>
            <router-link type="button" to="/register">
              <a
                type="button"
                v-bind:class="
                  isLoggedIn
                    ? 'hidden'
                    : 'inline-flex items-center px-4 py-2 text-sm font-medium text-black dark:text-white bg-transparent border-2 border-indigo-600 rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                "
                >Sign Up</a
              >
            </router-link>
            <a
              type="button"
              @click="logOut()"
              v-bind:class="
                !isLoggedIn
                  ? 'hidden'
                  : 'inline-flex items-center px-4 py-2 text-sm font-medium text-black dark:text-white bg-transparent border-2 border-indigo-600 rounded-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              "
              >Sign Out</a
            >
          </div>
          <div class="flex items-center -mr-2 sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block w-6 h-6" aria-hidden="true" />
              <XIcon v-else class="block w-6 h-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 dark:text-gray-200 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white"
          >
            <DisclosureButton class="font-medium">Tickets</DisclosureButton>
          </router-link>
          <router-link
            to="/event-shop"
            class="block py-2 pl-3 pr-4 text-base font-medium text-gray-500 dark:text-gray-200 border-l-4 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white"
          >
            <DisclosureButton class="font-medium">Event Shop</DisclosureButton>
          </router-link>
        </div>
        <div class="pt-4 pb-3 border-t border-gray-200">
          <div class="mt-3 space-y-1">
            <router-link to="/dashboard">
              <DisclosureButton
                as="a"
                class="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-800 hover:bg-gray-100"
                >Dashboard</DisclosureButton
              >
            </router-link>
            <router-link to="/scan-ticket">
              <DisclosureButton
                as="a"
                class="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-800 hover:bg-gray-100"
                >Scan Tickets</DisclosureButton
              >
            </router-link>
            <router-link to="/login">
              <DisclosureButton
                as="a"
                v-bind:class="
                  !isLoggedIn
                    ? 'hidden'
                    : 'block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-800 hover:bg-gray-100'
                "
                >Sign In</DisclosureButton
              >
            </router-link>
            <router-link to="/register">
              <DisclosureButton
                as="a"
                v-bind:class="
                  !isLoggedIn
                    ? 'hidden'
                    : 'block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-800 hover:bg-gray-100'
                "
                >Sign Up</DisclosureButton
              >
            </router-link>
            <DisclosureButton
              as="button"
              @click="logOut()"
              v-bind:class="
                isLoggedIn
                  ? 'hidden'
                  : 'block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-200 hover:text-gray-800 hover:bg-gray-100'
              "
              >Sign out</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <router-view />
  </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";
const axios = require("axios");

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MenuIcon,
    XIcon,
  },
  data() {
    return {
      isLoggedIn: null,
      role: null,
    };
  },
  mounted() {
    axios
      .get("http://192.168.31.173:5000/api/auth/status", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        //Perform Success Action
        // console.log(res.data.data.accessToken);
        this.isLoggedIn = true;
      })
      .catch(() => {
        // error.response.status Check status code
        this.isLoggedIn = false;
      });
    axios
      .get("http://192.168.31.173:5000/api/auth/role", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        //Perform Success Action
        // console.log(res.data.data.accessToken);
        this.role = res.data.data.role;
      });
  },
  methods: {
    logOut() {
      localStorage.removeItem("token");
      this.$router.go({ path: "/", replace: true });
    },
  },
};
</script>

<style>
nav a.router-link-exact-active {
  @apply border-indigo-500 text-gray-900 dark:text-white;
}
</style>
