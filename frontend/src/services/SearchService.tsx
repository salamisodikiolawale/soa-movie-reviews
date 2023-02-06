import axios from "axios";

class SearchService {

    prefixUrl = 'http://localhost:3005';
    
    searchMovie(formData : any) {
        
        const url:string=`${this.prefixUrl}/api/v1/search`;
        return axios.post(url, formData);
    }
    
}

export default new SearchService();