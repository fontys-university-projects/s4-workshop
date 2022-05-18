<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      as="div"
      class="fixed inset-0 z-40 flex lg:hidden"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="transition ease-in-out duration-300 transform"
        enter-from="-translate-x-full"
        enter-to="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leave-from="translate-x-0"
        leave-to="-translate-x-full"
      >
        <div
          class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-indigo-700"
        >
          <TransitionChild
            as="template"
            enter="ease-in-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in-out duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="absolute top-0 right-0 pt-2 -mr-12">
              <button
                type="button"
                class="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="sidebarOpen = false"
              >
                <span class="sr-only">Close sidebar</span>
                <XIcon class="w-6 h-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </TransitionChild>
          <div class="flex items-center flex-shrink-0 px-4">
            <h1 class="text-lg font-medium leading-6 text-white">Dashboard</h1>
          </div>
          <nav
            class="flex-shrink-0 h-full mt-5 overflow-y-auto divide-y divide-indigo-300 dark:divide-indigo-800"
            aria-label="Sidebar"
          >
            <div class="px-2 space-y-1">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="flex items-center px-2 py-2 text-base font-medium text-indigo-100 rounded-md hover:text-white hover:bg-indigo-400 dark:hover:bg-indigo-600 group"
                :aria-current="item.current ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  class="flex-shrink-0 w-6 h-6 mr-4 text-indigo-200"
                  aria-hidden="true"
                />
                {{ item.name }}
              </router-link>
            </div>
          </nav>
        </div>
      </TransitionChild>
      <div class="flex-shrink-0 w-14" aria-hidden="true">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div
    class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:top-16"
  >
    <!-- Sidebar component, swap this element with another sidebar if you like -->
    <div
      class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-indigo-600 dark:bg-indigo-800"
    >
      <div class="flex items-center flex-shrink-0 px-4">
        <h1 class="text-lg font-medium leading-6 text-white">Dashboard</h1>
      </div>
      <nav
        class="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-indigo-900"
        aria-label="Sidebar"
      >
        <div class="px-2 space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-indigo-100 rounded-md hover:text-white hover:bg-indigo-400 dark:hover:bg-indigo-600group"
            :aria-current="item.current ? 'page' : undefined"
          >
            <component
              :is="item.icon"
              class="flex-shrink-0 w-6 h-6 mr-4 text-indigo-200"
              aria-hidden="true"
            />
            {{ item.name }}
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  BellIcon,
  StarIcon,
  PlusCircleIcon,
  HomeIcon,
  MenuAlt1Icon,
  XIcon,
} from "@heroicons/vue/outline";
const navigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Events", href: "/dashboard/events", icon: StarIcon },
  {
    name: "Create Event",
    href: "/dashboard/eventCreate",
    icon: PlusCircleIcon,
  },
];

export default {
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    BellIcon,
    MenuAlt1Icon,
    XIcon,
  },
  setup() {
    const sidebarOpen = ref(false);

    return {
      navigation,
      sidebarOpen,
    };
  },
  methods: {
    openSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
};
</script>

<style scoped>
a.router-link-exact-active {
  @apply bg-indigo-700 dark:bg-indigo-900 text-white;
}
</style>
