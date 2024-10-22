import axios from 'axios';


const PRODUCTO_BASE_URL = "http://localhost:4002/api";

class ProductService{

    async getProductsAdmin() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,  // Añadir el token en el encabezado
                }
            };
            const response = await axios.get(`${PRODUCTO_BASE_URL}/admin/products/get`, config);
            return response.data;  
        }catch(error){
            console.error("Error fetching users", error);
            throw error;
        }
    }

    getAllProducts(){
        return axios.get(PRODUCTO_BASE_URL + "/public/products/get");
    }

    //description, price, sizes, club, league, photos, clientCategory, typeOfProduct, year

    async createProduct(newProduct){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,  // Añadir el token en el encabezado
                }
            };
            const response = await axios.post(`${PRODUCTO_BASE_URL}/admin/products`, newProduct, config);
            return response.data;  
        }catch(error){
            console.error("Error creating product ", error);
            throw error;
        }
    }

    async updateProduct(product){
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found. Please login again.');
            }
            const config = {
                headers: {
                  Authorization: `Bearer ${token}`,  // Añadir el token en el encabezado
                }
            };
            await axios.put(`${PRODUCTO_BASE_URL}/admin/products/update`, product, config);
        }catch(error){
            console.error("Error creating product ", error);
            throw error;
        }
    }
}

export default new ProductService();