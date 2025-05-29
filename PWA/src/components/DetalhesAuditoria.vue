<template>
  <main class="auditoria">
    <Header pageTitle="Histórico de Auditorias" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <section class="content">
      <h2 class="section-title mb-4">Histórico de Submissões</h2>

      <div v-if="historico.length === 0" class="alert alert-info">
        Nenhum registo encontrado no histórico.
      </div>

      <div v-for="(registro, index) in historico" :key="index" class="registro-box mb-4 p-3 border rounded shadow-sm bg-white">
        <div class="row g-3">
          <div class="col-md-6">
            <h3 class="section-title">Datas</h3>
            <p><strong>Início:</strong> {{ formatDate(registro.dataInicio) }}</p>
            <p><strong>Fim:</strong> {{ formatDate(registro.dataFim) }}</p>
            <p><strong>Submetido em:</strong> {{ formatDate(registro.dataSubmissao) }}</p>
          </div>

          <div class="col-md-6">
            <h3 class="section-title">Localização</h3>
            <textarea class="form-control" rows="2" readonly>{{ registro.coordenadas }}</textarea>
          </div>

          <div class="col-md-6">
            <h3 class="section-title">Profissionais Envolvidos</h3>
            <ul>
              <li v-for="prof in registro.profissionais" :key="prof">{{ prof }}</li>
            </ul>
          </div>

          <div class="col-md-6">
            <h3 class="section-title">Número de Problemas</h3>
            <p>{{ registro.numeroProblemas }}</p>

            <h3 class="section-title mt-3">Tempo Total</h3>
            <p>{{ registro.tempoTotal }} min</p>
          </div>

          <div class="col-md-12">
            <h3 class="section-title">Materiais Utilizados</h3>
            <ul class="list-inline">
              <li v-for="mat in registro.materiais" :key="mat" class="list-inline-item badge bg-secondary me-1">{{ mat }}</li>
            </ul>
          </div>

          <div class="col-md-12">
            <h3 class="section-title">Descrição</h3>
            <p>{{ registro.descricao }}</p>
          </div>

          <div class="col-md-12">
            <h3 class="section-title">Ações Corretivas</h3>
            <p>{{ registro.acoesCorretivas || "Não especificado" }}</p>
          </div>

          <div class="col-md-12">
            <h3 class="section-title">Impacto Esperado</h3>
            <p>{{ registro.impacto || "Não especificado" }}</p>
          </div>

          <div class="col-md-12" v-if="registro.imagem">
            <h3 class="section-title">Imagem</h3>
            <img :src="registro.imagem" alt="Imagem da auditoria" class="img-fluid rounded shadow-sm" />
          </div>
        </div>
      </div>
    </section>

    <TabBar />
  </main>
</template>

<script setup>
import Header from './Auditorias/Header.vue'
import TabBar from './Auditorias/TabBar.vue'
import { ref, onMounted } from 'vue'

const historico = ref([])

onMounted(() => {
  // Carregar do localStorage
  const dados = JSON.parse(localStorage.getItem('historicoFormularios')) || []
  historico.value = dados
})

// Formatar datas para algo legível, ex: 2025-05-17 14:30
function formatDate(dataISO) {
  if (!dataISO) return ''
  const d = new Date(dataISO)
  return d.toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' })
}
</script>

<style scoped>
.registro-box {
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.section-title {
  font-size: 1rem;
  color: #666;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.25rem;
  margin-bottom: 0.75rem;
}

img {
  max-height: 300px;
  object-fit: contain;
  display: block;
  margin-top: 0.5rem;
}

/* Ajuste responsivo */
@media (max-width: 600px) {
  .registro-box {
    padding: 0.75rem;
  }

  .section-title {
    font-size: 0.9rem;
  }
}
</style>
