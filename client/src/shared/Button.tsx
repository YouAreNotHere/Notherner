interface Props{
    onClick:(event:React.MouseEvent<HTMLButtonElement>) => any;
    children?:any;
    className?: string;
}

const Button = ({onClick, children, className}: Props) =>{
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;