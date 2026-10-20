# 变更记录

只记本仓库（整合包可版本化部分）的改动。游戏内玩法设计见 `docs/DESIGN.md`。

## 2026-10-19 — 从实例目录建立仓库

仓库首次建立。内容取自实例
`E:/_dx/_Games/MC/xxxxxx/.minecraft/versions/Botanical-Magic-Art/` 的当前状态，
不含任何玩法改动。

- 收入 `kubejs/`（剔除 `probe/` 自动生成目录）
- 收入 `config/`（剔除 `yes_steve_model/` 模型缓存、`ftbquests/quests_backup*`、
  `inventoryprofilesnext/*/` 每个存档各自的目录、`Blueprint.cfg`）
- 收入 `defaultconfigs/`、`packmenu/resources/`、`resourcepacks/`
- 新增 `docs/MODLIST.md`（309 个文件，从 `mods/` 直接读取）

在此之前实例里已存在的改动（尚未经过任何运行验证），原样带入：

| 文件 | 改动 |
|---|---|
| `kubejs/server_scripts/endgame_void_chain.js` | 新增。7 个体系的「媒介」汇合成虚空精粹→虚空合金→星核→终焉之证 |
| `kubejs/server_scripts/endgame_tetra_chain.js` | 新增。龙心+龙血→龙钢；关闭 12 种终局合金的合成捷径 |
| `kubejs/server_scripts/disable_infinity_gear.js` | 重写。按输入删除无尽装备族，并删掉无尽锭/催化剂/永恒奇点的产出 |
| `kubejs/startup_scripts/custom_items.js` | 新增 11 个物品（虚空精粹/合金/星核/终焉之证 + 7 种媒介） |
| `kubejs/assets/kubejs/{models,textures}/item/` | 上述物品的模型与占位贴图 |
| `kubejs/data/tetra/actions/kubejs_void_extraction.json` + `kubejs/data/kubejs/loot_tables/actions/` | Tetra 击打动作 |
| `config/ftbquests/quests/chapters/endgame_void.snbt` | 新章节「虚空终局」 |
| `config/ftbquests/quests/chapters/boss_codex.snbt` | 65 个无前置 Boss → Tier 1–4 单链条 + 网格重排 + 引导根 |

静态检查（不是运行证据）：所有脚本可被 Node 解析；新引用物品 ID 均在各 mod jar 内核实；
任务文件括号配对、依赖无悬空、章节内 ID 唯一。

实例侧备份：实例目录 `backups/codex_quest_restructure_before_20261019/`。
