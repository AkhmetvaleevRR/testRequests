<template>
  <div class="modal-overlay" @click.self="handleClose">
    <div class="modal">
      <ui-button 
        class="close-btn"
        type="secondary"
        @click="handleClose"
      >
        x
      </ui-button>
      <h2>Редактирование заявки</h2>
      <RequestForm
        :categories="categories"
        :submit-text="'Сохранить изменения'"
        :initial-data="initialFormData"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RequestForm from './RequestForm.vue';
import uiButton from '@/shared/components/uiButton.vue';
import type { Request, RequestCategory, RequestFormData } from '@/entities/request/model/types';

const props = defineProps<{
  request: Request;
  categories: RequestCategory[];
}>();

const emit = defineEmits<{
  (e: 'submit', formData: RequestFormData): void;
  (e: 'close'): void;
}>();

const initialFormData = computed(() => ({
  title: props.request.title,
  description: props.request.description,
  category: props.request.category,
}));

const handleSubmit = (formData: RequestFormData) => {
  emit('submit', formData);
};

const handleClose = () => {
  emit('close');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

h2 {
  margin-top: 0;
}
</style>