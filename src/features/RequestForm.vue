<template>
  <form @submit.prevent="handleSubmit" class="request-form">
    <div class="form-group">
      <label for="title">Название заявки</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        required
      />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
    </div>
    
    <div class="form-group">
      <label for="description">Описание</label>
      <textarea
        id="description"
        v-model="formData.description"
        required
      ></textarea>
      <span v-if="errors.description" class="error">{{ errors.description }}</span>
    </div>
    
    <div class="form-group">
      <label for="category">Категория</label>
      <select
        id="category"
        v-model="formData.category"
        required
      >
        <option 
          v-for="category in categories" 
          :key="category" 
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>
    
    <button type="submit" class="submit-btn">
      {{ submitText }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { RequestCategory, RequestFormData } from '@/entities/request/model/types';

const props = defineProps<{
  categories: RequestCategory[];
  submitText?: string;
}>();

const emit = defineEmits<{
  (e: 'submit', formData: RequestFormData): void;
}>();

const formData = reactive<RequestFormData>({
  title: '',
  description: '',
  category: props.categories[0],
});

const errors = reactive({
  title: '',
  description: '',
});

const validate = () => {
  let isValid = true;
  
  if (!formData.title.trim()) {
    errors.title = 'Название обязательно';
    isValid = false;
  } else {
    errors.title = '';
  }
  
  if (!formData.description.trim()) {
    errors.description = 'Описание обязательно';
    isValid = false;
  } else {
    errors.description = '';
  }
  
  return isValid;
};

const handleSubmit = () => {
  if (validate()) {
    emit('submit', { ...formData });
  }
};
</script>

<style scoped>
.request-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
}

input, textarea, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.error {
  color: #ff4444;
  font-size: 0.9em;
}

.submit-btn {
  align-self: flex-start;
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #3aa876;
}
</style>