<template>
  <main class="perfil-container">
    <Header :pageTitle="textos[language].perfil" />

    <section class="perfil-info">
      <img class="perfil-avatar" :src="userPicture" alt="Avatar" />
      <h3 class="perfil-nome">{{ userName }}</h3>
      <p class="perfil-email">{{ userEmail }}</p>
    </section>

    <section class="perfil-opcoes" v-if="!mostrarDefinicoes">
      <div class="perfil-opcao" @click="mostrarResumo = !mostrarResumo">
        <img src="@/Icons/agenda.png" alt="Estatísticas" />
        <span>{{ mostrarResumo ? 'Ocultar Estatísticas' : 'Ver Estatísticas' }}</span>
      </div>
      <transition name="fade">
        <div v-if="mostrarResumo" class="resumo-estatistico mt-3" style="width: 100%;">
          <div class="estat-box">
            <span class="estat-label">Total Auditorias:</span>
            <span class="estat-value">{{ auditorias.length }}</span>
          </div>
          <div class="estat-box">
            <span class="estat-label">Resolvidas:</span>
            <span class="estat-value">{{ totalResolvidas }}</span>
          </div>
          <div class="estat-box">
            <span class="estat-label">Por Resolver:</span>
            <span class="estat-value">{{ totalPorResolver }}</span>
          </div>
          <div class="estat-box">
            <span class="estat-label">Tempo Total:</span>
            <span class="estat-value">{{ tempoTotal }} min</span>
          </div>
        </div>
      </transition>

      <div class="perfil-opcao" @click="abrirDefinicoes">
        <img src="@/Icons/settings.png" alt="Definições" />
        <span>{{ textos[language].definicoes }}</span>
      </div>

      <div class="perfil-opcao" @click="fazerLogout">
        <img src="@/Icons/login.png" alt="Logout" />
        <span>{{ textos[language].logout }}</span>
      </div>
    </section>

    <!-- Secção Definições -->
    <section class="perfil-opcoes" v-if="mostrarDefinicoes">
      <div class="perfil-opcao">
        <label>
          <input type="checkbox" v-model="darkMode" @change="toggleDarkMode" />
          {{ textos[language].modoEscuro }}
        </label>
      </div>

      <div class="perfil-opcao">
        <label>
          {{ textos[language].linguagem }}:
          <select v-model="language" @change="trocarIdioma">
            <option value="pt">Português</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>

      <div class="perfil-opcao" @click="fecharDefinicoes" style="justify-content: center; font-weight: bold; cursor: pointer; background-color: #ccc; color: #111;">
        ← {{ textos[language].voltar }}
      </div>
    </section>

    <TabBar />
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Header from '@/components/Auditorias/Header.vue';
import TabBar from '@/components/Auditorias/TabBar.vue';

const userName = ref('');
const userEmail = ref('');
const userPicture = ref(new URL('@/Icons/gadget.png', import.meta.url).href);
const defaultPicture = new URL('@/Icons/gadget.png', import.meta.url).href;

const darkMode = ref(false);
const language = ref('pt');
const mostrarDefinicoes = ref(false);

const mostrarResumo = ref(false);
const auditorias = ref([]);

const totalResolvidas = computed(() =>
  auditorias.value.filter(a => (a.estado || '').toLowerCase() === 'resolvido').length
);

const totalPorResolver = computed(() =>
  auditorias.value.filter(a => (a.estado || '').toLowerCase() === 'por resolver').length
);

const tempoTotal = computed(() =>
  auditorias.value.reduce((acc, a) => acc + (Number(a.tempoTotal) || 0), 0)
);

const textos = {
  pt: {
    perfil: 'Perfil',
    definicoes: 'Definições',
    logout: 'Logout',
    modoEscuro: 'Modo Escuro',
    linguagem: 'Linguagem',
    voltar: 'Voltar'
  },
  en: {
    perfil: 'Profile',
    definicoes: 'Settings',
    logout: 'Logout',
    modoEscuro: 'Dark Mode',
    linguagem: 'Language',
    voltar: 'Back'
  }
};

