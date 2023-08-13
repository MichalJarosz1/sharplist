"use client"

import React, { useState } from 'react';

export interface HybridFieldProps
{
  fieldName?:string;
  title:string;
  setTitle:(newTitle:string) => boolean;
  containerStyle?: string;
  inputStyle?: string;
}


const HybridField = ( {fieldName, title, setTitle, containerStyle, inputStyle }: HybridFieldProps) => 
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
        {
          setText(title);
        }
      }
  }

  const onBlur = () =>
  {
    if(!setTitle(text))
    {
      setText(title);
    }
  }

    return (
      <div className={containerStyle}>
        <span>{fieldName || "Name"}</span>
        <span>{">"}</span>
        <input 
          className={inputStyle}
          ref={InputRef}
          type="text"
          value={text}
          placeholder={fieldName}
          onChange={onchange}
          onMouseDown={() => InputRef.current?.focus()}
          onKeyUp={onEnter}
          onBlur={onBlur}
          />
    </div>
  )
}

export default HybridField