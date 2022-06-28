<template>
<div>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">JUYOUNG</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/todos">Todos</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</div>
</template>

<script>
export default {
}
</script>

<style>

</style>