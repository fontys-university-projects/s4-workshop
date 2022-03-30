<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    class="relative px-4 pt-16 pb-20 bg-gray-50 dark:bg-gray-700 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8"
  >
    <div class="absolute inset-0">
      <div class="bg-white dark:bg-gray-800 h-1/3 sm:h-full" />
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
        class="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none"
      >
        <div
          v-for="(concert, index) in concerts"
          :key="concert.title"
          class="flex flex-col overflow-hidden rounded-lg shadow-lg shadow-indigo-900 dark:shadow-indigo-500"
        >
          <div class="flex-shrink-0">
            <img
              class="object-cover w-full h-90"
              :src="concert.imageUrl"
              alt=""
            />
          </div>
          <div
            class="flex flex-col justify-between flex-1 p-6 text-center bg-white dark:bg-gray-900"
          >
            <div class="flex-1">
              <p
                class="text-xl font-semibold text-indigo-900 dark:text-indigo-500"
              >
                {{ concert.title }}
              </p>
              <p
                id="div1"
                v-if="!concert.hidden"
                class="mt-3 text-base text-gray-500 dark:text-gray-200"
              >
                {{ concert.description }}
              </p>
              <img
                v-if="concert.hidden"
                class="object-cover object-center w-40 h-40 mx-auto mt-3"
                :src="concert.ticket.qrCodeUrl"
                :alt="'Qr Image of ' + concert.title"
              />
            </div>
            <div>
              <button
                type="button"
                @click="toggleElement(index)"
                :key="index"
                class="inline-flex items-center px-6 py-3 mt-6 text-base font-medium text-white bg-indigo-900 border border-transparent rounded-md shadow-sm dark:bg-indigo-500 shadow-indigo-900 dark:shadow-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <QrcodeIcon class="w-5 h-5 mr-3 -ml-1" aria-hidden="true" />
                Reveal QR Code
              </button>
            </div>
            <div class="flex items-center mt-6">
              <div class="ml-3">
                <div class="flex space-x-1 text-sm text-gray-500">
                  <time :datetime="concert.datetime">
                    {{ concert.date }}
                  </time>
                  <span aria-hidden="true"> &middot; </span>
                  <span> Entrance {{ concert.ticket.entrance }}</span>
                  <span aria-hidden="true"> &middot; </span>
                  <span> Sector {{ concert.ticket.sector }}</span>
                  <span aria-hidden="true"> &middot; </span>
                  <span> Row {{ concert.ticket.row }}</span>
                  <span aria-hidden="true"> &middot; </span>
                  <span> Seat {{ concert.ticket.seat }}</span>
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
const concerts = [
  {
    title: "Twitch Con 2022 Amsterdam",
    href: "#",
    category: { name: "Gaming Festival" },
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
    imageUrl:
      "https://www.twitchcon.com/uploads/twitchcon2022-blogheader-1200x600-1.png",
    ticket: {
      qrCode:
        "2a5b8c3a2a6d440ceb3a3cacc030ddf5439a2fe21831d8e6aed885c4210e5455577c3f8ab89a011ec2f5995ea10ddeb6e6d6de0400e8d1ae77470d88b7a1807e2998d223f548c53b9689fb678e08d171db8423c35e19cd58f9dd0fa9ce9dcbce7569be2a",
      qrCodeUrl: "",
      entrance: "1",
      sector: "1C",
      row: "1",
      seat: "1",
    },
    hidden: false,
  },
  {
    title: "How to use search engine optimization to drive sales",
    href: "#",
    category: { name: "Video", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit facilis asperiores porro quaerat doloribus, eveniet dolore. Adipisci tempora aut inventore optio animi., tempore temporibus quo laudantium.",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    imageUrl:
      "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "4 min",
    ticket: {
      qrCode: "asd",
      entrance: "1",
      sector: "1",
      row: "1",
      seat: "1",
    },
    hidden: false,
  },
  {
    title: "Improve your customer experience",
    href: "#",
    category: { name: "Case Study", href: "#" },
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint harum rerum voluptatem quo recusandae magni placeat saepe molestiae, sed excepturi cumque corporis perferendis hic.",
    date: "Feb 12, 2020",
    datetime: "2020-02-12",
    imageUrl:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
    readingTime: "11 min",
    ticket: {
      qrCode: "asd",
      entrance: "1",
      sector: "1",
      row: "1",
      seat: "1",
    },
    hidden: false,
  },
];

export default {
  name: "HomeView",
  components: {
    QrcodeIcon,
  },
  data() {
    return {
      concerts,
    };
  },
  computed: {
    listElementShow() {
      return this.concerts.filter((e) => e.hidden);
    },
  },
  methods: {
    toggleElement(index) {
      QRCode.toDataURL(concerts[index].ticket.qrCode, function (err, url) {
        concerts[index].ticket.qrCodeUrl = url;
      });
      this.concerts[index].hidden = !this.concerts[index].hidden;
    },
  },
};
</script>
