<template>
  <div class="historico-card" @click="irParaMinhasAuditorias">
    <div class="card-header">
      <div class="card-info">
        <div class="card-title-row">
          <h3 class="card-title">{{ nome }}</h3>
          <span class="estado-badge"
            :class="{
              'por-resolver': estado === 'Por Resolver',
              'em-resolucao': estado === 'Em Resolução'
          }">
          {{ estado }}
          </span>
        </div>
        <button class="info-button" @click.stop="mostrarDetalhes = !mostrarDetalhes">
          <span v-if="mostrarDetalhes">Ocultar</span>
          <span v-else>Ver Detalhes</span>
        </button>
      </div>
      <img
        v-if="imagemTipo"
        :src="imagemTipo"
        :alt="tipoAuditoria"
        class="tipo-icon-right"
      />
    </div>
    <transition name="fade">
      <div v-if="mostrarDetalhes" class="card-details">
        <p><strong>Descrição:</strong> {{ descricao }}</p>
        <p><strong>Prioridade(1-Baixo ; 5- Muito Alto):</strong> {{ prioridade }}</p>
        <p><strong>Localização:</strong> {{ nomeLocal }}</p>
        <p><strong>Profissionais Disponíveis:</strong></p>
        <ul>
          <li v-for="(p, i) in profissionaisDisponiveis" :key="i">{{ p }}</li>
        </ul>
        <p><strong>Materiais:</strong></p>
        <ul>
          <li v-for="(m, i) in materiais" :key="i">{{ m }}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import parkIcon from '@/icons/park.png'
import bus from '@/icons/buss.png'
import traffic from '@/icons/traffic.png'
import pedestre from '@/icons/pedestre.png'
import pontualidade from '@/icons/pontualidade.png'

const props = defineProps({
  nome: String,
  descricao: String,
  nomeLocal: String,
  profissionaisDisponiveis: Array,
  materiais: Array,
  tipoAuditoria: String,
  estado: String,
  prioridade: Number,
})

const mostrarDetalhes = ref(false)

const imagensTipos = {
  'estacionamento': parkIcon,
  'condicoes': bus,
  'congestionamento': traffic,
  'mobilidade': pedestre,
  'pontualidade': pontualidade
}

const imagemTipo = computed(() => imagensTipos[props.tipoAuditoria] || null)

const router = useRouter()
function irParaMinhasAuditorias() {
  // Atualiza o estado no localStorage ANTES do redirect
  const auditorias = JSON.parse(localStorage.getItem('auditorias')) || [];
  const idx = auditorias.findIndex(a =>
    a.nome === props.nome && a.descricao === props.descricao
  );
  if (idx !== -1 && auditorias[idx].estado !== "Em Resolução") {
    auditorias[idx].estado = "Em Resolução";
    localStorage.setItem('auditorias', JSON.stringify(auditorias));
  }
  localStorage.setItem('auditoriaSelecionada', JSON.stringify({
  nome: props.nome,
  descricao: props.descricao
}));
router.push('/minhas-auditorias');
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
  margin-bottom: 16px;
  cursor: pointer;
}
.historico-card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: nowrap;
}

.card-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 1 0;
  min-width: 0;
}

.tipo-icon-right {
  width: 70px;
  height: 70px;
  object-fit: contain;
  flex-shrink: 0;
  margin-left: 16px;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tipo-icon {
  width: 24px;
  height: 24px;
}

.estado-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: capitalize;
  display: inline-block;
  margin-top: 5px;
  user-select: none;
  white-space: nowrap;
}

.estado-badge.por-resolver {
  background-color: #fc7575;
  color: #610000;
}

.estado-badge.em-resolucao {
  background-color: #ffe082;
  color: #7a5a00;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
@media (max-width: 768px) {
  .historico-card {
    padding: 15px;
  }
  .card-header {
    flex-direction: row;      /* Mantém lado a lado */
    align-items: center;      /* Mantém centrado verticalmente */
    gap: 16px;
  }
  .tipo-icon-right {
    width: 70px;
    height: 70px;
    margin-left: 12px;
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
}
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