<template>
  <div class="name">{{ name }}</div>
  <div>Hi</div>
</template>

<script>
export default {
  setup() {
    const name = "Juyoung";
    return {
      name
    };
  }
}
</script>

<style>
  .name {
    color: red;
  }
</style>