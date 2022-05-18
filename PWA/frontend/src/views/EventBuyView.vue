<!--
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <!-- Product -->
      <div
        class="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16"
      >
        <!-- Product image -->
        <div class="lg:row-end-1 lg:col-span-4">
          <div
            class="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden"
          >
            <img
              :src="concert.logoURL"
              :alt="concert.name + ' cover image'"
              class="object-center object-cover"
            />
          </div>
        </div>

        <!-- Product details -->
        <div
          class="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3"
        >
          <div class="flex flex-col-reverse">
            <div class="mt-4">
              <h1
                class="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-300 sm:text-3xl"
              >
                {{ concert.name }}
              </h1>

              <h2 id="information-heading" class="sr-only">
                Product information
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-200 mt-2">
                Event date
                <time :datetime="convertDate(concert.date)">{{
                  convertDate(concert.date)
                }}</time>
              </p>
            </div>

            <div>
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <StarIcon
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    reviews.average > rating
                      ? 'text-yellow-400'
                      : 'text-gray-300',
                    'h-5 w-5 flex-shrink-0',
                  ]"
                  aria-hidden="true"
                />
              </div>
              <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
            </div>
          </div>

          <p class="text-gray-500 mt-6">{{ concert.description }}</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <button
              type="button"
              @click="submitPurchase()"
              class="w-full bg-indigo-600 dark:bg-indigo-800 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Buy Ticket
            </button>
          </div>
        </div>

        <div
          class="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4"
        >
          <TabGroup as="div">
            <div class="border-b border-gray-200">
              <TabList class="-mb-px flex space-x-8">
                <Tab as="template" v-slot="{ selected }">
                  <button
                    :class="[
                      selected
                        ? 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-500'
                        : 'border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400 hover:border-gray-300 dark:hover:border-gray-100',
                      'whitespace-nowrap py-6 border-b-2 font-medium text-sm',
                    ]"
                  >
                    Customer Reviews
                  </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                  <button
                    :class="[
                      selected
                        ? 'border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-500'
                        : 'border-transparent text-gray-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-400 hover:border-gray-300 dark:hover:border-gray-100',
                      'whitespace-nowrap py-6 border-b-2 font-medium text-sm',
                    ]"
                  >
                    FAQ
                  </button>
                </Tab>
              </TabList>
            </div>
            <TabPanels as="template">
              <TabPanel class="-mb-10">
                <h3 class="sr-only">Customer Reviews</h3>

                <div
                  v-for="(review, reviewIdx) in reviews.featured"
                  :key="review.id"
                  class="flex text-sm text-gray-500 dark:text-gray-300 space-x-4"
                >
                  <div class="flex-none py-10">
                    <img
                      :src="review.avatarSrc"
                      alt=""
                      class="w-10 h-10 bg-gray-100 rounded-full"
                    />
                  </div>
                  <div
                    :class="[
                      reviewIdx === 0 ? '' : 'border-t border-gray-200',
                      'py-10',
                    ]"
                  >
                    <h3 class="font-medium text-gray-900 dark:text-gray-50">
                      {{ review.author }}
                    </h3>
                    <p>
                      <time :datetime="convertDate(review.datetime)">{{
                        convertDate(review.datetime)
                      }}</time>
                    </p>

                    <div class="flex items-center mt-4">
                      <StarIcon
                        v-for="rating in [0, 1, 2, 3, 4]"
                        :key="rating"
                        :class="[
                          review.rating > rating
                            ? 'text-yellow-400'
                            : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0',
                        ]"
                        aria-hidden="true"
                      />
                    </div>
                    <p class="sr-only">{{ review.rating }} out of 5 stars</p>

                    <div
                      class="mt-4 prose prose-sm max-w-none text-gray-500 dark:text-gray-300"
                      v-html="review.content"
                    />
                  </div>
                </div>
              </TabPanel>

              <TabPanel class="text-sm text-gray-500">
                <h3 class="sr-only">Frequently Asked Questions</h3>

                <dl>
                  <template v-for="faq in faqs" :key="faq.question">
                    <dt
                      class="mt-10 font-medium text-gray-900 dark:text-gray-50"
                    >
                      {{ faq.question }}
                    </dt>
                    <dd
                      class="mt-2 prose prose-sm max-w-none text-gray-500 dark:text-gray-300"
                    >
                      <p>{{ faq.answer }}</p>
                    </dd>
                  </template>
                </dl>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StarIcon } from "@heroicons/vue/solid";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>Last year event was a blast, cannot wait to visit this one as well.</p>
      `,
      datetime: "2022-01-24T11:30:00.000Z",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>I am a big fan of few people who are going to be visiting this event, cannot wait!</p>
      `,
      datetime: "2022-02-13T14:25:00.000Z",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};
const faqs = [
  {
    question: "Can I request a paper ticket?",
    answer:
      "Yes you can reach customer service, to request a paper copy of your ticket!",
  },
  {
    question: "Can I share my ticket with a friend",
    answer:
      "No! Ticket purchases are only bound to the owner account, they cannot be shared or gifted to another person!",
  },
  // More FAQs...
];
</script>
<script>
const axios = require("axios");

export default {
  data() {
    return {
      concert: {},
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
        for (let index = 0; index < res.data.data.length; index++) {
          const element = res.data.data[index];
          if (element.cid === this.$route.query.event) {
            console.log(element);
            this.concert = element;
          }
        }
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
    submitPurchase() {
      let seat = Math.floor(Math.random() * (99 - 1 + 1)) + 1;
      let ticketData = {
        cid: this.$route.query.event,
        row: "1",
        seat: seat.toString(),
      };
      axios
        .post("http://192.168.31.173:5000/api/concert/ticketBuy", ticketData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          //Perform Success Action
          // console.log(res.data.data.accessToken);
          this.$router.push("/");
        })
        .catch((error) => {
          // error.response.status Check status code
          console.log(error);
        });
    },
  },
};
</script>
