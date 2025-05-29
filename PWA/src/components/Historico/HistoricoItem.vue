<template>
  <div class="historico-card">
    <div class="card-header">
      <div class="card-info">
        <h3 class="card-title">{{ auditoria.nome }}</h3>
        <span :class="['estado-badge', estadoClasse]">
          {{ auditoria.estado || 'Desconhecido' }}
        </span>
      </div>

      <button class="info-button" @click="mostrarDetalhes = !mostrarDetalhes">
        <span v-if="mostrarDetalhes">Ocultar</span>
        <span v-else>Ver Detalhes</span>
      </button>
    </div>

    <transition name="fade">
      <div v-if="mostrarDetalhes" class="card-details">
        <p><strong>Inicio:</strong> {{ formatDate(auditoria.dataInicio) }}</p>
        <p><strong>Fim:</strong> {{ formatDate(auditoria.dataFim) }}</p>
        <p><strong>Profissionais:</strong></p>
        <ul>
          <li v-for="(p, i) in auditoria.profissionaisDisponiveis" :key="i">{{ p }}</li>
        </ul>
        <p><strong>Materiais utilizados:</strong></p>
        <ul>
          <li v-for="(mat, idx) in auditoria.materiais" :key="idx">{{ mat }}</li>
        </ul>
        <p><strong>Descrição:</strong> {{ auditoria.descricao }}</p>
        <p><strong>Tempo Total:</strong> {{ auditoria.tempoTotal }} min</p>
        <p><strong>Ações corretivas:</strong> {{ auditoria.acoesCorrectivas || 'Não especificado' }}</p>
        <p><strong>Impacto:</strong> {{ auditoria.impacto || 'Não especificado' }}</p>

        <img
          v-if="auditoria.imagem"
          :src="auditoria.imagem"
          alt="Imagem"
          class="audit-image"
        />
      </div>
    </transition>
  </div>
</template>a


<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  nome: String,
  auditoria: Object
});

const mostrarDetalhes = ref(false);

const estadoClasse = computed(() => {
  const estado = props.auditoria?.estado?.toLowerCase();
  if (estado === 'ativo') return 'ativo';
  if (estado === 'resolvido') return 'resolvido';
  return 'desconhecido';
});

function formatDate(dataISO) {
  if (!dataISO) return '';
  const d = new Date(dataISO);
  return d.toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' });
}
</script>

<style scoped>
.historico-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
}

.historico-card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.estado-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
  display: inline-block;
  margin-top: 5px;
}

.estado-badge.ativo {
  background-color: #e0f7fa;
  color: #00796b;
}

.estado-badge.resolvido {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.estado-badge.desconhecido {
  background-color: #f5f5f5;
  color: #999;
}

.info-button {
  background: none;
  border: none;
  color: #1976d2;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}

.info-button:hover {
  color: #0d47a1;
  text-decoration: underline;
}

.card-details {
  margin-top: 16px;
  color: #555;
  font-size: 0.95rem;
}

.card-details ul {
  padding-left: 20px;
  margin: 5px 0 10px;
}

.audit-image {
  width: 100%;
  max-width: 100%;
  border-radius: 8px;
  margin-top: 12px;
  object-fit: cover;
}

/* Animação ao abrir/fechar */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Tablets e menores */
@media (max-width: 768px) {
  .historico-card {
    padding: 15px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .card-title {
    font-size: 1rem;
  }

  .estado-badge {
    margin-top: 8px;
    font-size: 0.8rem;
    padding: 3px 8px;
  }

  .info-button {
    font-size: 0.85rem;
    margin-top: 10px;
  }

  .card-details {
    font-size: 0.9rem;
  }

  .audit-image {
    max-height: 200px;
  }
}

/* Smartphones */
@media (max-width: 480px) {
  .historico-card {
    padding: 10px;
  }

  .card-title {
    font-size: 0.9rem;
  }

  .estado-badge {
    font-size: 0.75rem;
    padding: 2px 6px;
  }

  .info-button {
    font-size: 0.8rem;
  }

  .card-details {
    font-size: 0.85rem;
  }
}

</style>
