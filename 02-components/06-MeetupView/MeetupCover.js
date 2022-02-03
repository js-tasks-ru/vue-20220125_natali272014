import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupCover',

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div class="meetup-cover" :style="meetup.image && \`--bg-url: url('\${meetup.image}')\`">
        <h1 class="meetup-cover__title">{{ meetup.title }}</h1>
    </div>`,
});
