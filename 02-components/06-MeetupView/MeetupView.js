import { defineComponent } from './vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupCover from './MeetupCover.js';
import MeetupInfo from './MeetupInfo.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';
import MeetupAgenda from './MeetupAgenda.js';

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgendaItem,
    MeetupAgenda,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
      <meetup-cover :meetup="meetup"/>

      <ui-container>
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :meetup="meetup"/>

            <h3>Программа</h3>
             <meetup-agenda :agenda="meetup.agenda"/>
             <template v-if="meetup.agenda.length===0" >
                <ui-alert>Программа пока пуста...</ui-alert>
             </template>
          </div>
          <div class="meetup__aside">
            <meetup-info :meetup="meetup"/>
          </div>
        </div>
      </ui-container>
    </div>`,
});
