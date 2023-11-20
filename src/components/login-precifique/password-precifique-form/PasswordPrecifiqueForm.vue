<template>
   <section id="Password-precifique-form">
    <section class="col-12 col-xl-10 mx-auto my-4">

<form @submit.prevent="submitForm">
  <div>
    <label class="label-precifique">Nova senha</label>
    <input class="form-precifique" maxlength="30"  v-bind:class="{
  'form-precifique-error': !isValidPassword,
  'form-precifique-success': isValidPassword && buttonEnter
}"
 type="text" id="password" v-model="password" @input="validatePassword">
    <span v-show="!isValidPassword" class="error">A senha deve ter no mínimo 6 caracteres</span>
  </div>


  <div>
    <label class="label-precifique">Confirme a nova senha</label>
    <input class="form-precifique" maxlength="30"  v-bind:class="{
  'form-precifique-error': !isValidConfirmPassword,
  'form-precifique-success': isValidConfirmPassword && buttonEnter
}"
 type="text" id="passwordConfirm" v-model="passwordConfirm" @input="validatePasswordConfirm">
    <span v-show="!isValidConfirmPassword"  class="error">As senhas não são correspondentes.</span>
  </div>
</form>

<div class="d-flex align-items-center justify-content-center">
  <button :disabled="!buttonEnter" class="button-enter-code-precifique col-11 col-xl-5" @click="submitForm()">Redefinir senha</button>
</div>


</section>
<login-precifique-return v-if="nextPage"/>
</section>


</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import PrecifiqueService from "@/services/precifiqueService";

@Component({})
export class PasswordPrecifiqueForm extends Vue {


  public emailButton: boolean = false;
  public email: string | null = '';
  public password: string = '';
  public passwordConfirm: string = '';
  public isValidPassword: boolean = true;
  public isValidConfirmPassword: boolean = true;
  public buttonEnter: boolean = false;
  public key: string | null= '';
  public nextPage: boolean = false;


 


  validatePassword() {

    if (!this.isValidPassword) {
    this.isValidPassword = true
  }
    const PasswordRegex = /^.{6,}$/;
    this.isValidPassword = PasswordRegex.test(this.password);
    if (this.isValidPassword) {
      this.buttonEnter = false;
    }
    else {
      this.buttonEnter = false;
    }
    
  }

  validatePasswordConfirm() {

    
    if ( this.passwordConfirm == this.password){
      this.isValidConfirmPassword = true;
      this.buttonEnter = true;
    }
    else {
      this.isValidConfirmPassword = false;
      this.buttonEnter = false;
    }
    
  }



  public async submitForm() {
    if (this.isValidPassword) {
         
    this.email = localStorage.getItem('email');
    this.key = localStorage.getItem('key');

      const precifiqueService = new PrecifiqueService();
      this.buttonEnter = false;
      
       try {
         await precifiqueService.sendPassword(this.key,{
          email: this.email,
          password: this.password
        });

        this.buttonEnter = false;
        this.$emit("toStep", "4")

        
        this.$alert('Senha alterada com sucesso', '', 'success',
          {
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          })
          this.nextPage = true;
       } catch (e) {
         console.error(e);
         this.$alert('Erro ao alterar senha', '', 'error', {
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


export { PasswordPrecifiqueForm as default };


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
    margin-top: 3%;
  }
  
  .error {
    color: $error;
    font-size: 12px;
  }
  
  input:focus {
    border-color: $primary;
    outline: none;
   
  }
</style>