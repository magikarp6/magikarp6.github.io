<template>
  <div class="app-container">
    <!--<nav class="navigation">
      <router-link to="/login" class="nav-button" :class="{ active: currentView === 'login' }">
        Login
      </router-link>
      <router-link to="/auditorias" class="nav-button" :class="{ active: currentView === 'auditoria' }">
        Auditoria
      </router-link>
      <router-link to="/historico" class="nav-button" :class="{ active: currentView === 'Historico' }">
        Ocorrências
      </router-link>
      <router-link to="/minhas-auditorias" class="nav-button" :class="{ active: currentView === 'As minhas Auditorias' }">
        As minhas Auditorias
      </router-link>
      <router-link to="/perfil" class="nav-button" :class="{ active: currentView === 'Perfil' }">
        Perfil
      </router-link>
    </nav> -->

    <!-- O <router-view> será o ponto onde as páginas são renderizadas conforme as rotas -->
    <div class="view-container">
      <router-view />
    </div>
  </div>
</template>

<script>
// Atualize os imports com os caminhos corretos
import LoginForm from "../src/components/Login/LoginForm.vue";
import Auditoria from "../src/components/Auditoria.vue";
import Auditoriaspage from "../src/components/Auditorias/AuditoriasPage.vue";
import HistoricoPage from "../src/components/Historico/HistoricoPage.vue";
import PerfilPage from "../src/components/Perfil/PerfilPage.vue";

export default {
  name: "App",
  components: {
    LoginForm,
    Auditoria,
    Auditoriaspage,
    HistoricoPage,
    PerfilPage,
  },
};
</script>

<style>
/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
}

.app-container {
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.view-container {
  margin-top: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.navigation {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.nav-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #f5f5f5;
  color: #333;
  font-family: Poppins, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background-color: #e0e0e0;
}

.nav-button.active {
  background-color: #000;
  color: #fff;
}
</style>
