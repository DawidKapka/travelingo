import axios, {AxiosResponse} from "axios";

export class ApiAdapter {
    private readonly API_URL = process.env.VUE_APP_API_URL;

    public async get(path: string): Promise<any> {
        return new Promise<any>((resolve) => {
            axios.get(`${this.API_URL}${path}`)
                .then((response: AxiosResponse) => {
                    resolve(response.data);
                })
                .catch((error: any) => {
                    throw new Error(`GET-Request to ${this.API_URL}${path} failed: ${error}`);
                });
        });
    }

    public post(path: string, data: any) {
        return axios.post(`${this.API_URL}${path}`, data);
    }

    public put(path: string, data: any) {
        return axios.put(`${this.API_URL}${path}`, data);
    }

}
