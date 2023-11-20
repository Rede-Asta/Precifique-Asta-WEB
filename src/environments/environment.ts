

const development: boolean = true;

const isApp: boolean = false;


const apiUrlPrecifique: string = 'https://rgdklbiz5i.execute-api.us-east-1.amazonaws.com/dev2'


export default class environment {


    static setAPIPrecifique = () => development ? apiUrlPrecifique : apiUrlPrecifique; 


    static isApp = () => isApp;


}
