<template>
  <header class="header">
    <!-- Link para a página de Auditorias -->
    <router-link to="/auditorias" class="logo">
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/63f7ec5a6e3239abf9bc60335494713658fa4822?placeholderIfAbsent=true&apiKey=d7529c299f4b4582ae3b5f27ac36f58d" class="header-logo" alt="Logo" />
    </router-link>

    <!-- Título da página (dinâmico via prop) -->
    <h1 class="page-title">{{ pageTitle }}</h1>
  </header>
</template>

<script>
export default {
  props: {
    pageTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(217deg, #fcfcfd -0.01%, rgb(252, 252, 253) 100%);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.header-logo {
  width: 40px;
  height: auto;
}

.page-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.back-button {
  display: flex;
  align-items: center;
}

.back-btn {
  padding: 6px 12px;
  background-color: #000000;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.back-btn:hover {
  background-color: #303f4e;
}

@media (max-width: 768px) {
  .header {
    padding: 10px;
  }

  .page-title {
    font-size: 18px;
  }
}
</style>