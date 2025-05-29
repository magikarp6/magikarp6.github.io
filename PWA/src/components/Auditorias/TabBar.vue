<template>
  <footer>
    <nav class="tabbar">
    <router-link to="/auditorias" class="tab-item">
      <img src="/src/Icons/home.png" class="tab-icon" alt="Auditorias" />
    </router-link>

    <router-link to="/historico" class="tab-item">
      <img src="/src/Icons/time.png" class="tab-icon" alt="Historico" />
    </router-link>

    <router-link to="/perfil" class="tab-item">
      <img src="/src/Icons/user.png" class="tab-icon" alt="Perfil" />
    </router-link>
    </nav>
  </footer>
</template>
  
  <style scoped>
  .tabbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1.2px solid #dadada;
    backdrop-filter: blur(19.22px);
    background: linear-gradient(217deg, #fcfcfd -0.01%, rgb(252, 252, 253) 100%);
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 60px; 
    z-index: 999;
  }
  
  .tab-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 29px;
    flex-shrink: 0;
  }
  </style>