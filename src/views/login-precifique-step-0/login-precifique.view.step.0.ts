import { Component, Prop, Vue } from 'vue-property-decorator';
import Swal, { SweetAlertType } from 'sweetalert2';
import VueSimpleAlert from 'vue-simple-alert';

@Component({})
export class loginPrecifiqueStep0View extends Vue {


  @Prop() propShowVerificationCode!: boolean;

  
  public showVerificationCode: boolean = this.propShowVerificationCode;
  

  public deviceId: string = '';
  public refresh: boolean = false;
  public emailButton: boolean =  true;
  public myStep: string = '1';

  

  get isApp() {
    return this.$store.state.environment.isApp
  }

  handleStep(e){
    this.myStep = e
  }


  

}
