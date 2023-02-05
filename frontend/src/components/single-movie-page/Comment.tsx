import React, { PropsWithChildren } from "react";
import Review from "../../models/review.interface";

export interface Props {
    review: Review;
}

const Comment = ({review}: PropsWithChildren<Props>) => {

    return (
        <div className="comment"> 
            <span className="titles username">{review.username}</span>
            <div className="body-content">
                <p className="description">{review.comment}</p>
                <div className="details">
                    <p className="rating">Rating : <span>{review.rating}/20</span></p>
                    <p className="date">{review.publicationDate?.toDateString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;