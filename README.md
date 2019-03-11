# use-3d-effect

>

[![NPM](https://img.shields.io/npm/v/use-3d-effect.svg)](https://www.npmjs.com/package/use-3d-effect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-3d-effect
```

## Usage

```tsx
import * as React from 'react'
import 'resize-observer-polyfill'
import { animated } from 'react-spring';
import { use3dEffect } from 'use-3d-effect'

const Example = () => {
  const ref = useRef()
  const {style, ...mouseHandlers} = use3dEffect(ref)
  return (
    <animated.div ref={ref} style={{
      width: '256px',
      height: '256px',
      background: 'aliceblue',
      ...style
    }} {...mouseHandlers}>
      3D effect
    </animated.div>
  )
}
export default Example
```

## License

MIT © [Hermanya](https://github.com/Hermanya)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
