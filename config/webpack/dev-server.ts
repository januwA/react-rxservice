import * as webpack from "webpack";
import * as webpackDevServer from "webpack-dev-server";
import webpackConfig from "./dev.config";

// https://webpack.js.org/configuration/dev-server
const options: webpackDevServer.Configuration = {
  open: false, // 默认打开浏览器
  host: "localhost",
  port: 8888, // 默认打开的端口
  compress: true,
  historyApiFallback: true,
  devMiddleware: {
    writeToDisk: false, // 结果输出到磁盘
  },

  client: {
    overlay: {
      // warnings: true,
      errors: true,
    },
  },
};

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(options, compiler);

(async () => {
  await server.start();
})();
