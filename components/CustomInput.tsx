"use client"

import React, { useEffect, useState } from 'react';

export interface CustomInputProps
{
  placeholder?:string;
  title:string;
  setTitle:(newTitle:string) => boolean;
  inputStyle?: string;
}


const CustomInput = ( {placeholder, title, setTitle, inputStyle }: CustomInputProps) => 
{
  const [text, setText] = useState(title);

  const InputRef= React.useRef<HTMLInputElement>(null);
  
  const onchange = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    setText(event.target.value);
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>): void =>
  {
    if (e.key === 'Enter')
      {
        if(!setTitle(text))
          setText(title);
      }
  }

  const onBlur = (): void => 
  {
    if(!setTitle(text))
    setText(title);
  }

  return (
    <input 
      className={inputStyle}
      ref={InputRef}
      type="text"
      value={text}
      placeholder={placeholder}
      onChange={onchange}
      onMouseDown={() => InputRef.current?.focus()}
      onKeyUp={onEnter}
      onBlur={onBlur}

    />
  )
}

export default CustomInput