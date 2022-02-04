import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: ['agenda'],

  template: `
    <ul class="agenda">
      <li class="agenda__item">
        <template  v-for="agenda in agenda" :key="agenda.id" >
          <meetup-agenda-item :agenda-item="agenda"></meetup-agenda-item>
        </template>
      </li>
    </ul>`,
});
