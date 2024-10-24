<script lang="ts">
import { defineComponent } from 'vue';
import CountryService from '@/services/CountryService';
import { ref, onMounted, computed, watch } from 'vue';
import { Country } from '@/types';
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute();
    const totalCountry = ref(0);
    const countries = ref<Country[] | null>(null);

    // 从路由参数获取分页信息
    const perPage = computed(() => parseInt(route.query.perPage as string) || 5);
    const page = computed(() => parseInt(route.query.page as string) || 1);
    
    const hasNextPage = computed(() => {
      const totalPages = Math.ceil(totalCountry.value / perPage.value);
      return page.value < totalPages;
    });

    // 获取国家信息
    const fetchCountries = () => {
      CountryService.getCountries(perPage.value, page.value)
        .then((response) => {
          countries.value = response.data;
          totalCountry.value = parseInt(response.headers['x-total-count']);
        })
        .catch((error) => {
          console.error('There was an error fetching countries!', error);
        });
    };

    // 在组件挂载时获取国家信息
    onMounted(fetchCountries);

    // 监听分页参数的变化
    watch([page, perPage], () => {
      fetchCountries();
    });

    return {
      countries,
      totalCountry,
      page,
      perPage,
      hasNextPage
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
        
        <div class="flex w-[290px] mt-4">
          <RouterLink
            class="flex-1 text-blue-700 hover:underline text-left"
            :to="{ name: 'country', query: { page: page - 1, perPage: perPage } }"
            rel="prev"
            v-if="page != 1"
            >&#60; Prev Page</RouterLink
          >
    
          <RouterLink
            class="flex-1 text-blue-700 hover:underline text-right"
            :to="{ name: 'country', query: { page: page + 1, perPage: perPage } }"
            rel="next"
            v-if="hasNextPage"
            >Next Page &#62;</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add custom styling if needed */
</style>
