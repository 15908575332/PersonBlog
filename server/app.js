// node后端服务器
import userRoutes from "./routes/user.routes.js";
import messageBoardRoutes from "./routes/messageBoard.routes.js";
import favoritesRoutes from "./routes/favorite.routes.js";
import articleRoutes from "./routes/article.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import instantMessagingApi from "./routes/instantMessagingApi.js";
import express from "express"; // express框架
import { networkInterfaces } from "os";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
config({ path: "./.env" });
import authenticateToken from "./middlewares/authenticateToken.js";

// body-parser是非常常用的一个express中间件，作用是对http请求体进行解析
const { json, urlencoded } = bodyParser;
const app = express();

// 公共中间件配置（CORS 必须放在最前面）
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(json());
app.use(urlencoded({ extended: false }));

// 网易云音乐 API 代理（免认证）
app.use("/music-api", async (req, res) => {
  try {
    const target = `http://localhost:3100${req.originalUrl.replace("/music-api", "")}`;
    const fetchResp = await fetch(target, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
    });
    const data = await fetchResp.json();
    res.status(fetchResp.status).json(data);
  } catch (e) {
    res.status(502).json({ code: 502, msg: "音乐服务暂不可用" });
  }
});

app.use(authenticateToken);

// 后端api路由
app.use("/user", userRoutes); //用户信息
app.use("/", messageBoardRoutes); //messageBoard留言
app.use("/treasureBox", favoritesRoutes); //收藏夹
app.use("/main", articleRoutes); //主要内容
app.use("/message", commentRoutes); // 博客留言
app.use("/instansMessaging", instantMessagingApi); //im聊天板块

// 错误处理中间件（放在所有路由之后）
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ code: "99", msg: "Internal Server Error" });
});
// 监听端口：显式绑定 0.0.0.0，保证局域网内其他设备可以连入（不能只绑本机回环地址）
const PORT = 3000;
const HOST = "0.0.0.0";

// 列出本机局域网 IPv4 地址，启动时直接打印可访问地址
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((item) => item && item.family === "IPv4" && !item.internal)
  .map((item) => item.address);

app.listen(PORT, HOST, () => {
  console.log(`success listen at http://localhost:${PORT} (bind ${HOST})`);
  lanAddresses.forEach((ip) => console.log(`lan access at http://${ip}:${PORT}`));
});
