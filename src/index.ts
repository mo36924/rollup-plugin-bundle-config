import type { Plugin } from "rollup";
import { build } from "esbuild";

export default (): Plugin => ({
  name: "bundle-config",
  load: (id) =>
    build({
      entryPoints: [id],
      platform: "node",
      format: "cjs",
      bundle: true,
      write: false,
      plugins: [
        {
          name: "node-externals",
          setup(build) {
            build.onResolve({ filter: /^[@\w]/ }, (args) => {
              return { external: args.path !== id };
            });
          },
        },
      ],
    }).then((result) => result.outputFiles[0].text),
});
