import { Component, Prop, Vue } from 'vue-property-decorator';
import PrecifiqueService from '@/services/precifiqueService';
import { loginPrecifiqueCodeView } from '../login-precifique-code/login-precifique-code.view';


@Component({})
export class loginPrecifiquePasswordView extends Vue {


  public deviceId: string = '';
  public showVerificationCode: boolean = false;
  public optIn: string = 'phone';
  public refresh: boolean = false;
  public businessName: string = '';
  public email: string | null = '';
  public phone: string = '';
  public token: string | null = '';




  toStep(e){
    this.$emit("step", e)
  } 

  mounted(){
    this.email = localStorage.getItem('email');
    this.token = localStorage.getItem('token');
  }


}
