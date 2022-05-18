<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    class="relative px-4 pt-16 pb-20 bg-gray-50 dark:bg-gray-800 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
  >
    <div class="absolute inset-0">
      <div class="bg-white dark:bg-gray-900 h-1/3 sm:2/3" />
    </div>
    <div class="relative mx-auto max-w-7xl">
      <div class="text-center">
        <h2
          class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
        >
          Tickets
        </h2>
        <p
          class="max-w-2xl mx-auto mt-3 text-xl text-gray-500 dark:text-gray-200 sm:mt-4"
        >
          Here is your list of purchased tickets, you can reveal the QR code and
          show it on the checkup point
        </p>
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
    </div>
  </div>
</template>

<script>
import { QrcodeIcon } from "@heroicons/vue/solid";
import QRCode from "qrcode";
const axios = require("axios");

export default {
  name: "HomeView",
  components: {
    QrcodeIcon,
  },
  data() {
    return {
      tickets: [],
      qrcode: [],
    };
  },
  mounted() {
    axios
      .get("http://192.168.31.173:5000/api/concert/tickets", {
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
  computed: {
    listElementShow() {
      return this.tickets.filter((e) => e.hidden);
    },
  },
  methods: {
    toggleElement(index) {
      QRCode.toDataURL(
        "https://example.com/scan-ticket?ticket=" + this.tickets[index].tid
      )
        .then((url) => {
          this.qrcode[index] = url;
        })
        .catch((err) => {
          console.error(err);
        });
      this.tickets[index].hidden = !this.tickets[index].hidden;
    },
    convertDate(date) {
      const dateConversion = new Date(date);
      return dateConversion.toLocaleString();
    },
  },
};
</script>
