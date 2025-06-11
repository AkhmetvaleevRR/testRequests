<template>
  <div class="request-detail">
    <div v-if="request">
      <h1>{{ request.title }}</h1>
      <ui-button 
        type="secondary" 
        class="back-button" 
        @click="router.back()"
      >
        Назад
      </ui-button>
      
      <div class="meta">
        <span class="category">{{ request.category }}</span>
        <span class="date">{{ request.createdAt }}</span>
      </div>
      
      <p class="description">{{ request.description }}</p>
      
      <div class="actions">
        <ui-button 
           type="primary"
          @click="isEditModalOpen = true"
        >
          Редактировать
        </ui-button >
        
        <ui-button  
           type="danger"
          @click="handleDelete"
        >
          Удалить
        </ui-button >
      </div>
      
      <RequestModal
        v-if="isEditModalOpen"
        :request="request"
        :categories="categories"
        @submit="handleEdit"
        @close="isEditModalOpen = false"
      />
    </div>
    
    <div v-else class="not-found">
      Заявка не найдена
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useRequestStore } from '@/entities/request/requestStore';
import RequestModal from '@/features/RequestModal.vue';
import uiButton from '@/shared/components/uiButton.vue';
import type { RequestCategory, RequestFormData } from '@/entities/request/types';

const route = useRoute();
const router = useRouter();
const requestStore = useRequestStore();

const request = computed(() => 
  requestStore.getRequestById(route.params.id as string)
);

const isEditModalOpen = ref(false);

const categories = ref<RequestCategory[]>([
  'Первая',
  'Вторая',
  'Третья',
  'Другая',
]);

console.log(typeof(request.value?.createdAt))


const handleEdit = (formData: RequestFormData) => {
  if (request.value) {
    requestStore.updateRequest(request.value.id, formData);
    isEditModalOpen.value = false;
  }
};

const handleDelete = () => {
  if (request.value) {
    requestStore.deleteRequest(request.value.id);
    router.push({ name: 'requests' });
  }
};
</script>

<style scoped>
.request-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.meta {
  display: flex;
  gap: 15px;
  margin: 20px 0;
  color: #666;
}

.description {
  line-height: 1.6;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  gap: 10px;
}

.delete-btn {
  background-color: #ff4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.not-found {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>