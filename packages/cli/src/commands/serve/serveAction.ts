import { serve } from "local-api";
import path from "path";

interface Options {
  port: string;
}

export default async (filename = "notebook.js", { port }: Options) => {
  const dir = path.join(process.cwd(), path.dirname(filename));
  const isProduction = process.env.NODE_ENV === "production";
  try {
    await serve(parseFloat(port), path.basename(filename), dir, !isProduction);
    console.log(
      `Notebook live at http://localhost:${port} \n file: ${path.basename(
        filename
      )} \n directory: ${dir}`
    );
  } catch (error) {
    if (error.code === "EADDRINUSE") {
      console.error(
        `${port} already in use, try using a different port via the --port option`
      );
    } else {
      console.error("something went wrong, try start the server again");
    }
    process.exit(1);
  }
};
