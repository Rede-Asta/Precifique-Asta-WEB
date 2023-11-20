<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({})
  export class AppComponent extends Vue {
    
  }

  export { AppComponent as default };
</script>

<style lang="scss">
  @import "@/assets/scss/global.scss";

  .fade-enter-active,
  .fade-leave-active {
  transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  }
</style>