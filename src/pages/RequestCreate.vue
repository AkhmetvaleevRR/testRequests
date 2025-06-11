<template>
  <div class="request-create"> 
    <ui-button 
      type="secondary" 
      class="back-button" 
      @click="router.back()"
    >
      Назад
    </ui-button>
    <h1>Создание заявки</h1>
    
    <RequestForm
      :categories="categories"
      submit-text="Сохранить"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useRequestStore } from '@/entities/request/requestStore';
import RequestForm from '@/features/RequestForm.vue';
import uiButton from '@/shared/components/uiButton.vue';
import type { RequestCategory, RequestFormData } from '@/entities/request/types';

const router = useRouter();
const requestStore = useRequestStore();

const categories = ref<RequestCategory[]>([
  'Первая',
  'Вторая',
  'Третья',
  'Другая',
]);

const handleSubmit = (formData: RequestFormData) => {
  requestStore.addRequest(formData);
  router.push({ name: 'requests' });
};
</script>

<style scoped>
.request-create {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>