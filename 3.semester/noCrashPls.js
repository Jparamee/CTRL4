/* src="https://unpkg.com/vue@3/dist/vue.global.js"
const newObj = Vue.createApp({
    data() {
        return {
            shoppingList: ['snacks', 'kiwis', 'world domination'],
            newItem: ''
        }
    },
    methods: {
        addItem() { this.shoppingList.push(this.newItem); this.newItem = ''; },
        clearList() { this.shoppingList = []; }
    }
});
newObj.mount('#vueApp'); */