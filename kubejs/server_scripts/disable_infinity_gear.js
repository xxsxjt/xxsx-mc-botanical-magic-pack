// ============================================================
// 终局装备封锁 — 彻底禁用「秒杀 / 无敌」类装备
// 原因：
//   1) EndingLibrary InventoryMixin 与 Tetra 改造护甲 NPE
//   2) 无尽套装 = 无敌、寰宇支配之剑 = 秒杀，大后期一步到底，后期没有提升空间
// 策略：移除成品配方 + 把产物从「无尽催化剂」的合成中剔除，让催化剂本身不可得，
//       连带锁死一切以催化剂为材料的上层装备。
//       配方按「输入」删除，不只按「输出」删除，防止改名 / 换工作台的变体绕过。
// priority: 45
// ============================================================

ServerEvents.recipes(event => {
  // ---- 1. 无量产：所有「以它们为原料」的配方一并移除 ----
  const bannedInputs = [
    // 核心装备（秒杀 / 无敌）
    'avaritia:infinity_sword',
    'avaritia:infinity_helmet',
    'avaritia:infinity_chestplate',
    'avaritia:infinity_pants',
    'avaritia:infinity_boots',
    // 以「无敌」为核心的整套与准无敌件
    'avaritia:infinity_ring',
    'avaritia:infinity_totem',
    'avaritia:infinity_armor',
    'avaritia:infinity_elytra',
    'avaritia:infinity_upgrade',
    // 无尽材料（含它们就可一路做到无敌件）
    'avaritia:infinity_ingot',
    'avaritia:infinity_nugget',
    'avaritia:infinity_catalyst',
    'avaritia:eternal_singularity',

    // MoreAvaritia：中子套、无尽改、伪无尽、最终幻想之剑
    'more_avaritia:neutron_helmet',
    'more_avaritia:neutron_chestplate',
    'more_avaritia:neutron_leggings',
    'more_avaritia:neutron_boots',
    'more_avaritia:neutron_sword',
    'more_avaritia:neutron_bow',
    'more_avaritia:infinity_helmet',
    'more_avaritia:infinity_head',
    'more_avaritia:infinity_chestplate',
    'more_avaritia:infinity_legs',
    'more_avaritia:infinity_boots',
    'more_avaritia:infinity_sword',
    'more_avaritia:infinity_god_sword',
    'more_avaritia:infinity_fake_helmet',
    'more_avaritia:infinity_fake_chestplate',
    'more_avaritia:infinity_fake_leggings',
    'more_avaritia:infinity_fake_boots',
    'more_avaritia:resound_sword',
    'more_avaritia:compressed_infinity_ingot',

    // Avaritia Expand
    'avaritia_expand:crystal_helmet',
    'avaritia_expand:crystal_chestplate',
    'avaritia_expand:crystal_leggings',
    'avaritia_expand:crystal_boots',
    'avaritia_expand:blaze_helmet',
    'avaritia_expand:blaze_chestplate',
    'avaritia_expand:blaze_leggings',
    'avaritia_expand:blaze_boots',

    // Avaritia Integration：宇宙最强之刃 + 无限存储（无尽级）
    'avaritia_integration:stredgeuniverse',
    'avaritia_integration:infinity_me_storage_cell',
    'avaritia_integration:infinity_me_storage_cell_big',
    'avaritia_integration:infinity_me_storage_component',
    'avaritia_integration:infinity_storage_part',
  ]

  // ---- 2. 只删「成品」为输出的配方，不动以它们为材料的配方 ----
  //      （避免下游物品（如奇点兑换）因为原料被删而变成不可得）
  const outputOnly = [
    'avaritia:infinity_ingot',
    'avaritia:infinity_catalyst',
    'avaritia:eternal_singularity',
    'avaritia:infinity_upgrade',
  ]

  for (const id of bannedInputs) event.remove({ input: id })
  for (const id of outputOnly) event.remove({ output: id })
})
