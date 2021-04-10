import React, { useRef, useEffect } from "react";
import { useSelector } from "../../hooks";
import "./Preview.css";

interface PreviewProps {
  id: string;
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
          // console.error(error);
        }

        window.addEventListener('error', (event) => {
          // handle asynchronous run-time error
          handleError(event.error)
        })

        window.addEventListener("message", (event) => {
            const {code, error} = event.data
            if (code || error) {
              if (code) {
                try {
                  eval(code)
                } catch(error) {
                  // handle run-time aerror
                  handleError(error)
                }
              } else if (error) {
                // bundle-time error
                handleError(error)
              }
            }
          }, false)
      </script>
    </body>
  </head>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ id }) => {
  const iframe = useRef<any>();
  const { code, error, loading } = useSelector(
    (state) => state.bundler[id]
  ) || {
    code: "",
    error: "",
    loading: false,
  };

  useEffect(() => {
    iframe.current.contentWindow.postMessage({ code, error }, "*");
  }, [code, error]);
  return (
    <div className="preview-wrapper">
      {loading && (
        <div className="progress-wrapper">
          <progress className="progress is-small is-primary" max="">
            Loading
          </progress>
        </div>
      )}
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

export default React.memo(Preview);
