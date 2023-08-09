import React from 'react'
import { MainMenu } from '@/components'

const MainPlaceholder = () => {
  return (
    <div className='font-mono m-2 bottom-0 text-center text-slate-200 unselectable'>
      Create your shopping list smoothly.<br/>
      <MainMenu text="Start!">
        <button value="Load default settings"
        />
      </MainMenu>
    </div>
  )
}

export default MainPlaceholder