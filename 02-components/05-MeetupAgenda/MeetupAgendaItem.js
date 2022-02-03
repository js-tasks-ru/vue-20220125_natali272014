import { defineComponent } from './vendor/vue.esm-browser.js';
import { agendaItemIcons, agendaItemDefaultTitles } from './meetupService.js';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    iconsSvg() {
      return '/assets/icons/icon-' + agendaItemIcons[this.agendaItem.type] + '.svg';
    },
    titleAgenda() {
      if (this.agendaItem.title) return this.agendaItem.title;
      else return agendaItemDefaultTitles[this.agendaItem.type];
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col" :data-test="agendaItem.type">      
        <img :src="iconsSvg" class="icon" :alt="\`\${agendaItem.type}\`" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3  class="agenda-item__title">{{ titleAgenda }}</h3>
        <template v-if="agendaItem.type === 'talk'">
          <p class="agenda-item__talk">
            <span>{{ agendaItem.speaker }}</span>
            <span class="agenda-item__dot"></span>
            <span class="agenda-item__lang">{{ agendaItem.language }}</span>
          </p>
        </template>
        <p v-if="agendaItem.description" >{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
