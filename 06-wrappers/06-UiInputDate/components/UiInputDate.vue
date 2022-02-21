<template>
  <ui-input v-model="modelValueProxy" v-bind="$attrs" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',
  components: { UiInput },
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: Number,
  },

  emits: ['update:modelValue'],
  computed: {
    modelValueProxy: {
      get() {
        if (this.modelValue) return this.formatAsIsoDate(this.modelValue);
        else return this.modelValue;
      },
      set(value) {
        let year = 0,
          month = 0,
          day = 0,
          hour = 0,
          minute = 0,
          second = 0;

        if (value.length === 5) [hour, minute] = value.split(':');
        else if (value.length === 8) [hour, minute, second] = value.split(':');
        else if (value.length === 10) [year, month, day] = value.split('-');
        else if (value.length > 10) {
          [year, month, day] = value.split('-');
          [hour, minute] = value.split(':');
        }
        if (year + month + day + minute + second === 0) this.$emit('update:modelValue', NaN);
        else this.$emit('update:modelValue', Date.UTC(year, month, day, hour, minute, second));
      },
    },
  },
  methods: {
    formatAsIsoDate(timestamp) {
      if (this.type === 'date') return new Date(timestamp).toISOString().split('T')[0];
      else if (this.type === 'time' && this.$attrs.step % 60 !== 0)
        return new Date(timestamp).toISOString().split('T')[1].split('.')[0].substring(0, 5);
      else if (this.type === 'time' && this.$attrs.step % 60 === 0)
        return new Date(timestamp).toISOString().split('T')[1].split('.')[0].substring(0, 5);
      else if (this.type === 'time' && !this.$attrs.step)
        return new Date(timestamp).toISOString().split('T')[1].split('.')[0].substring(0, 5);
      else if (this.type === 'datetime-local') return new Date(timestamp).toISOString().substring(0, 16);
      else return new Date(timestamp);
    },
  },
};
</script>
