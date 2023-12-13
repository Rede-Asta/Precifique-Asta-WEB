import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export class deleteAccountStep0View extends Vue {




  public deviceId: string = '';
  public showVerificationCode: boolean = false;
  public refresh: boolean = false;
  public businessName: string = '';
  public token: string = '';
 
  public email: string | null = '';
  public password: string | null = '';


  toStep(e){
    this.$emit("step", e)
  } 

  mounted(){
    this.email = localStorage.getItem('email');
    this.password = localStorage.getItem('password');
     }


}


