<script lang="ts">
import { defineComponent } from 'vue';
import CountryService from '@/services/CountryService';
import { ref, onMounted } from 'vue';
import { Country } from '@/types';

export default defineComponent({
  name: 'MedalTable',
  setup() {
    const countries = ref<Country[] | null>(null);

    onMounted(() => {
      CountryService.getCountries()
        .then((response) => {
          countries.value = response.data;
          console.log(countries.value);
        })
        .catch((error) => {
          console.error('There was an error fetching countries!', error);
        });
    });

    return {
      countries,
    };
  },
});
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 text-center">
        <h1 class="text-3xl font-bold">Olympic Medal Table</h1>
      </div>
      <div class="col-span-12">
        <table class="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-300 py-2 px-4">Rank</th>
              <th class="border border-gray-300 py-2 px-4">NOC</th>
              <th class="border border-gray-300 py-2 px-4">Gold</th>
              <th class="border border-gray-300 py-2 px-4">Silver</th>
              <th class="border border-gray-300 py-2 px-4">Bronze</th>
              <th class="border border-gray-300 py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="country in countries" :key="country.rank" class="text-center">
              <td class="border border-gray-300 py-2 px-4">{{ country.rank }}</td>
              <td class="border border-gray-300 py-2 px-4 flex items-center justify-start">
                <img :src="country.flagUrl" alt="Flag" class="w-8 h-6 mr-2" />
                {{ country.countryname }}
              </td>
              <td class="border border-gray-300 py-2 px-4">{{ country.gold }}</td>
              <td class="border border-gray-300 py-2 px-4">{{ country.silver }}</td>
              <td class="border border-gray-300 py-2 px-4">{{ country.bronze }}</td>
              <td class="border border-gray-300 py-2 px-4">{{ country.count }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styling if needed */
</style>
