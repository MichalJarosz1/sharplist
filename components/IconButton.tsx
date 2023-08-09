import { IconButtonProps } from '@/types'
import Image from 'next/image'

const Button = ({iconPath, title, handleClick}: IconButtonProps) => {
  return (
    <button 
        className="custom-btn"
        onClick={handleClick}>
        <Image src={iconPath} alt={title} fill className="object-contain"/>
    </button>
  )
}

export default Button