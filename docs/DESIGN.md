# 玩法设计

## 现状问题（用户表述）

- 前期各 mod 之间有联动，**后期各玩各的**，可玩性和目标性弱
- 任务书没写好，玩家容易不知道做什么
- 大批 Boss 掉落物没有魔改用途
- Boss 强度没有对应调整
- 无尽贪婪的寰宇支配之剑与无尽套装 = 秒杀 + 无敌，大后期一步到底

## 设计原则

1. **前期互换保留**：跨 mod 资源互换是为了不被单一资源卡住，不是问题。
2. **后期必须是多体系汇合**：每种终局材料至少要经过两个体系的玩法。
3. **属性由锻造材质决定，过程由各体系的生活玩法决定**（用户原话）。
4. 上限来自加工链，而不是“一刀秒”。

## 已落地

### 无尽装备封锁

`kubejs/server_scripts/disable_infinity_gear.js`：按**输入**删除，防止从材料方向绕回。

### 虚空链（通用底料）

`kubejs/server_scripts/endgame_void_chain.js`：
Boss 掉落 → 各体系媒介 → 虚空精粹 → 虚空合金 → 星核 → 终焉之证 → 终局奇点。

| 体系 | 媒介 | 入口材料 |
|---|---|---|
| 植物魔法 | 魔力池灌注 1,000,000 魔力 | `botanicpledge:yggdrasil_heart` |
| 机械动力 | 过热混合 | `cataclysm:ignitium_ingot`（烈焰魔） |
| 新生魔艺 | 源质灌铸 5000 | `twilightforest:twilight_scepter`（巫妖） |
| 魔法艺术 | 织法（另配成形兜底） | `mna:mote_arcane` + `mna:arcane_compound` |
| 神秘遗物 | 合成 | 七咒之戒 + 盖亚锭 + 极恶锭 |
| 诡厄巫法 | 黑暗祭坛 | 4× `goety:void_shard` |
| 魂石 | 合成 | 炎血魂石 + 空白魂石 + 寰宇之心 |

### Tetra 锻造骨架

`kubejs/server_scripts/endgame_tetra_chain.js`：龙心+龙血→龙钢；关闭 12 种终局合金的合成捷径。
材质清单与数据结构见 `docs/TETRA.md`。

### 任务书

- `boss_codex.snbt`：65 个 Boss 改为 Tier 1–4 单链条。
- `endgame_void.snbt`：新增「虚空终局」章节。

## 未解决

| 项 | 说明 |
|---|---|
| 终局装备本体 | 要让 Ars 源质炉 / 魔法艺术织法 / 魂石灌注 / 机械动力产线直接驱动 Tetra 锻造，需要 Tetra 附属提供 API |
| 终局可穿戴装备 | 无尽套装移除后尚无等价替代 |
| Boss 强度 | Tier 3/4 相对后期材料需要校准 |
| JEI 隐藏 | KubeJS 2001.6.5 无 `hideItems` 接口，被删配方的物品仍显示 |
| 平衡 | 虚空精粹的合成成本需要按实际掉落率重算 |