function aplicarModoEscuro(ativo) {
  if (ativo) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

function toggleDarkMode() {
  aplicarModoEscuro(darkMode.value);
  localStorage.setItem('darkMode', darkMode.value ? 'true' : 'false');
}

function trocarIdioma() {
  localStorage.setItem('language', language.value);
}

function abrirDefinicoes() {
  mostrarDefinicoes.value = true;
}

function fecharDefinicoes() {
  mostrarDefinicoes.value = false;
}

function fazerLogout() {
  if (window.google && google.accounts && google.accounts.id) {
    google.accounts.id.disableAutoSelect();
  }

  localStorage.removeItem('googleUserName');
  localStorage.removeItem('googleUserEmail');
  localStorage.removeItem('googleUserPicture');

  window.location.href = '/';
}

onMounted(() => {
  userName.value = localStorage.getItem('googleUserName') || 'Nome não encontrado';
  userEmail.value = localStorage.getItem('googleUserEmail') || 'Email não encontrado';
  const picture = localStorage.getItem('googleUserPicture');
  userPicture.value = picture && picture.startsWith('http') ? picture : defaultPicture;

  darkMode.value = localStorage.getItem('darkMode') === 'true';
  aplicarModoEscuro(darkMode.value);

  language.value = localStorage.getItem('language') || 'pt';

  // Carregar histórico para estatísticas
  const dados = localStorage.getItem("historicoFormularios");
  if (dados) {
    try {
      auditorias.value = JSON.parse(dados);
    } catch (e) {
      auditorias.value = [];
    }
  }
});
</script>

<style scoped>
.perfil-container {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  width: 100vw;
  margin: 0;
  height: 100vh;
  padding-top: 29px;
  overflow-x: hidden;
  overflow-y: hidden;
  box-sizing: border-box;
  color: #080808;
}

.perfil-info {
  text-align: center;
  margin: 30px 20px 20px;
  flex-shrink: 0;
}

.perfil-avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.perfil-nome {
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0 5px;
  font-family: Urbanist, -apple-system, Roboto, Helvetica, sans-serif;
}

.perfil-email {
  color: #888;
  font-size: 20px;
  word-break: break-all;
}

.perfil-opcoes {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 20px;
  margin-top: 40px;
  flex-shrink: 0;
  overflow-y: auto;
}

.perfil-opcao {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 16px;
  background-color: #f4f4f4;
  color: #111111;
  border-radius: 10px;
  cursor: pointer;
}

.perfil-opcao:hover {
  background-color: #eaeaea;
}

.perfil-opcao img {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.perfil-opcao label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
  color: #111111;
}

.perfil-estatisticas {
  margin: 24px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 20px;
}

.btn-estatisticas {
  background: #e9ecef;
  border: 1px solid #bfc4ca;
  border-radius: 10px;
  padding: 8px 18px;
  font-size: 1em;
  color: #495057;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 6px;
  transition: background 0.2s, border 0.2s;
}
.btn-estatisticas:hover {
  background: #d4d7dd;
  border-color: #888;
}

.resumo-estatistico {
  display: flex;
  gap: 24px;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.estat-box {
  background: #f4f4f4;
  border-radius: 10px;
  padding: 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 110px;
}
.estat-label {
  font-size: 0.95em;
  color: #666;
}
.estat-value {
  font-size: 1.2em;
  font-weight: bold;
  color: #222;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Responsivo */
@media (max-width: 600px) {
  .perfil-opcoes {
    padding: 0 10px;
    gap: 10px;
    margin-top: 20px;
  }

  .perfil-opcao {
    padding: 12px;
  }

  .perfil-avatar {
    width: 80px;
    height: 80px;
  }

  .perfil-nome {
    font-size: 18px;
  }

  .perfil-email {
    font-size: 13px;
  }
  .resumo-estatistico {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
}

/* Modo escuro global */
body.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

body.dark-mode .perfil-container {
  background-color: #181818;
}

body.dark-mode .perfil-opcao {
  background-color: #282828;
  color: #ddd;
}

body.dark-mode .perfil-opcao:hover {
  background-color: #383838;
}

body.dark-mode .perfil-email {
  color: #bbb;
}
</style>