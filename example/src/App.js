import React from 'react'

import { useMyHook } from 'use-3d-effect'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
