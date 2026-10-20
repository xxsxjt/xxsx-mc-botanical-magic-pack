# 植物魔艺（Botanical Magic）

Minecraft **1.20.1 / Forge 47.4.20** 整合包的可版本化部分。

本仓库**不是一个独立的构建工程**，而是实例目录
`Botanical-Magic-Art` 中「人写的、需要版本控制」的部分：

| 目录 | 内容 |
|---|---|
| `kubejs/` | 全部脚本（`server_scripts` / `startup_scripts` / `client_scripts`）、自定义物品资源、数据包 |
| `config/ftbquests/` | 任务书章节（`quests/chapters/*.snbt`） |
| `config/` 其余 | 各模组的配置文件（已剔除每个存档各自的目录与无关的大缓存） |
| `defaultconfigs/` | FTB 系列默认配置 |
| `packmenu/` | 主菜单资源包 |
| `resourcepacks/` | 汉化资源包等 |

## 部署

仓库根 **镜像** 到实例版本目录：

```
仓库根                              →  E:/_dx/_Games/MC/xxxxxx/.minecraft/versions/Botanical-Magic-Art/
```

实例路径在受限根 `E:/_dx` 下，写入前需要当前任务授权。部署脚本见 `scripts/deploy.ps1`。

## 进不了本仓库的东西

- `mods/`（约 900 MB）：mod 清单与版本见 `docs/MODLIST.md`
- 存档、日志、`kubejs/probe`、`options.txt`、Yes Steve Model 的模型缓存

## 文档

- `docs/CHANGELOG.md`：本仓库自身改动记录
- `docs/MODLIST.md`：当前实例的 mod 清单（带版本）
- `docs/TETRA.md`：Tetra 的数据结构与本包可用的材质清单

## 许可

仅供个人整合包使用。第三方资源包与 CFPA 英文翻译遵循各自原作者许可。
