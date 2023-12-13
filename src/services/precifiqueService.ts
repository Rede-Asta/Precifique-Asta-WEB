import axios from 'axios';
import environment from '@/environments/environment';
export default class PrecifiqueService {


    private headers = {
        'Content-Type': 'application/json',
        
    }



    public async sendEmail(email) {
        return await axios.post(`${environment.setAPIPrecifique()}/users/recover/email`, email, {
            headers: this.headers,
        });
    }

    public async sendToken(data) {
        return await axios.post(`${environment.setAPIPrecifique()}/users/recover/token`, data,  {
            headers: this.headers,
        })
        ;
    }

    public async sendPassword(key, data) {
        return await axios.post(`${environment.setAPIPrecifique()}/users/recover/password`, data, {
            headers: 
            {'Authorization': key,
            'Content-Type': 'application/json',
        }
        });
    }

    public async deleteAccount(data) {
        return await axios.delete(`${environment.setAPIPrecifique()}/users/delete`, {
          headers: this.headers,
          data: data
        });
    }

    public async login(data) {
        return await axios.post(`${environment.setAPIPrecifique()}/users/login`, data, {
          headers: this.headers
        });
    }
}
