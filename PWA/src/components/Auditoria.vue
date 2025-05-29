<template>
  <main class="auditoria">
    <Header pageTitle="Auditoria" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />

    <section class="content">
      <h2 class="section-title">Localização</h2>
      <div id="map"></div>
      <input type="text" id="chosenCoordinates" disabled />

      <div class="row g-4 my-4">
        <div class="col-md-6">
          <label class="form-label fw-semibold">Data e Hora de Início</label>
          <input type="datetime-local" v-model="startDateTime" class="form-control" />
        </div>
        <div class="col-md-6">
          <label class="form-label fw-semibold">Data e Hora de Fim</label>
          <input type="datetime-local" v-model="endDateTime" class="form-control" />
        </div>
      </div>

      <div class="info-sections row g-4">
        <section class="col-md-12 info-box">
          <h3 class="section-title">Nº Problemas</h3>
          <div>
            <select v-model="selectedProblems" class="form-select">
              <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <h3 class="section-title mt-3">Tempo Total (Minutos)</h3>
          <div>
            <input
              type="number"
              min="1"
              v-model="selectedTime"
              class="form-control"
              style="max-width: 180px"
            />
          </div>

          <h3 class="section-title mt-3">Profissionais Envolvidos</h3>
          <div>
            <div v-for="prof in allProfessionals" :key="prof">
              <label class="material-label">
                <input
                  type="checkbox"
                  :value="prof"
                  v-model="selectedProfessionals"
                />
                {{ prof }}
              </label>
            </div>
          </div>

          <h3 class="section-title mt-3">Materiais Utilizados</h3>
          <div>
            <div v-for="material in allMaterials" :key="material">
              <label class="material-label">
                <input
                  type="checkbox"
                  :value="material"
                  v-model="selectedMaterials"
                />
                {{ material }}
              </label>
            </div>
          </div>
        </section>
      </div>

      <section class="impact-section mt-4">
  <h3 class="section-title">Ações corretivas</h3>
  <textarea
    id="acoes-correctivas"
    class="impact-text form-control"
    v-model="acoesCorrectivas"
    rows="4"
    placeholder="Escreva aqui as ações corretivas que foram tomadas..."
  ></textarea>
</section>

      <section class="impact-section mt-4">
        <h3 class="section-title">Impacto esperado das recomendações</h3>
        <textarea class="impact-text form-control" v-model="impactoEsperado" rows="4" placeholder="Descreva o impacto esperado aqui..."></textarea>
      </section>

      <section class="description-section mt-4">
        <h3 class="section-title">Descrição</h3>
        <textarea class="description-text form-control" v-model="descricao" rows="4" placeholder="Descreva aqui..."></textarea>
      </section>

      <section class="upload-section mt-4" style="padding-bottom: 3rem;">
        <h3 class="section-title">Anexar Imagens/Vídeos</h3>
        <div class="upload-actions d-flex gap-3 align-items-center">
          <label for="file-upload" class="upload-button d-flex align-items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a8c0a80ac574a0055ec9cdc956b0983c13b68ee?placeholderIfAbsent=true&apiKey=d7529c299f4b4582ae3b5f27ac36f58d"
              alt="Upload"
              class="upload-icon"
              style="width: 24px; height: 24px;"
            />
            <span>Anexar</span>
          </label>

          <input type="file" id="file-upload" name="file-upload" accept="image/*,video/*" @change="handleFileUpload" style="display: none;" />
          <button @click="submitForm" class="submit-button btn btn-primary ms-auto">Submeter</button>
        </div>
      </section>
    </section>
    <TabBar />
  </main>
</template>


<script setup>
import TabBar from "./Auditorias/TabBar.vue";
import Header from './Auditorias/Header.vue';
import 'leaflet/dist/leaflet.css';
import { onMounted, ref, watch } from 'vue';
import L from 'leaflet';

// --- Variáveis reativas ---
const impactoEsperado = ref("");
const startDateTime = ref("");
const endDateTime = ref("");
const selectedProblems = ref(null);
const selectedTime = ref(null);
const acoesCorrectivas = ref('');
const imagemBase64 = ref(null);
const map = ref(null);
const marker = ref(null);
const selectedProfessionals = ref([]);
const descricao = ref("");
const selectedMaterials = ref([]);
const auditoriaAtual = ref(null);


// --- Função para atualizar localização no input e no marcador ---
function updateLocation(lat, lng) {
  const coordinatesText = `Latitude: ${lat}\nLongitude: ${lng}`;
  const input = document.getElementById('chosenCoordinates');
  if (input) {
    input.value = coordinatesText;
  }

  if (marker.value) {
    marker.value.setLatLng([lat, lng]);
  } else {
    marker.value = L.marker([lat, lng]).addTo(map.value);
  }
}

