<template>
  <div class="toasts">
    <template v-for="toast in toasts" :key="toast.i">
      <div v-if="toast.type === 1" class="toast toast_success">
        <ui-icon class="toast__icon" icon="check-circle" />
        <span>{{ toast.text }}</span>
      </div>

      <div v-if="toast.type === 2" class="toast toast_error">
        <ui-icon class="toast__icon" icon="alert-circle" />
        <span>{{ toast.text }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import UiIcon from './UiIcon';

export default {
  name: 'TheToaster',

  components: { UiIcon },

  data() {
    return {
      toasts: [
        {
          id: null,
          type: null,
        },
      ],
    };
  },

  methods: {
    success(text) {
      const toast = {
        id: this.toasts.length,
        type: 1,
        text,
      };

      this.handlerToast(toast);
    },

    error(text) {
      const toast = {
        id: this.toasts.length,
        type: 2,
        text,
      };

      this.handlerToast(toast);
    },
    handlerToast(newToast, timer = 5000) {
      this.toasts.push(newToast);

      setTimeout(() => {
        const toast = this.toasts.find((t) => t.id === newToast.id);
        this.toasts.splice(this.toasts.indexOf(toast), 1);
      }, timer);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
