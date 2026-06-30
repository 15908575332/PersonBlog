// node后端服务器
import userRelatedApi from "./routes/userRelatedApi.js";
import messageBoardApi from "./routes/messageBoardApi.js";
import favoritesApi from "./routes/favoritesApi.js";
import mainContentApi from "./routes/mainContentApi.js";
import blogCommentsApi from "./routes/blogCommentsApi.js";
import instantMessagingApi from "./routes/instantMessagingApi.js";
import express from "express"; // express框架
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
config({ path: "./.env" });
import authenticateToken from "./middleware/authenticateToken.js";

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
app.use("/user", userRelatedApi); //用户信息
app.use("/", messageBoardApi); //messageBoard留言
app.use("/treasureBox", favoritesApi); //收藏夹
app.use("/main", mainContentApi); //主要内容
app.use("/message", blogCommentsApi); // 博客留言
app.use("/instansMessaging", instantMessagingApi); //im聊天板块

// 错误处理中间件（放在所有路由之后）
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ code: "99", msg: "Internal Server Error" });
});
// 监听端口
app.listen(3000); // 监听server3000端口
console.log("success listen at http://localhost:3000");
