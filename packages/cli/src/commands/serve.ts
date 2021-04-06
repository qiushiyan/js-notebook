import { Command } from "commander";
import { serve } from "local-api";
import path from "path";

interface Options {
  port: string;
}

export const serveCommand = new Command()
  .command("serve [filename]")
  .option("-p, --port <number>", "port to run server on", "3001")
  .description("open a file for editing")
  .action((filename = "notebook.js", options: Options) => {
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parseFloat(options.port), path.basename(filename), dir);
  });
