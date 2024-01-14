<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

import store from '../store'

const params = reactive({
    current_page: 1,
    per_page: 10,
    title: '',
    sort: 'ascending'
})

const posts = computed(() => store.getters.posts)
const pages = computed(() => store.getters.pages)

// methods
const fetchData = (params) => {
    store.dispatch('getAll', params)
}

const sort = () => {
    params.current_page = 1
    setTimeout(() => {
        fetchData(params)
    })
}

const search = (event) => {
    params.current_page = 1
    setTimeout(() => {
        fetchData(params)
    })
}

const goPage = (page) => {
    params.current_page = page
    setTimeout(() => {
        fetchData(params)
    })
}

const previous = () => {
    if (params.current_page > 1) {
        params.current_page--
        setTimeout(() => {
            fetchData(params)
        })
    }
}
const next = () => {
    if (params.current_page < pages.value) {
        params.current_page++
        setTimeout(() => {
            fetchData(params)
        })
    }
}

onMounted(() => {
    fetchData(params)
})

</script>
<template>
    <div class="flex items-center justify-between">
        <form>
            <select v-model="params.sort" @change="sort" name="sort" class="px-3 py-2 border bg-blue-100">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
            </select>
        </form>
        <div>
            <form>
                <input v-model="params.title" @input="search" class="border bg-blue-100 py-1 px-3" type="search"
                    name="title" placeholder="Search by title">
                <button class="bg-blue-600 hover:bg-blue-500 text-white py-1 px-2">Search</button>
            </form>
        </div>
    </div>
    <table class="w-full border my-3">
        <thead>
            <tr>
                <th class="bg-blue-600 p-2 text-white text-start">Title</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(post, index) in posts" :key="index">
                <td class="p-2 hover:bg-blue-100 border-b">{{ post.title }}</td>
            </tr>
        </tbody>
    </table>
    <div class="flex justify-end">
        <div class="flex items-center gap-x-3">
            <button class="w-8 h-8 bg-blue-500 text-white hover:bg-blue-900 disabled:bg-blue-300" @click="previous"
                :disabled="params.current_page === 1">{{ `<<` }} </button>
                    <button v-for="(page, index) in pages" class="cursor-pointer bg-blue-100 w-8 h-8"
                        :class="{ 'text-blue-500': params.current_page === page }" @click="goPage(page)"
                        :key="`tabel-footer-paginator-${index}`">
                        {{ page }}
                    </button>
                    <button class="w-8 h-8 bg-blue-500 text-white hover:bg-blue-900 disabled:bg-blue-300" @click="next"
                        :disabled="params.current_page === pages">{{ `>>` }}</button>
        </div>
    </div>
</template>