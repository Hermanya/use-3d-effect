# use-3d-effect

>

[![NPM](https://img.shields.io/npm/v/use-3d-effect.svg)](https://www.npmjs.com/package/use-3d-effect) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![screencast](https://media.giphy.com/media/fLp5ARL1xMwa7XTYQ4/giphy.gif)

[Demo](https://hermanya.github.io/use-3d-effect)

## Install

```bash
npm install --save use-3d-effect
```

## Usage

```tsx
import * as React from 'react'
import 'resize-observer-polyfill';
import { animated } from 'react-spring';
import { use3dEffect } from 'use-3d-effect';

const Example = () => {
  const ref = React.useRef(null);
  const {style, ...mouseHandlers} = use3dEffect(ref);

  return (
    <animated.div
      ref={ref}
      style={{
        background: '#61dafb', color: 'white', padding: '2em',
        ...style
      }}
      {...mouseHandlers}
    >
      Hover over me!
    </animated.div>
  );
};
```

## License

MIT © [Hermanya](https://github.com/Hermanya)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
