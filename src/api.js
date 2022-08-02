import { API } from 'aws-amplify';


class APIHelper {
    constructor() {
        this.myAPI = 'api896a5c0f';
        this.path = '/items';
    }

    async getAllItems() {
        return API.get(this.myAPI, this.path);
    }

    async putItem({
        name,
        price
    }) {
        const myInit = {
            body: {
                id: Math.random().toString(36).slice(2),
                name,
                price
            }
        }
        return API.post(this.myAPI, this.path, myInit)
    }

    async deleteItem(id) {
        return API.del(this.myAPI, this.path + "/" + id);
    }
};

export default APIHelper