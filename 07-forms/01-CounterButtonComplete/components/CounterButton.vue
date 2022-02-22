<template>
  <button @click="localCount = localCount + 1">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (this.localCount !== newValue) {
          this.localCount = newValue;
        }
      },
    },
    localCount: {
      deep: true,
      handler(newValue) {
        this.$emit('update:count', newValue);
      },
    },
  },
};
</script>
