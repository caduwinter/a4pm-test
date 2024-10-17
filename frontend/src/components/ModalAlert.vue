<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-title">
        <h3>{{ title }}</h3>
      </div>
      <div class="modal-message">
        <p>{{ message }}</p>
        <button class="close-btn" @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Atenção",
    },
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-title {
  padding: 1em;
  background-color: #5e61cd;
  color: white;
  border-radius: 8px;
}
.modal-title h3 {
  margin: 0;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  border-radius: 8px;
  text-align: center;
}
.modal-message {
  padding: 1em;
}
.close-btn {
  color: white;
  background: #b25549;
  border: none;
  padding: 8px;
  cursor: pointer;
  border-radius: 12px;
}
</style>
