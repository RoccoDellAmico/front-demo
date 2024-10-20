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
            return response;  
        }catch(error){
            console.error("Error fetching users", error);
            throw error;
        }
    }

    getAllProducts(){
        return axios.get(PRODUCTO_BASE_URL + "/public/products/get");
    }

}

export default new ProductService();