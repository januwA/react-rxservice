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

  // 现在有个 /api/test 的请求会将请求代理到 http://localhost:3000/api/test
  // https://webpack.js.org/configuration/dev-server/#devserverproxy
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      secure: false,
      changeOrigin: true,
    },
  },
};

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(options, compiler);

(async () => {
  await server.start();
})();
