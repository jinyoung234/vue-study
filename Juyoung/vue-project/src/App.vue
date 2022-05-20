<template>
  <div class="name">
    {{ name }}
  </div>
  <input :type="type" :value="name">
  <button 
    class="btn btn-primary"
    @click="updateName"
  >
    Click
  </button>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const name = ref('Juyoung');
    const type = ref('number');
    const nameClass = ref('');

    const updateName = () => {
      name.value = "yuwol";
      type.value = "text";
      nameClass.value = "name";
    }

    return {
      name,
      updateName,
      type,
      nameClass,
    };
  }
}
</script>

<style>
  .name {
    color: red;
  }
</style>