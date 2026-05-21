# LiftOps API

# LiftOps API 说明

## English

The final backend target is a .NET 8 Azure Functions API.

Phase 1 does not implement backend endpoints. This folder is intentionally reserved for a later Azure Functions project.

Expected Phase 4 work:

- create a .NET 8 Azure Functions isolated worker project
- add models for check-ins, plans, load snapshots, nutrition snapshots, weekly reviews, and settings
- add API endpoints
- add an Azure Functions Dockerfile
- add the API service to `docker-compose.yml`

## 中文

最终后端目标是 .NET 8 Azure Functions API。

Phase 1 不实现后端 endpoint。当前文件夹刻意保留给后续 Azure Functions 项目。

Phase 4 预期工作：

- 创建 .NET 8 Azure Functions isolated worker 项目
- 添加 check-ins、plans、load snapshots、nutrition snapshots、weekly reviews 和 settings 模型
- 添加 API endpoints
- 添加 Azure Functions Dockerfile
- 将 API 服务加入 `docker-compose.yml`
