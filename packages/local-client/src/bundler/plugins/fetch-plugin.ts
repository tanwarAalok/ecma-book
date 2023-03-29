import axios from 'axios';
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
      setup(build: esbuild.PluginBuild) {
        build.onLoad({ filter: /(^index\.js$)/ }, () => {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        });

        build.onLoad({ filter: /.*/ }, async (args: any) => {
          // checking if already fetched and if present in cache then return
          const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
            args.path
          );
          if (cachedResult) return cachedResult;
        });

        build.onLoad({ filter: /.css$/ }, async (args: any) => {
          const { data, request } = await axios.get(args.path);

          // Removing any already present single or double quotes in css data file and making it in one single line.
          const escaped = data
            .replace(/\n/g, "")
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'");

          const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);

           `;

          const result: esbuild.OnLoadResult = {
            loader: "jsx",
            contents,
            resolveDir: new URL("./", request.responseURL).pathname,
          };

          // storing response in cache
          await fileCache.setItem(args.path, result);
          return result;
        });

        build.onLoad({ filter: /.*/ }, async (args: any) => {
          const { data, request } = await axios.get(args.path);

          const result: esbuild.OnLoadResult = {
            loader: "jsx",
            contents: data,
            resolveDir: new URL("./", request.responseURL).pathname,
          };

          // storing response in cache
          await fileCache.setItem(args.path, result);
          return result;
        });
    },
  };
};
