import axios from "axios";
import { FilterForm } from "../models/searchFilter.interface";

class SearchService {

    prefixUrl = 'http://localhost:3005';
    
    searchMovie(formData : FilterForm) {
        console.log(formData);
        
        const url:string=`${this.prefixUrl}/api/v1/search`;
        return axios.post(url, formData);
    }
    
}

export default new SearchService();