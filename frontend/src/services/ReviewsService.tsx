import axios from "axios";
import Review from "../models/review.interface";

class ReviewsService {

    prefixUrl = 'http://localhost:3001';
    
    createReview(formData:Review) {
        
        const url:string=`${this.prefixUrl}/api/v1/reviews`;
        return axios.post(url, formData);
    }
    
}

export default new ReviewsService();