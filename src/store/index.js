import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            posts: [],
            pages: 0
        }
    },
    mutations: {
        SET_POSTS(state, payloads) {
            state.posts = payloads
        }
    },
    actions: {
        getAll(context, params) {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((response) => response.json())
                .then(posts => {
                    const filtered_posts = posts.filter(post => post.title.includes(params.title))

                    const sorted_post = filtered_posts.sort((a, b) => {
                        const titleA = a.title.toUpperCase();
                        const titleB = b.title.toUpperCase();
                        if (titleA < titleB) {
                            return params.sort === 'ascending' ? -1 : 1;
                        }
                        if (titleA > titleB) {
                            return params.sort === 'ascending' ? 1 : -1;
                        }
                        return 0;
                    })

                    context.state.pages = Math.round(sorted_post.length/params.per_page)

                    function paginate(array, per_page, current_page) {
                        return array.slice((current_page - 1) * per_page, current_page * per_page);
                    }

                    context.commit('SET_POSTS', paginate(sorted_post, params.per_page, params.current_page))
                })
        },
        sort() { },
    },
    getters: {
        posts: (state) => state.posts,
        pages: (state) => state.pages,
    }
})

export default store