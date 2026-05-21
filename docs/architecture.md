# LiftOps Architecture

# LiftOps 架构说明

---

## Final Target / 最终目标

### English

The final target architecture is:

```txt
React + TypeScript frontend
+ .NET 8 Azure Functions backend API
+ Docker-based local development and build packaging
```

Phase 1 is still static frontend UI only. The Azure Functions API is planned for later phases and must not be treated as implemented yet.

### 中文

最终目标架构是：

```txt
React + TypeScript 前端
+ .NET 8 Azure Functions 后端 API
+ 基于 Docker 的本地开发和构建打包
```

Phase 1 仍然只是静态前端 UI。Azure Functions API 是后续阶段规划，当前不能视为已经实现。

---

## Repository Layout / 项目结构

```txt
liftops/
  client/        React + TypeScript + Vite frontend
  api/           Future .NET 8 Azure Functions backend
  docs/          Product, architecture, and milestone docs
  docker-compose.yml
```

```txt
liftops/
  client/        React + TypeScript + Vite 前端
  api/           后续 .NET 8 Azure Functions 后端
  docs/          产品、架构和阶段文档
  docker-compose.yml
```

---

## Runtime Shape / 运行形态

### English

Development and deployment should be able to use Docker:

- `client` builds the React app and serves it as static assets.
- `api` will later run a .NET 8 Azure Functions isolated worker app.
- `docker-compose.yml` currently runs the frontend only; the API service should be added when Phase 4 creates the Functions project.

### 中文

开发和部署应能使用 Docker：

- `client` 构建 React 应用，并以静态资源方式提供。
- `api` 后续运行 .NET 8 Azure Functions isolated worker 应用。
- 当前 `docker-compose.yml` 只运行前端；Phase 4 创建 Functions 项目后，再加入 API 服务。

---

## Phase Boundaries / 阶段边界

### English

Phase 1 may include Docker scaffolding, but it must not add:

- real backend endpoints
- persistence
- authentication
- AI coach logic
- payment or subscription logic
- medical or diagnostic logic

### 中文

Phase 1 可以包含 Docker 脚手架，但不能添加：

- 真实后端 endpoint
- 持久化
- 登录认证
- AI 教练逻辑
- 支付或订阅逻辑
- 医学或诊断逻辑

---

## Future API Direction / 后续 API 方向

### English

The backend should be a .NET 8 Azure Functions API. Likely function areas:

- wellness check-ins
- core work plans
- support load plans
- load snapshots
- nutrition snapshots
- weekly reviews
- settings

The API should expose training operations data, not medical diagnosis.

### 中文

后端应使用 .NET 8 Azure Functions API。可能的 function 领域：

- wellness check-in
- core work plans
- support load plans
- load snapshots
- nutrition snapshots
- weekly reviews
- settings

API 应提供训练运营数据，不提供医学诊断。
