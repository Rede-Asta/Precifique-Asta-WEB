
<template> 
   <section id="code-precifique-form">
    <section class="col-12 col-xl-10 mx-auto my-4">

<form @submit.prevent="submitForm">
  <div>
    <label class="label-precifique">Insira o código</label>
    <input class="form-precifique"  maxlength="4" inputmode="numeric" pattern="[0-9]*" v-bind:class="{
  'form-precifique-error': !isValidCode,
  'form-precifique-success': isValidCode && buttonEnter
}"
  id="code" v-model="token" @input="validateCode">
    <span v-show="!isValidCode" class="error">Formato de código incorreto</span>
    <span v-show="isValidCode && buttonEnter" class="success">Formato de código correto</span>
  </div>
</form>

<div class="d-flex align-items-center justify-content-center">
  <button :disabled="!buttonEnter" class="button-enter-code-precifique col-11 col-xl-5" @click="submitForm()">Enviar</button>
</div>


</section>
<login-precifique-password v-if="nextPage"/>
</section>


</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import PrecifiqueService from "@/services/precifiqueService";

@Component({})
export class CodePrecifiqueForm extends Vue {

  public emailButton: boolean = false;
  public email: string | null  = '';
  public token: string  = '';
  public key: string = '';
  public isValidCode: boolean = true;
  public buttonEnter: boolean = false;

  public nextPage: boolean = false;







  validateCode() {

    if (!this.isValidCode) {
    this.isValidCode = true
  }
    const codeRegex = /^\d{4}$/;
    this.isValidCode = codeRegex.test(this.token);
    if (this.isValidCode) {
      this.buttonEnter = true;
    }
    else {
      this.buttonEnter = false;
    }
    
  }

  public async submitForm() {
  
    if (this.isValidCode) {

      this.email = localStorage.getItem('email'); 
      const precifiqueService = new PrecifiqueService();
      this.buttonEnter = false;
      try {
        const response =  await precifiqueService.sendToken({
        email: this.email,
        token: this.token
    })

    this.key = response.data.token
    this.buttonEnter = false;
    this.nextPage = true;
    this.$emit("toStep", "3")

    localStorage.setItem('key', this.key);
     
        this.$alert('Código enviado com sucesso', '', 'success',
          {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          })
          ;
      } catch (e) {
        console.error(e);
        this.$alert('Código incorreto', '', 'error', {
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
        
      }
    }
    this.buttonEnter = true;
  }
}


export { CodePrecifiqueForm as default };


</script>
<style lang="scss">

.form-precifique {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s;
    
  }
  .form-precifique-error {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border-color: $error !important;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s;



    
  }

  .form-precifique-success {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border-color: $success !important;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s;



    
  }


  .label-precifique{
    font-size: 14px;
  }
  
  .error {
    color: $error;
    font-size: 12px;


  }

  .success {
    color: $success;
    font-size: 12px;


  }
  
  input:focus {
    border-color: $primary;
    outline: none;
  }
</style>