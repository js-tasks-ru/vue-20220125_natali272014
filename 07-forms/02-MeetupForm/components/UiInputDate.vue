<template>
  <ui-input ref="input" v-model="modelValueProxy" v-bind="$attrs" :type="type">
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
        this.$emit('update:modelValue', this.$refs.input.$refs.input.valueAsNumber);
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
