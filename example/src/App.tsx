import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "resize-observer-polyfill";
import { animated } from "react-spring";
import { use3dEffect } from "use-3d-effect";
import SyntaxHighlighter from "react-syntax-highlighter";

const example = `
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
};
`;
const App: React.FunctionComponent<{}> = (): JSX.Element => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { style, ...mouseHandlers } = use3dEffect(ref);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src={logo} className="App-logo" alt="logo" /> use-3d-effect
        </h1>
        <p>React hook for the 3D tilt card effect.</p>
        <animated.div
          ref={ref}
          style={{
            background: "#61dafb",
            padding: "2em",
            borderRadius: "0.25em",
            ...style
          }}
          {...mouseHandlers}
        >
          Hover over me!
        </animated.div>
      </header>
      <div className="App-body">
        <code className="App-code">
          yarn add use-3d-effect{" "}
          <span style={{ color: "gray" }}>
            react-spring resize-observer-polyfill
          </span>
        </code>
        <SyntaxHighlighter
          language="javascript"
          customStyle={{
            margin: "1em auto",
            padding: "0 1em",
            display: "block"
          }}
        >
          {example}
        </SyntaxHighlighter>

        <footer className="App-footer">
          <a
            className="App-link"
            href="https://npmjs.org/package/use-3d-effect"
          >
            npm
          </a>
          <a
            className="App-link"
            href="https://github.com/hermanya/use-3d-effect"
          >
            github
          </a>
          <a className="App-link" href="https://hermanya.github.io">
            made by Herman Starikov
          </a>
        </footer>
      </div>
    </div>
  );
};

export default App;
