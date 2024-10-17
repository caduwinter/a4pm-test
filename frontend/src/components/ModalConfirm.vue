<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h3><slot name="title"></slot></h3>
        <button @click="$emit('close')">✖</button>
      </div>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <div class="modal-footer">
        <button class="confirm-del-btn" @click="$emit('confirm')">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalConfirm",
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #fff;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #5e61cd;
  padding: 0 1em;
}
.modal-header button {
  background: transparent;
  color: white;
}

.modal-body {
  margin: 1rem 0;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.confirm-del-btn {
  background: #5e61cd;
  color: #fff;
  margin: auto;
  border-radius: 8px;
  margin-bottom: 8px;
}
</style>
