<template>
  <div>
    <Disclosure as="div" class="relative pb-32 overflow-hidden bg-sky-700">
      <div
        aria-hidden="true"
        class="absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0"
      >
        <div class="absolute inset-0 flex">
          <div class="w-1/2 h-full" style="background-color: #0a527b" />
          <div class="w-1/2 h-full" style="background-color: #065d8c" />
        </div>
        <div class="relative flex justify-center">
          <svg
            class="flex-shrink-0"
            width="1750"
            height="308"
            viewBox="0 0 1750 308"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M284.161 308H1465.84L875.001 182.413 284.161 308z"
              fill="#0369a1"
            />
            <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
            <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
            <path
              d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z"
              fill="#0a4f76"
            />
          </svg>
        </div>
      </div>
      <header class="relative py-10">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold text-white">Ticket Scanner</h1>
        </div>
      </header>
    </Disclosure>

    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
            <!-- This element is to trick the browser into centering the modal contents. -->
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
              >&#8203;</span
            >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
              >
                <div>
                  <div
                    class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100"
                  >
                    <StatusOnlineIcon
                      class="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <DialogTitle
                      as="h3"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Scanning Ticket
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Please approach the user's phone (by default on the back
                        of the device) and scan their code, or scan the physical
                        ticket
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <button
                    type="button"
                    class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    @click="open = false"
                  >
                    Cancel Process
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <main class="relative -mt-32">
      <div class="max-w-screen-xl px-4 pb-6 mx-auto sm:px-6 lg:pb-16 lg:px-8">
        <div class="overflow-hidden bg-white rounded-lg shadow">
          <div
            class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x"
          >
            <aside class="p-6 lg:col-span-4">
              <p
                v-if="nfcSupport == false"
                class="mt-1 text-sm text-gray-500 py-2"
              >
                This device doesn't support NFC, please use another method. We
                suggest using either QR scanning app on Android or Barcode
                scanner with keyboard functionality support on desktop.
                <u
                  >Note that QR Scanning might open new page if this website is
                  not installed as a PWA App!</u
                >
              </p>
              <button
                v-if="nfcSupport == true"
                type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="readTag()"
              >
                <StatusOnlineIcon
                  class="-ml-1 mr-3 h-5 w-5"
                  aria-hidden="true"
                />
                Scan Ticket
              </button>
            </aside>

            <div class="divide-y divide-gray-200 lg:col-span-8">
              <!-- Profile section -->
              <div
                v-for="ticket in tickets"
                :key="ticket.tid"
                class="px-4 py-6 sm:p-6 lg:pb-8"
              >
                <div>
                  <h2 class="text-lg font-medium leading-6 text-gray-900">
                    Ticket details
                  </h2>
                  <p class="mt-1 text-sm text-gray-500">
                    Please don't forget to compare the First and Last name of
                    the ticket and the user ID
                  </p>
                </div>

                <div class="grid grid-cols-12 gap-6 mt-6">
                  <div class="col-span-12 sm:col-span-6">
                    <label
                      for="first-name"
                      class="block text-sm font-medium text-gray-700"
                      >First name</label
                    >
                    <p
                      id="first-name"
                      class="block w-full px-3 py-2 mt-1 focus:outline-none sm:text-sm text-gray-500"
                    >
                      {{ ticket.user.firstName }}
                    </p>
                  </div>

                  <div class="col-span-12 sm:col-span-6">
                    <label
                      for="last-name"
                      class="block text-sm font-medium text-gray-700"
                      >Last name</label
                    >
                    <p
                      id="last-name"
                      class="block w-full px-3 py-2 mt-1 focus:outline-none sm:text-sm text-gray-500"
                    >
                      {{ ticket.user.lastName }}
                    </p>
                  </div>

                  <div class="col-span-12 sm:col-span-6">
                    <label
                      for="ticket-id"
                      class="block text-sm font-medium text-gray-700"
                      >Ticket ID</label
                    >
                    <p
                      id="ticket-id"
                      class="block overflow-clip text-ellipsis w-full px-3 py-2 mt-1 focus:outline-none sm:text-sm text-gray-500"
                    >
                      {{ ticket.tid }}
                    </p>
                  </div>

                  <div class="col-span-12 sm:col-span-6">
                    <label
                      for="event-name"
                      class="block text-sm font-medium text-gray-700"
                      >Event Name</label
                    >
                    <p
                      id="event-name"
                      class="block w-full px-3 py-2 mt-1 focus:outline-none sm:text-sm text-gray-500"
                    >
                      {{ ticket.concert.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  Disclosure,
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { StatusOnlineIcon } from "@heroicons/vue/outline";
const axios = require("axios");

const open = ref(false);
export default {
  components: {
    Disclosure,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    StatusOnlineIcon,
  },
  data() {
    return {
      loading: false,
      destroyed: false,
      nfcSupport: true,
      open,
      scanned: false,
      tickets: {},
    };
  },
  mounted() {
    axios
      .get(
        "http://localhost:5000/api/dashboard/scan-ticket?ticket=" +
          this.$route.query.ticket,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        //Perform Success Action
        console.log(res.data.data);
        this.tickets = res.data.data;
      })
      .catch((err) => {
        // error.response.status Check status code
        console.log(err);
      });
  },
  methods: {
    readTag: async function () {
      if ("NDEFReader" in window) {
        // eslint-disable-next-line no-undef
        const ndef = new NDEFReader();
        this.open = true;
        return new Promise((resolve, reject) => {
          const ctlr = new AbortController();
          ctlr.signal.onabort = reject;
          ndef.addEventListener(
            "reading",
            (event) => {
              ctlr.abort();
              resolve(event);
            },
            { once: true }
          );
          ndef
            .scan({ signal: ctlr.signal })
            .catch((err) => reject(err))
            .then(() => {
              ndef.onreading = (event) => {
                const decoder = new TextDecoder();
                for (const record of event.message.records) {
                  this.$router.push({
                    path: "/scan-ticket",
                    query: { ticket: decoder.decode(record.data) },
                  });
                }
              };
            });
        });
      } else {
        this.nfcSupport = false;
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-bottom: 20px;
}

.loading-indicator {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}
</style>
