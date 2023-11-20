import { Component, Prop, Vue } from 'vue-property-decorator';
import Swal, { SweetAlertType } from 'sweetalert2';
import VueSimpleAlert from 'vue-simple-alert';


@Component({})
export class loginPrecifiqueView extends Vue {


  @Prop() propShowVerificationCode!: boolean;
  public showVerificationCode: boolean = this.propShowVerificationCode;
  

  public deviceId: string = '';
  public refresh: boolean = false;
  public email: string = '';
  public emailButton: boolean =  true;

  

  get isApp() {
    return this.$store.state.environment.isApp
  }

  toStep(e){
    this.$emit("step", e)
  } 



}
