<template>
  <div class="input-group my-3 searchbar-group">
    <span class="input-group-text border-0 searchbar-icon">
      <img
        src="/src/Icons/search.png"
        alt="Ícone de pesquisa"
        style="width: 20px; height: 20px;"
      />
    </span>
    <input
      type="text"
      class="form-control border-0 shadow-none searchbar-input"
      placeholder="Tipo de Auditoria"
      :value="searchQuery"
      @input="$emit('updateSearch', $event.target.value)"
      aria-label="Pesquisar tipo de auditoria"
    />
    <slot />
  </div>
</template>

<script setup>
defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
});

defineEmits(["updateSearch"]);
</script>

<style scoped>
.searchbar-group {
  background-color: #e9ecef;
  border-radius: 18px;
  display: flex;
  align-items: center;
  padding-right: 8px;
}
.searchbar-icon {
  background-color: #e9ecef;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
  padding: 0.5rem;
}
.searchbar-input {
  background-color: #e9ecef;
  color: #495057;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.form-control::placeholder {
  color: #6c757d;
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