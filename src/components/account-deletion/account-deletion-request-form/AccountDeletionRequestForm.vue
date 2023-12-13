

<template>
   <section id="account-deletion-request-form">
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
  <div>
    <label class="label-precifique">Senha</label>
    <input class="form-precifique"
       v-bind:class="{
         'form-precifique-success': isValidPass,
         'form-precifique-error': !isValidPass
       }"
       type="password" id="password" v-model="password" @input="notEmpty" maxlength="30" >
<span v-show="!isValidPass" class="error">Senha incorreta</span>

  </div>
</form>

<div class="d-flex align-items-center justify-content-center">
  <button :disabled="!buttonEnter" class="button-enter-code-precifique col-11 col-xl-5" @click="submitForm()">Enviar</button>
</div>


</section>
<account-deletion-request v-if="nextPage"/>

</section>
</template>

<script lang="ts">


import { Component, Prop, Vue } from "vue-property-decorator";
import PrecifiqueService from "@/services/precifiqueService";

@Component({})
export class AccountDeletionRequestForm extends Vue {


  public emailButton: boolean = false;
  public email: string = '';
  public password: string = '';
  public isValidPass: boolean = true;
  public isValidEmail: boolean = true;
  public isFormatedEmail: boolean = true ;
  public buttonEnter: boolean = false;
  public nextPage: boolean = false;

  public async notEmpty() {
    if (this.password.trim().length > 0) {
      this.isValidPass = true
    } else {
      this.isValidPass = false
    }
  }

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
    if (!this.isFormatedEmail) {
      this.showAlert('Formato de email incorreto', 'error');
      return;
    }

    this.buttonEnter = false;
    localStorage.setItem('email', this.email);
    const precifiqueService = new PrecifiqueService();

    try {
      await precifiqueService.login({
        email: this.email,
        password: this.password
      });

      const confirmationResult = await this.showConfirmationDialog();

      if (confirmationResult) {
        await this.deleteAccount(precifiqueService);
        await this.$router.push({name: 'accountDeleted'});
      } else {
        this.showAlert('Operação cancelada', 'info');
      }
    } catch (e) {
      console.error(e);
      this.showAlert('Senha e/ou email incorretos', 'error');
      this.isValidEmail = false;
      this.isValidPass = false;
    } finally {
      this.buttonEnter = true;
    }
  }

  async showConfirmationDialog() {
    return this.$confirm(
      'Ao excluir a sua conta todas as informações relacionadas a ' +
      'ela serão excluídas e não há como reverter essa operação. Tem certeza que deseja prosseguir?',
      'Ação irreversivel: tem certeza?', 'warning', {
        toast: false,
        position: 'center',
        showConfirmButton: true,
        confirmButtonText: 'Excluir conta',
        cancelButtonText: 'Deixar para depois',
        showCancelButton: true
      }
    ).catch(error => {
      console.error('Error in confirmation dialog:', error);
      return false;
    });
  }

  async deleteAccount(precifiqueService) {
    try {
      await precifiqueService.deleteAccount({
        email: this.email,
        password: this.password
      });
    } catch (error) {
      console.error('Error deleting account:', error);
      this.showAlert('Ocorreu um erro ao excluir a conta', 'error');
    }
  }

  showAlert(message, type) {
    this.$alert(message, '', type, {
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    });
  }
}

export { AccountDeletionRequestForm as default };


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