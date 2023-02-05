import { NavLink } from "react-router-dom"

const BackLink = () => {
    return (
        <div className='back-link'>
            <NavLink className='link' to="/">&larr; Go back to homepage</NavLink>
        </div>
    )
}

export default BackLink;