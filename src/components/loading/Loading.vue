<template>
  <div class="spinner" :style="{display: active ? 'flex' : 'none'}">
    <div class="spinner__loadSpinner"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({})
export class loadingComponent extends Vue {
  @Prop({ default: undefined }) active!: boolean;
  // tslint:disable-next-line:no-empty
  @Watch('notificationObj') onPropertyChanged(value: string, oldValue: string) { }
}

export {loadingComponent as default };
</script>
<style src="./loading.component.scss" lang="scss" scoped>
.spinner {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  position: fixed;
  justify-content: center;
  z-index: 999;
  align-items: center;  
  top: 0;
  &__loadSpinner {
    border: 8px solid rgb(229, 227, 223);
    border-left-color: $primary;
    width: 60px;
    height: 60px;
    border-radius: 60%;
    animation: spin 1s linear infinite;
    margin: 0 auto;
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
} 
</style>