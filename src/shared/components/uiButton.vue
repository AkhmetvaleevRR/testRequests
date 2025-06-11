<template>
  <button
    :class="['button', `button--${type}`, { 'button--full-width': fullWidth }]"
    :type="type"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'primary' | 'danger' | 'secondary';
    fullWidth?: boolean;
  }>(),
  {
    type: 'primary',
    fullWidth: false,
  }
);

defineEmits(['click']);
</script>

<style scoped>
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.button--primary {
  background-color: #42b983;
  color: white;
}

.button--primary:hover {
  background-color: #3aa876;
}

.button--danger {
  background-color: #ff4444;
  color: white;
}

.button--danger:hover {
  background-color: #e03e3e;
}

.button--secondary {
  background-color: #f0f0f0;
  color: #333;
}

.button--secondary:hover {
  background-color: #e0e0e0;
}

.button--full-width {
  width: 100%;
}
</style>