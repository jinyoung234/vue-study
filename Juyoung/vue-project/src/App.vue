<template>
  <div class="name">
    {{ name }}
  </div>
  <button 
    class="btn btn-primary"
    v-on:click="updateName"
  >
    Click
  </button>
</template>

<script>
export default {
  setup() {
    let name = "Juyoung";

    const updateName = () => {
      name = "yuwol";
      console.log(name);
    }
    // const greeting = (name) => {
    //   return "Hello, " + name;
    // };

    // const greet = greeting(name);

    return {
      name,
      updateName
    };
  }
}
</script>

<style>
  .name {
    color: red;
  }
</style>