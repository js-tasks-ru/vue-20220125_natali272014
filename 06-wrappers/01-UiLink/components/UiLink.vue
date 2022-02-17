<template>
  <component :is="tag" class="link"> <slot /> </component>
  <!-- <a class="link">Link!</a> -->
</template>

<script>
export default {
  name: 'UiLink',

  props: {
    tag: {
      type: [String, Object],
      default: 'router-link',
    },
  },
};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
