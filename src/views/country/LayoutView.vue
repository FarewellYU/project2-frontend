<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import type { Country } from '@/types'
import CountryService from '@/services/CountryService'

const country = ref<Country | null>(null)

const props = defineProps({
  countryid: {
    type: String,
    required: true
  }
})

const route = useRoute()

onMounted(() => {
  console.log('Mounted with props:', props)
  CountryService.getCountry(props.countryid)
    .then((response) => {
      country.value = response.data
      console.log('Country data fetched:', country.value) // Check if data is being fetched correctly
    })
    .catch((error) => {
      console.error('There was an error fetching the country data!', error)
    })
})
</script>

<template>
  <div v-if="country" class="bg-gray-100 min-h-screen">
    <div>
      <nav class="flex items-center justify-between relative bg-[#034078] shadow-md py-4">
        <!-- Left Section: Button -->
        <div>
          <router-link
            :to="{ name: 'country' }"
            class="text-[#41bde0] text-2xl px-12 rounded font-black tracking-wider transition duration-150 ease-in-out hover:text-[#41bde0d6]"
          >
            Olympic Medal Table
          </router-link>
        </div>

        <!-- Right Section: Links (now aligned to the right) -->
        <div class="ml-auto flex space-x-6">
          <router-link
            :to="{ name: 'detail-view', params: { countryid: props.countryid } }"
            :class="[
              'text-xl font-semibold transition duration-150 ease-in-out focus:outline-none hover:text-[#afb7c2]',
              route.name === 'detail-view' ? 'text-[#afb7c2]' : 'text-[#FEFCFB]'
            ]"
          >
            Country Details
          </router-link>
          <!-- Divider -->
          <div class="h-8 border-l-2 border-gray-400"></div>
          <router-link
            :to="{ name: 'sport-list-view', params: { id: props.countryid } }"
            :class="[
              'pr-12 text-xl font-semibold transition duration-150 ease-in-out focus:outline-none hover:text-[#afb7c2]',
              route.name === 'sport-list-view' ? 'text-[#afb7c2]' : 'text-[#FEFCFB]'
            ]"
          >
            Sports Table
          </router-link>
        </div>
      </nav>
    </div>

    <div>
      <RouterView :country="country" />
    </div>

    <div>Comment Cheer up</div>
  </div>

  <div v-else class="flex justify-center items-center min-h-screen">
    <p class="text-gray-700">Loading...</p>
  </div>
</template>
