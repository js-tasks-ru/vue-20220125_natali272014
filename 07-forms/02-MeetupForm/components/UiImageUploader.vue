<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === $options.States.LOADING }"
      :style="bgStyles"
      @click="delImage"
    >
      <span class="image-uploader__text">{{ textLoad }}</span>
      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="pickFile"
      />
    </label>
  </div>
</template>

<script>
const States = {
  NOFILE: 'NOFILE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
};

export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  States,

  emits: ['remove', 'select', 'upload', 'error'],

  data() {
    return {
      state: States.NOFILE,
      images: this.preview,
      id: 0,
    };
  },

  computed: {
    textLoad() {
      if (this.state == States.NOFILE) return 'Загрузить изображение';
      if (this.state == States.LOADING) return 'Загрузка...';
      else return 'Удалить изображение';
    },
    bgStyles() {
      if (this.images) return `--bg-url: url('${this.images}')`;
      else return '';
    },
  },

  created() {
    if (this.preview) this.state = States.SUCCESS;
  },

  methods: {
    get_image(file) {
      this.state = States.LOADING;
      this.uploader(file)
        .then((result) => {
          this.state = States.SUCCESS;
          this.$emit('upload', result);
        })
        .catch((error) => {
          this.$emit('error', error);
          this.state = States.NOFILE;
          this.$refs.input.value = '';
          this.images = null;
        });
    },
    pickFile() {
      let input = this.$refs.input;
      let file = input.files;
      this.$emit('select', file[0]);
      this.images = URL.createObjectURL(file[0]);
      if (this.uploader) this.get_image(file[0]);
      else this.state = States.SUCCESS;
    },
    delImage(event) {
      if (this.state === States.SUCCESS) {
        event.preventDefault();
        this.images = null;
        this.$emit('remove');
        this.state = States.NOFILE;
        this.$refs.input.value = '';
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
