import { defineComponent, createApp } from './vendor/vue.esm-browser.js';

const Component = defineComponent({
  name: 'Component',
});

const vm = createApp({
  data() {
    return {
      argA: 0,
      argB: 0,
      actions: '',
    };
  },
  computed: {
    result: (vm) => {
      if (!vm.actions) {
        return 0;
      }

      if (vm.actions === '+') {
        return vm.argA + vm.argB;
      } else if (vm.actions === '-') {
        return vm.argA - vm.argB;
      } else if (vm.actions === '*') {
        return vm.argA * vm.argB;
      } else {
        return vm.argA / vm.argB;
      }
    },
  },
}).mount('#app');
// Создайте Vue приложение
