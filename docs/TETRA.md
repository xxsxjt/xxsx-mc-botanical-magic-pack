# Tetra — 数据结构与本包可用的材质

> 依据：`mods/tetra-1.20.1-6.9.0.jar`、`tetracelium-1.20.1-1.3.1.jar`、
> `tetranomicon-1.6.1-1.20.1.jar`、`tetraextras-0.1.4-1.20.1.jar` 内的
> `data/tetra/` 与类文件反查（2026-10-19）。不是官方文档的转述。

## 数据目录

| 路径 | 作用 |
|---|---|
| `data/<ns>/materials/<category>/<key>.json` | **材质**：决定属性 |
| `data/<ns>/schematics/<module>/<variant>.json` | **部件**：决定过程与可用材质计划 |
| `data/<ns>/improvements/<slot>/<key>.json` | **强化**：属性/效果增量 |
| `data/<ns>/crafting_effects/…` | 加工台在锻造时按条件施加/移除强化 |
| `data/<ns>/actions/*.json` + `loot_tables/actions/*` | 持工具击打方块的交互 |
| `data/<ns>/synergies` / `replacements` / `tiers` / `tags` | 联动、替换、层级表 |

同 key 的文件会按 `MergingDataStore` 合并，`"replace": true` 才整体替换。

### 材质字段（`MaterialData`）

`key`、`category`、`primary` / `secondary` / `tertiary`、`durability`、
`integrityGain` / `integrityCost`、`magicCapacity`、`toolLevel`、`toolEfficiency`、
`tints` / `textures` / `textureOverrides` / `tintOverrides`、`material.items`、
`requiredTools`、`experienceCost`、`tags`、`rarity`、`features`、`improvements`、
`effects`、`aspects`、`attributes`、`hidden` / `hiddenOutcomes`。

### 部件字段（`schematics`）

`replace`、`slots`、`materialSlotCount`、`displayType`、`outcomes[]`（`materials` 材质计划、
`moduleKey`、`moduleVariant`、`improvements`、`countFactor`）、`translation`、
`glyph`、`requiredTools`、`requirements`、`hone`、`rarity`。

材质计划写法：`tetra:metal/` 表示整个金属类；`tetra:metal/iron` 表示单个材质。

### 强化字段（`improvements`）

`key`、`level`、`attributes`（`**generic.attack_damage`、`**tetra:draw_damage` 等）、
`effects`、`tools`、`durability`、`integrity`、`materials`、`extract`。

### 加工效果（`crafting_effects`）

条件类型如 `tetra:and` / `tetra:craft_type` / `tetra:material` / `tetra:locked` / `tetra:tool`；
结果类型如 `tetra:apply_improvements` / `tetra:remove_improvements` / `tetra:material_reduction`。
**只在加工台触发**，不感知外部机器。

## 本包已注册的终局材质

来源为本包已装的 Tetra 附属；`primary` 为伤害档，`durability` 为耐久。

| 材质 key | 来源物品 | primary | durability | 提供者 |
|---|---|---:|---:|---|
| `iceandfire_fire_dragonsteel` | `iceandfire:dragonsteel_fire_ingot` | 24 | 8000 | tetranomicon |
| `iceandfire_ice_dragonsteel` | `iceandfire:dragonsteel_ice_ingot` | 24 | 8000 | tetranomicon |
| `iceandfire_lightning_dragonsteel` | `iceandfire:dragonsteel_lightning_ingot` | 24 | 8000 | tetranomicon |
| `nefarious` | `enigmaticlegacy:evil_ingot` | 14.24 | 3431 | tetraextras |
| `etherium` | `enigmaticlegacy:etherium_ingot` | 11.2 | 2426 | tetraextras |
| `ignitium_ingot` | `cataclysm:ignitium_ingot` | 9.8 | 8630 | tetraextras |
| `witherite_ingot` | `cataclysm:witherite_ingot` | 8.6 | 2031 | tetraextras |
| `terrasteel` | `botania:terrasteel_ingot` | 7 | 2300 | tetracelium |
| `fiery_ingot` | `twilightforest:fiery_ingot` | 7 | 1024 | tetracelium（tetranomicon 另有 `twilightforest_fiery_metal`） |
| `sky` | `naturesaura:sky_ingot` | 6 | 1500 | tetracelium |
| `knightmetal` | `twilightforest:knightmetal_ingot` | 6 | 512 | tetracelium（tetranomicon 另有 `twilightforest_knightmetal`） |
| `manasteel` | `botania:manasteel_ingot` | 6 | 300 | tetracelium |
| `steeleaf` | `twilightforest:steeleaf_ingot` | 6 | 131 | tetracelium（tetranomicon 另有 `twilightforest_steeleaf`） |
| `elementium` | `botania:elementium_ingot` | 5 | 720 | tetracelium |
| `infused_iron` | `naturesaura:infused_iron` | 5 | 250 | tetracelium |

所有材质都是 `category: metal`，可以填入任何接受 `tetra:metal/` 的部件槽
（剑刃、镐头、锤头、盾板等），这是在加工台里“把 Boss 掉落变成装备”的现有路径。

附属自带强化（key）：`mana_repair`、`aura_mending_innate`、`fiery_blazing`、
`fiery_igniting`、`knightmetal_punishing`、`knightmetal_skewering`、`auto_smelt`、`hydral_bond`。

## 已知边界

- 基础 Tetra 只自带 copper / gold / iron / netherite 四种金属材质，
  上面这些终局材质**全部来自附属**；移除附属会让它们消失。
- `crafting_effects` 只在加工台触发。要让 Ars 源质炉、魔法艺术织法、魂石灌注、
  机械动力产线直接产出 Tetra 部件，必须由 Tetra 附属提供 API —— KubeJS 没有接口
  能给 modular 物品预装模块与材质。
