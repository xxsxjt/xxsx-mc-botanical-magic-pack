// ============================================================
// 终局链条 v2 — 以 Tetra 为「锻造骨架」，Boss 掉落物为「材质」
//
// 上一版的问题：我把 Tetra 当成了所有物品的通用合成台，只给它挂了一个
// 「空白魂石 → 虚空精粹」的击打动作。理解错了。Tetra 的正确用法是：
//   材质(materials) 决定属性 → 部件(schematics) 决定过程 → 物品从加工台长出来
//
// Tetracelium 已经为植物魔法 / 迷雾森林 / 自然灵气 / 谜之遗物 / 灾变 注册了
// Tetra 材质（terrasteel / elementium / steeleaf / knightmetal / fiery / sky /
// infused_iron / etherium / evil_ingot / ignitium / witherite …），
// tetranomicon 补上了冰火传说的三种龙钢（primary 24，全包最高）。
//
// 所以正确做法不是「造一把新剑」，而是：
//   1. 让这些材质只能从正确的副本来源拿到（删除碎片化的旁路来源）
//   2. 用 Tetra 自带的 crafting_effects 给「用某种材质锻造」附加终局特化
//      ——这就是「属性由材质决定，过程由各体系玩法决定」的原生实现
//
// 需要 mod 侧（tetra 附属）补充的部分写在 docs/modpack/CODEX_KB.md「Tetra 锻造骨架」。
// priority: 43
// ============================================================

ServerEvents.recipes(event => {

  // ---------- 1. 龙钢：只允许从冰火之龙本体取血 ----------
  // 冰火传说原本的 dragonforge 会把龙骨粉 + 龙血 炼成龙钢（配方在模组内），
  // 这里额外补一条「龙心 + 龙血」直接冲压，确保玩家至少打过成年龙。
  event.custom({
    type: 'create:mixing',
    heatRequirement: 'superheated',
    ingredients: [
      { item: 'iceandfire:fire_dragon_heart' },
      { item: 'iceandfire:fire_dragon_blood' },
      { item: 'iceandfire:fire_dragon_blood' },
      { tag: 'forge:ingots/steel' }
    ],
    results: [{ item: 'iceandfire:dragonsteel_fire_ingot', count: 1 }]
  }).id('kubejs:tetra/dragonsteel_fire_from_heart')

  event.custom({
    type: 'create:mixing',
    heatRequirement: 'superheated',
    ingredients: [
      { item: 'iceandfire:ice_dragon_heart' },
      { item: 'iceandfire:ice_dragon_blood' },
      { item: 'iceandfire:ice_dragon_blood' },
      { tag: 'forge:ingots/steel' }
    ],
    results: [{ item: 'iceandfire:dragonsteel_ice_ingot', count: 1 }]
  }).id('kubejs:tetra/dragonsteel_ice_from_heart')

  event.custom({
    type: 'create:mixing',
    heatRequirement: 'superheated',
    ingredients: [
      { item: 'iceandfire:lightning_dragon_heart' },
      { item: 'iceandfire:lightning_dragon_blood' },
      { item: 'iceandfire:lightning_dragon_blood' },
      { tag: 'forge:ingots/steel' }
    ],
    results: [{ item: 'iceandfire:dragonsteel_lightning_ingot', count: 1 }]
  }).id('kubejs:tetra/dragonsteel_lightning_from_heart')

  // ---------- 2. 终局材质的「合成捷径」全部关闭 ----------
  // 这些材质必须是 Tetra 材质，玩家应该去 Boss 身上拿，而不是用配方攒出来。
  // 只删成品产出，不碰它们作为原料的配方（避免下游物品不可得）。
  const noCraftAlloys = [
    'botania:terrasteel_ingot',
    'botania:elementium_ingot',
    'twilightforest:fiery_ingot',
    'twilightforest:knightmetal_ingot',
    'twilightforest:steeleaf_ingot',
    'naturesaura:sky_ingot',
    'enigmaticlegacy:etherium_ingot',
    'cataclysm:ignitium_ingot',
    'cataclysm:cursium_ingot',
    'iceandfire:dragonsteel_fire_ingot',
    'iceandfire:dragonsteel_ice_ingot',
    'iceandfire:dragonsteel_lightning_ingot',
  ]
  noCraftAlloys.forEach(id => event.remove({ output: id }))
})

// 说明：上面「关闭合成」只是第一层。真正的强度阶梯由 Tetra 材质本身的
// primary/durability/toolLevel 决定，详见 CODEX_KB「Tetra 锻造骨架」一节。
