import { Component, Prop, Vue } from 'vue-property-decorator';


@Component({})
export class loginPrecifiqueReturnView extends Vue {

  @Prop() propPage!: string;

  public page: string = this.propPage;
  public deviceId: string = '';
  public showVerificationCode: boolean = false;
  public optIn: string = 'phone';
  public refresh: boolean = false;
  public businessName: string = '';
  public email: string = '';
  public phone: string = '';
  





  mounted() {}

  public openVerificationCode() {
    this.showVerificationCode = true;
  }

  public closeVerificationCode() {
    this.showVerificationCode = false;
  }
}
