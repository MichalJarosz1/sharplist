"use client"

import React, { useState } from 'react';

export interface HybridFieldProps
{
  fieldName?:string;
  title:string;
  setTitle:(newTitle:string) => boolean;
  handleEnter?:() => void;
  containerStyle?: string;
  inputStyle?: string;
}


const HybridField = ( {fieldName, title, setTitle, handleEnter, containerStyle, inputStyle }: HybridFieldProps) => 
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
        if(handleEnter)
        {
          handleEnter();
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
        <span className="mx-1">{fieldName || "Name"}</span>
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