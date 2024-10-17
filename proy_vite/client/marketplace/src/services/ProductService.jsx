import axios from 'axios';


const PRODUCTO_BASE_REST_API_URL = "http://localhost:4002/api";

class ProductService{

    getAllProducts(){
        return axios.get(PRODUCTO_BASE_REST_API_URL + "/public/products/get");
    }

}

export default new ProductService();