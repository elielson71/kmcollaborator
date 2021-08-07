import {  ButtonHTMLAttributes, ReactNode,} from 'react'
//import { Link as button } from 'react-router-dom'
import './style.scss'


type typeProps= ButtonHTMLAttributes<HTMLButtonElement> &{
    children:ReactNode,
    onClick?:any
}
export function Button(props: typeProps,) {
    const {children,onClick}=props
    return (
        <div id="button">
            <button onClick={onClick} className='btn btn-primary btn-lg btn-block'>
                {children}
            </button>
            
            
        </div>
    )
}