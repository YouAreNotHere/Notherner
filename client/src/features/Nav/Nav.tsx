import LabelIcon from "./label-icon";
import "./Nav.scss"
import labelText from "./label-text.png";
import Button from "../../shared/Button"
import Input from "../../shared/Input";
import UserBar from "./UserBar/UserBar";

const Nav = () => {
    return(
        <nav className="nav">
            <div className="labeles-container">
                <LabelIcon/>
                <img src={labelText} width="100px" height="10px"/>
            </div>
            <Button onClick={()=> console.log("Каталог А")} className={"catalog-button"}>
                {/*<div className="burger-button-wrapper">*/}
                    <Button onClick={()=>console.log("Каталог Б")} className={"catalog-burger-button"}/>
                {/*</div>*/}
                Каталог
            </Button>
            <Input/>
            <div className="button-container">
                <Button onClick={()=> console.log("Избранное")}>
                    Избранное
                </Button>
                <Button onClick={()=> console.log("Заказы")}>
                    Заказы
                </Button>
                <Button onClick={()=> console.log("Корзина")}>
                    Корзина
                </Button>
                <UserBar/>
            </div>
        </nav>
    )
}

export default Nav;