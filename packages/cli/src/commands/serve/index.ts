import { Command } from "commander";
import serveAction from "./serveAction";

export default new Command()
  .command("serve [filename]")
  .option("-p, --port <number>", "port to run server on", "3001")
  .description("open a file for editing")
  .action(serveAction);
