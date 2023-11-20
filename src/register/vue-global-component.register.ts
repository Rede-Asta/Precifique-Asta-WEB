import Vue, { VueConstructor } from 'vue';

import LoginPrecifiqueForm  from '@/components/login-precifique/login-precifique-form/LoginPrecifiqueForm.vue'
import CodePrecifiqueForm   from '@/components/login-precifique/code-precifique-form/CodePrecifiqueForm.vue';
import PasswordPrecifiqueForm from '@/components/login-precifique/password-precifique-form/PasswordPrecifiqueForm.vue'

import loginPrecifiqueView from '@/views/login-precifique/login-precifique.vue'
import  loginPrecifiqueCodeView  from '@/views/login-precifique-code/login-precifique-code.vue';
import  loginPrecifiqueReturnView  from '@/views/login-precifique-return/login-precifique-return.vue';
import  loginPrecifiquePasswordView  from '@/views/login-precifique-password/login-precifique-password.vue';

export function registerVueGlobalComponent(vue: VueConstructor<Vue>) {
    [
       

        { component: LoginPrecifiqueForm, selector: 'login-precifique-form'},
        { component: CodePrecifiqueForm, selector: 'code-precifique-form'},
        { component: PasswordPrecifiqueForm, selector: 'password-precifique-form'},


        { component: loginPrecifiqueView, selector: 'login-precifique'},
        { component: loginPrecifiqueCodeView, selector: 'login-precifique-code'},
        { component: loginPrecifiquePasswordView, selector: 'login-precifique-password'},
        { component: loginPrecifiqueReturnView, selector: 'login-precifique-return'},


    ].forEach(config => vue.component(config.selector, config.component));
}
