import "../styles/components/burger-menu.scss";

const BurgerMenu = ({onClickAction} : any) => {
    return (
        <button type="button" onClick={onClickAction} className="burger-menu">&#9776;</button>
    )
}

export default BurgerMenu;