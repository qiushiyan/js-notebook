import React, { useRef, useEffect } from "react";
import "./Preview.css";
import { Output } from "./index";

interface PreviewProps {
  output: Output;
}

const html = `
<html>
  <head>
    <body>
      <div id = "root"></div>
      <script>
        const process = {env: {NODE_ENV: "production"}}
      </script>
      <script>
        const handleError = (error) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
          console.error(error);
        }

        window.addEventListener('error', (event) => {
          handleError(event.error)
        })


        window.addEventListener("message", (event) => {
            const {code, error} = event.data
            if (code) {
              try {
                eval(code)
                console.log("evaled")
              } catch(error) {
                handleError(error)
              }
            } else if (event.data.error) {
              handleError()
            }
          }, false)


      </script>
    </body>
  </head>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ output }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.contentWindow.postMessage(output, "*");
  }, [output]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
