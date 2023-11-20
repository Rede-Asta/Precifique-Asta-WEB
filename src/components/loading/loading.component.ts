import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({})
export class loadingComponent extends Vue {
    @Prop({ default: undefined }) active!: boolean;
    // tslint:disable-next-line:no-empty
    @Watch('notificationObj') onPropertyChanged(value: string, oldValue: string) { }
}
