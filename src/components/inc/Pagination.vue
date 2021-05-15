<template>
    <div class="overflow-auto my-5">
        <!-- <template v-if="items.total>0 && items.total>=items.per_page">
            <b-pagination-nav pills align="center" 
                :link-gen="linkGen" 
                :number-of-pages="Math.ceil(items.total/items.per_page)?Math.ceil(items.total/items.per_page):1" 
                use-router
            ></b-pagination-nav>
        </template> -->
        <template v-if="100 > 0 && 100 >= items.per_page">
            <b-pagination-nav pills align="center" 
                :link-gen="linkGen" 
                :number-of-pages="1" 
                use-router
            ></b-pagination-nav>
        </template>
        
    </div>
</template>

<script>
export default {
    props:{
        items:{
            type:Object,
            default:{},
        }
    },

    methods:{
        linkGen(pageNum) {
            return {
                    name: this.items.route,
                    // query: {...this.items.query, ...{page:pageNum}},
                    query: {page:pageNum}
                };
        }
    }
}
</script>