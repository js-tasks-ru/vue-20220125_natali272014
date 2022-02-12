<template>
  <div class="wrapper">
    <meetups-header />
    <main class="main">
      <div>
        <router-view />
      </div>
    </main>
    <meetups-footer />
  </div>
</template>

<script>
import MeetupsHeader from './components/MeetupsHeader';
import MeetupsFooter from './components/MeetupsFooter';
import PageIndex from './views/PageIndex';

export default {
  name: 'App',

  components: {
    MeetupsFooter,
    MeetupsHeader,
    PageIndex,
  },
};
</script>

<style>
@import '~@/assets/styles/_fonts.css';
@import '~@/assets/styles/_variables.css';
@import '~@/assets/styles/_common.css';

.wrapper {
  background-color: var(--grey-light);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}
</style>
