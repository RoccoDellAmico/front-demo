import axios from "axios";
import React from "react";

const DISCOUNTS_BASE_URL = 'http://localhost:4002/api/admin/discounts'

class DiscountService{

    async getDiscounts(){
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                Authorization: `Bearer ${token}`,
                }
            };
            const response = await axios.get(DISCOUNTS_BASE_URL, config)
            return response
        } catch(error) {
            console.error('error ' + error)
            throw error
        }
    }

    async createDiscount(code, description, percentage, fixedAmount, startDate, endDate){
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const body = {
                code : code,
                description : description, 
                percentage : percentage, 
                fixedAmount : fixedAmount,
                startDate : startDate,
                endDate : endDate
            }
            const response = await axios.post(DISCOUNTS_BASE_URL + '/create', body, config) 
            return response
        } catch(error) {
            console.error('error ' + error)
            throw error
        }
    }

    async updateDiscount(id, code, description, percentage, fixedAmount, startDate, endDate){
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const body = {
                id : id,
                code : code,
                description : description, 
                percentage : percentage, 
                fixedAmount : fixedAmount,
                startDate : startDate,
                endDate : endDate
            }
            const response = await axios.put(DISCOUNTS_BASE_URL + '/update', body, config)
            return response
        } catch(error) {
            console.error('error ' + error)
            throw error
        }
    }

    async deleteDiscount(id){
        try{
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            await axios.delete(`${DISCOUNTS_BASE_URL}/delete/${id}`, config)
            console.log('Deleted discount')
        } catch(error) {
            console.error('error ' + error)
            throw error
        }
    }
}

export default new DiscountService();