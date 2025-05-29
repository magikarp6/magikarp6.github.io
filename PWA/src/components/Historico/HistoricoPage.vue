<template>
  <main class="container py-4">
    <Header :pageTitle="textos[language].historico" />

    <section class="search-section mb-4">
      <SearchBar :search-query="searchQuery" @update-search="updateSearch" />
    </section>

    <section>
      <div v-if="auditoriasFiltradas.length === 0" class="sem-historico-msg">
        {{ textos[language].semHistorico }}
      </div>
      <div v-else>
        <HistoricoItem
          v-for="(auditoria, i) in auditoriasFiltradas"
          :key="i"
          :auditoria="auditoria"
          :nome="auditoria.nome"
        />
      </div>
    </section>

    <TabBar />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import SearchBar from "@/components/Auditorias/SearchBar.vue";
import HistoricoItem from "./HistoricoItem.vue";
import Header from "@/components/Auditorias/Header.vue";
import TabBar from "@/components/Auditorias/TabBar.vue";
import { textos } from '@/i18n.js';
const language = ref(localStorage.getItem('language') || 'pt');

const searchQuery = ref("");
const auditorias = ref([]);

function updateSearch(event) {
  searchQuery.value = event.target.value;
}

onMounted(() => {
  const dados = localStorage.getItem("historicoFormularios");
  if (dados) {
    try {
      auditorias.value = JSON.parse(dados);
    } catch (e) {
      console.error("Erro ao carregar histórico do localStorage:", e);
      auditorias.value = [];
    }
  }
});

const auditoriasFiltradas = computed(() =>
  auditorias.value.filter(a =>
    a.descricao?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>

<style scoped>
.container {
  min-height: 100vh;
}

.sem-historico-msg {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #666;
  padding: 40px 20px;
}
</style>