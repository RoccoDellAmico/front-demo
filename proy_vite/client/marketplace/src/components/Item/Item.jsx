import React  from "react";
import './Item.css';
import { Link } from "react-router-dom";

const Item = (props) => {

    return (
        <div className="item">
            <Link to={`/product/${props.id}`}> <img onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} src={props.photos} alt="item" /> </Link>{/*window.scrollTo te manda para arriba en la pagina de products*/}
            <p>{props.description }</p>
            <div className="items-prices">
                <div className="items-prices-new"> 
                    ${props.price}

                </div>
            </div>
        </div>
    )
}

export default Item;