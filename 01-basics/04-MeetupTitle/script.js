import { defineComponent, createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

const Component = defineComponent({
  name: 'Component',
});

const vm = createApp({
  data() {
    return {
      meetups: null,
      valueRadio: 0,
    };
  },

  watch: {
    valueRadio: {
      handler(newValue, oldValue) {
        fetchMeetupById(newValue).then((meetups) => {
          vm.meetups = meetups;
        });
      },
    },
  },
}).mount('#app');
// Требуется создать Vue приложение
