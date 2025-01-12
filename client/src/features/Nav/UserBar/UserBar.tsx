import Button from "../../../shared/Button";

const UserBar = () =>{
    return (
        <div className="user-bar">
            {/*<img></img>*/}
            <p>Имя</p>
            <Button onClick={()=>console.log("UserBar")}>
                "
            </Button>
        </div>
    )
}

export default UserBar;