

<template>
   <section id="login-precifique-form">
    <section class="col-12 col-xl-10 mx-auto my-4">

<form @submit.prevent="submitForm">
  <div>
    <label class="label-precifique">Email cadastrado</label>
    <input class="form-precifique" v-bind:class="{
  'form-precifique-error': !isValidEmail || !isFormatedEmail,
  'form-precifique-success': isValidEmail && isFormatedEmail && buttonEnter
}"
 type="text" id="email" v-model="email" @input="validateEmail" maxlength="30" >
    <span v-show="!isFormatedEmail" class="error">Formato de e-mail incorreto</span>
    <span v-show="isValidEmail && isFormatedEmail && buttonEnter" class="success">Formato de e-mail correto</span>
  </div>
</form>

<div class="d-flex align-items-center justify-content-center">
  <button :disabled="!buttonEnter" class="button-enter-code-precifique col-11 col-xl-5" @click="submitForm()">Enviar</button>
</div>


</section>
<login-precifique-code v-if="nextPage"/>

</section>
</template>

<script lang="ts">


import { Component, Prop, Vue } from "vue-property-decorator";
import PrecifiqueService from "@/services/precifiqueService";

@Component({})
export class LoginPrecifiqueForm extends Vue {


  public emailButton: boolean = false;
  public email: string = '';
  public isValidEmail: boolean = true;
  public isFormatedEmail: boolean = true ;
  public buttonEnter: boolean = false;
  public nextPage: boolean = false;


 


 public async validateEmail( email: string ) {

  if (!this.isValidEmail) {
    this.isValidEmail = true
  }
  
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    this.isFormatedEmail = emailRegex.test(this.email);
   
      if(!this.isFormatedEmail) {
     
      this.buttonEnter = false;
      }
      else {
        
        this.buttonEnter = true;
      }
    
  }


  public async submitForm() {

    if (this.isFormatedEmail) {

      localStorage.setItem('email', this.email);

      const precifiqueService = new PrecifiqueService();
      this.buttonEnter = false;

      try {
        await precifiqueService.sendEmail({
          email: this.email,

        })
        this.buttonEnter = false;
        this.nextPage = true;
        this.$emit("toStep", "2")
        
        this.$alert('Email enviado com sucesso', '', 'success',
          {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });

      } catch (e) {
        console.error(e);
        this.$alert('Erro ao enviar o email', '', 'error', {
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        })
        this.isValidEmail = false;
        
      }
    }
    this.buttonEnter = true;
  }
}

export { LoginPrecifiqueForm as default };


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