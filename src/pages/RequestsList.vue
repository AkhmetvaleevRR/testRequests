<template>
  <div class="requests-list">
    <h1>Список заявок</h1>
    
     <ui-button 
      type="primary"
      @click="navigateToCreate"
    >
      Создать заявку
    </ui-button>
    
    <div v-if="requests.length === 0" class="empty-list">
      Нет заявок
    </div>
    
    <ul v-else class="requests">
      <li 
        v-for="request in requests" 
        :key="request.id"
        class="request-item"
      >
        <RequestCard 
          :request="request" 
          @click="navigateToDetail(request.id)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useRequestStore } from '@/entities/request/requestStore';
import RequestCard from '@/widgets/RequestCard.vue';
import uiButton from '@/shared/components/uiButton.vue';

const router = useRouter();
const requestStore = useRequestStore();

const requests = computed(() => requestStore.requests);

const navigateToCreate = () => {
  router.push({ name: 'request-create' });
};

const navigateToDetail = (id: string) => {
  router.push({ name: 'request-detail', params: { id } });
};
</script>

<style scoped>
.requests-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.create-btn {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.create-btn:hover {
  background-color: #3aa876;
}

.empty-list {
  padding: 20px;
  text-align: center;
  color: #666;
}

.requests {
  list-style: none;
  padding: 0;
}

.request-item {
  margin-bottom: 15px;
  cursor: pointer;
}
</style>