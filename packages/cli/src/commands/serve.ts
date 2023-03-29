import { Command } from "commander";
import { serve } from "@ecma-book/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === 'production';

interface LocalApiError {
  code: string;
}

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "Port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(parseInt(options.port), path.basename(filename), dir, !isProduction);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port}`
      )
    } catch (err) {
      const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === "string";
      };
      if (isLocalApiError(err)) {
        if (err.code === "EADDRINUSE") {
          console.error("Port is in use. Try running on a different port.");
        }
      } else if (err instanceof Error) {
        console.log("Error occured: ", err.message);
      }
      process.exit(1);
    }
  });
