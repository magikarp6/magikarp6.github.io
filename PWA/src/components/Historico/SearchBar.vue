<template>
    <div class="search-container">
      <img
        src="/src/Icons/search.png"
        class="search-icon"
        alt="Search"
      />
      <input
        class="search-input"
        type="text"
        placeholder="Tipo de Auditoria"
        :value="searchQuery"
        @input="$emit('updateSearch', $event)"
      />
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
  .search-container {
    border-radius: 18px;
    background-color: #d4d1d1;
    display: flex;
    margin-top: 17px;
    padding: 12px 20px;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 8px;
  }
  
  .search-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 20px;
    height: 20px;
    overflow: hidden;
  }
  
  .search-input {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    font-family:
      Poppins,
      -apple-system,
      Roboto,
      Helvetica,
      sans-serif;
    font-size: 14px;
    color: #acadb9;
    font-weight: 500;
    letter-spacing: -0.28px;
    line-height: 1;
  }
  
  .search-input::placeholder {
    color: var(--Dark-Grey, #acadb9);
  }
  </style>
  