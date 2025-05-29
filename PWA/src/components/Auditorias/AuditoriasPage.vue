<template>
  <main class="container py-4">
    <Header :pageTitle="textos[language].auditorias" />

    <section class="mb-4 d-flex align-items-center" style="gap: 12px;">
      <SearchBar :search-query="searchQuery" @update-search="updateSearch" />
      <button
        @click="toggleOrder"
        class="btn-ordem"
        :title="orderAsc ? 'Prioridade crescente' : 'Prioridade decrescente'"
        type="button"
      >
        <span style="font-size: 1.2em; vertical-align: middle;">
  <svg v-if="orderAsc" width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M7 14l5-5 5 5" stroke="#495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M7 10l5 5 5-5" stroke="#495057" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</span>
      </button>
    </section>

    <section>
      <div v-if="auditoriasFiltradas.length === 0" class="sem-auditorias-msg">
        {{ textos[language].semAuditorias }}
      </div>
      <div v-else>
        <AuditItem
          v-for="auditoria in auditoriasFiltradas"
          :key="auditoria.id"
          :nome="auditoria.nome"
          :tipoAuditoria="auditoria.tipoAuditoria"
          :descricao="auditoria.descricao"
          :nomeLocal="auditoria.nomeLocal"
          :materiais="auditoria.materiais"
          :estado="auditoria.estado"
          :profissionaisDisponiveis="auditoria.profissionaisDisponiveis"
          :prioridade="auditoria.prioridade"
        />
      </div>
    </section>

    <TabBar />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import SearchBar from "./SearchBar.vue";
import Header from './Header.vue';
import TabBar from "./TabBar.vue";
import AuditItem from "./AuditItem.vue";
import { textos } from '@/i18n.js';
const language = ref(localStorage.getItem('language') || 'pt');

const searchQuery = ref("");
const auditorias = ref([]);
const userEmail = localStorage.getItem('googleUserEmail') || '';

const orderAsc = ref(false);
function toggleOrder() {
  orderAsc.value = !orderAsc.value;
}

const auditoriasFiltradas = computed(() => {
  let filtradas = auditorias.value.filter(a =>
    (
      Array.isArray(a.emailPeritos)
        ? a.emailPeritos.includes(userEmail)
        : a.emailPeritos === userEmail
    ) &&
    a.nome?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  return filtradas.sort((a, b) =>
    orderAsc.value
      ? (a.prioridade ?? 1) - (b.prioridade ?? 1)
      : (b.prioridade ?? 1) - (a.prioridade ?? 1)
  );
});

function updateSearch(value) {
  searchQuery.value = value;
}

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('auditorias')) || [];
  saved.forEach(a => {
    if (a.estado === "Pendente") a.estado = "Por Resolver";
  });
  auditorias.value = saved;
});
</script>

<style scoped>
.container {
  min-height: 100vh;
}

.sem-auditorias-msg {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #666;
  padding: 40px 20px;
}
.btn-ordem {
  background: #e9ecef;
  border: 1px solid #e9ecef;
  border-radius: 18px;
  padding: 6px 14px 6px 10px;
  font-size: 0.95em;
  color: #495057;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  min-height: 38px;
  box-shadow: none;
  margin-left: 0;
  transition: background 0.2s, border 0.2s, color 0.2s;
}
.btn-ordem:hover, .btn-ordem:focus {
  background: #d4d1d1;
  border-color: #d4d1d1;
  color: #222;
}
.ordem-label {
  font-size: 0.98em;
  font-weight: 500;
  letter-spacing: 0.01em;
}
</style>