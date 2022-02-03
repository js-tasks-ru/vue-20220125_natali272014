import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `<p class="meetup-description">{{ meetup.description }}</p>`,
});
