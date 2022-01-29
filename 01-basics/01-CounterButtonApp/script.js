import { defineComponent, createApp } from './vendor/vue.esm-browser.js';

const Component = defineComponent({
  name: 'Component',
  data() {
    return {
      counter: 0,
    };
  },
});

const app = createApp(Component);
const vm = app.mount('#app');
