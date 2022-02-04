import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      meetups: null,
      error: null,
    };
  },

  watch: {
    meetupId(newValue, oldValue) {
      this.meetups = null
      this.error = null;
      fetchMeetupById(newValue).then((meetups) => {
        this.meetups = meetups;
      })
        .catch((error) => { this.error = error.message });
    },
  },

  mounted() {
    fetchMeetupById(this.meetupId).then((meetups) => {
      this.meetups = meetups;
      this.error = null;
    })
      .catch((error) => { this.error = error.message });
  },

  template: `
    <div class="page-meetup">    
      <meetup-view  v-if="meetups" :meetup="meetups"/>    
      <ui-container v-if="!error && !meetups">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="error">
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>
    </div>`,
});