// --- Inicializar mapa com coordenadas ---
function initMap(lat, lng) {
  if (map.value) {
    map.value.remove();
  }

  map.value = L.map('map', {
    center: [lat, lng],
    zoom: 16,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map.value);

  marker.value = L.marker([lat, lng]).addTo(map.value);

  map.value.on('click', function (e) {
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    updateLocation(lat, lng);
  });
}

// --- Função para carregar auditoria do localStorage e preencher formulário ---
function loadAuditoriaFromLocalStorage() {
  const auditorias = JSON.parse(localStorage.getItem('auditorias')) || [];
  const auditoriaSelecionada = JSON.parse(localStorage.getItem('auditoriaSelecionada'));
  if (!auditoriaSelecionada) {
    const ultimaAuditoria = auditorias[auditorias.length - 1];
    if (!ultimaAuditoria) return;
    auditoriaAtual.value = ultimaAuditoria;
  } else {
    auditoriaAtual.value = auditorias.find(a =>
      a.nome === auditoriaSelecionada.nome &&
      a.descricao === auditoriaSelecionada.descricao
    );
  }

  if (!auditoriaAtual.value) return;

  descricao.value = auditoriaAtual.value.descricao || "";
  startDateTime.value = auditoriaAtual.value.data || "";
  endDateTime.value = "";
  impactoEsperado.value = "";

  // Agora os materiais vêm do backend:
  allMaterials.value = auditoriaAtual.value.materiais || [];
  selectedMaterials.value = auditoriaAtual.value.materiais || [];

  // Profissionais disponíveis do backend:
  allProfessionals.value = auditoriaAtual.value.profissionaisDisponiveis || [];
  selectedProfessionals.value = [];

  if (auditoriaAtual.value.latitude && auditoriaAtual.value.longitude) {
    initMap(auditoriaAtual.value.latitude, auditoriaAtual.value.longitude);
    updateLocation(auditoriaAtual.value.latitude, auditoriaAtual.value.longitude);
  }
}

// --- Guardar imagem base64 ao fazer upload ---
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      imagemBase64.value = reader.result; // Guarda o base64
    };

    reader.readAsDataURL(file);
  }
}

// --- Submeter formulário e guardar no localStorage ---
function submitForm() {
  const data = {
    nome: auditoriaAtual.value?.nome || "",
    coordenadas: document.getElementById('chosenCoordinates')?.value || "",
    dataInicio: startDateTime.value,
    dataFim: endDateTime.value,
    profissionaisDisponiveis: selectedProfessionals.value,
    numeroProblemas: selectedProblems.value,
    tempoTotal: Number(selectedTime.value),
    materiais: selectedMaterials.value,
    impacto: impactoEsperado.value,
    descricao: descricao.value,
    acoesCorrectivas: acoesCorrectivas.value,
    imagem: imagemBase64.value,
    dataSubmissao: new Date().toISOString(),
    estado: "Resolvido"
  };

  const historico = JSON.parse(localStorage.getItem("historicoFormularios")) || [];
  historico.push(data);
  localStorage.setItem("historicoFormularios", JSON.stringify(historico));

  let auditorias = JSON.parse(localStorage.getItem('auditorias')) || [];
  auditorias = auditorias.filter(a =>
    !(
      a.descricao === auditoriaAtual.value?.descricao &&
      a.localizacao === auditoriaAtual.value?.localizacao &&
      a.tipoAuditoria === auditoriaAtual.value?.tipoAuditoria
    )
  );
  localStorage.setItem('auditorias', JSON.stringify(auditorias));

  alert("Dados submetidos com sucesso!");
}

// --- Inicializar listas padrão e observar mudanças ---
// Exemplos para fallback se não existirem dados no localStorage
const allMaterials = ref([]);
localStorage.setItem('allMaterials', JSON.stringify(allMaterials));

const allProfessionals = ref([]);
localStorage.setItem('allProfessionals', JSON.stringify(allProfessionals));

// --- Efeito para manter localStorage sincronizado com seleção ---
watch(selectedMaterials, (newVal) => {
  localStorage.setItem('selectedMaterials', JSON.stringify(newVal));
});

watch(selectedProfessionals, (newVal) => {
  localStorage.setItem('selectedProfessionals', JSON.stringify(newVal));
});

// --- OnMounted: carregar auditoria, preencher dados e inicializar mapa ---
onMounted(() => {
  loadAuditoriaFromLocalStorage();
});
</script>



<style scoped>
.material-label {
  font-size: 0.8rem;
  color: #000;
}

#auditoria {
  border-radius: 1rem;
  background-color: #fff;
  margin: 0 auto;
  max-width: 900px;
  padding: 1.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05);
}

#map {
  width: 100%;
  height: 300px;
  border-radius: 0.75rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1rem;
  color: #666;
  font-weight: 600;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.25rem;
}

.materials-text,
.impact-text,
.description-text {
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  font-size: 0.875rem;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
}

.upload-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.5rem;
}

.info-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem; 
  margin-bottom: 0.5rem; 
}

.info-box {
  flex: 1 1 120px;
  min-width: 280px;
}

.impact-section,
.description-section,
.upload-section {
  margin-top: 2rem;
}

/* Ajuste para espaçamento consistente em cada seção */
.info-sections, .impact-section, .description-section, .upload-section {
  margin-bottom: 1.5rem;
}

/* Tablets e menores */
@media (max-width: 1000px) {
  #auditoria {
    padding: 1rem;
  }

  .info-sections {
    flex-direction: column;
    gap: 1.5rem;
  }

  .section-title {
    font-size: 0.95rem;
  }
}

/* Ecrãs pequenos como smartphones */
@media (max-width: 600px) {
  .material-label {
    font-size: 0.75rem;
  }

  .section-title {
    font-size: 0.9rem;
  }

  .impact-text,
  .description-text {
    font-size: 0.8rem;
    padding: 0.4rem;
  }

  .upload-button {
    font-size: 0.9rem;
  }

  .upload-icon {
    width: 18px;
    height: 18px;
  }
}

/* Ecrãs grandes (mais que 1200px) */
@media (min-width: 1200px) {
  #auditoria {
    max-width: 1100px;
    padding: 2rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .impact-text,
  .description-text {
    font-size: 1rem;
  }

  .material-label {
    font-size: 0.9rem;
  }
}
</style>