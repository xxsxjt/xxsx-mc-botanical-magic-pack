// ============================================================
// 终局链条 — 把「Boss 掉落物」变成后期唯一的主线材料
// 目标：
//   前期互换保持不变（丰富获取渠道，不被单一资源卡住）
//   后期每个体系都必须吃别的体系的 Boss 掉落物，不能各玩各的
// 单向主链：
//   Boss 掉落物 → 各体系「媒介」kubejs:*_attunement → kubejs:void_essence（虚空精粹）
//   → kubejs:void_ingot（虚空合金）→ kubejs:star_core（星核）
//   → kubejs:final_witness（见证）+ avaritia:eternal_singularity（终局奇点）
//   终局装备由终局奇点 + 星核 + 各体系灵魂锻造（后续追加）
// priority: 43（先于 disable_infinity_gear=45 与 custom_recipes=50 执行）
// ============================================================

const VOID = 'kubejs:void_essence'
const INGOT = 'kubejs:void_ingot'

ServerEvents.recipes(event => {

  // ---------- 0. 材料通道（不依赖任何单个体系，保证不卡进度） ----------
  // 灾变 Boss 的无限炎铸锭 → 下界合金锭（每体系 Boss 掉落的通用兑换）
  event.shapeless('minecraft:netherite_ingot', ['cataclysm:ignitium_ingot']).id('kubejs:endgame/ignitium_to_netherite')
  // 暮色森林炽铁 → 烈焰粉
  event.shapeless('2x minecraft:blaze_powder', ['twilightforest:fiery_blood']).id('kubejs:endgame/fiery_blood_to_blaze')
  // 灾变虚空碎片 → 虚空之眼（虚空系材料的基础兑换）
  event.shapeless('cataclysm:void_eye', ['cataclysm:void_shard', 'minecraft:ender_eye']).id('kubejs:endgame/void_shard_to_eye')

  // ---------- 1. 各体系「媒介」：必须用该体系的 Boss 掉落物 ----------

  // Botania：世界树之心（世界树附属的 Boss）→ 织法石
  event.custom({
    type: 'botania:mana_infusion',
    input: { item: 'botanicpledge:yggdrasil_heart' },
    output: { item: 'kubejs:botania_attunement' },
    mana: 1000000
  }).id('kubejs:endgame/botania_attunement')

  // Create：鼓风点燃（灾变·烈焰魔的无限炎铸 → 机械动力，热源门槛）
  event.custom({
    type: 'create:mixing',
    heatRequirement: 'superheated',
    ingredients: [
      { item: 'cataclysm:ignitium_ingot' },
      { item: 'create:crushed_raw_zinc' },
      { tag: 'forge:dusts/redstone' }
    ],
    results: [{ item: 'kubejs:create_attunement', count: 1 }]
  }).id('kubejs:endgame/create_attunement')

  // Ars：源质灌铸（暮色巫妖权杖，Ars 自己的源质炉）
  event.custom({
    type: 'ars_nouveau:imbuement',
    input: { item: 'twilightforest:twilight_scepter' },
    output: { item: 'kubejs:ars_attunement' },
    count: 1,
    source: 5000
  }).id('kubejs:endgame/ars_attunement')

  // M&A：织法（M&A 专属的奥术微核，来自 M&A 维度）
  event.custom({
    type: 'mna:manaweaving',
    patterns: ['arcane', 'lesser'],
    output: { item: 'kubejs:mna_attunement' },
    tier: 2
  }).id('kubejs:endgame/mna_attunement')
  // 因为织法配方需要玩家解锁图案，额外给一条可以用现有材料的成形配方（不做拦路）
  event.shaped('kubejs:mna_attunement', [' M ', 'MA M', ' M '], {
    M: 'mna:mote_arcane',
    A: 'mna:arcane_compound'
  }).id('kubejs:endgame/mna_attunement_craft')

  // Enigmatic：七咒之戒 + 盖亚锭（原版 Gloom 体系）
  event.shaped('kubejs:enigmatic_attunement', ['CGC', 'GNG', 'CGC'], {
    C: 'enigmaticlegacy:cursed_ring',
    G: 'botania:gaia_ingot',
    N: 'enigmaticlegacy:evil_ingot'
  }).id('kubejs:endgame/enigmatic_attunement')

  // Goety：黑暗祭坛（末影守望者的虚空碎片作为祭品，灵魂代价）
  event.custom({
    type: 'goety:ritual',
    ritual_type: 'goety:craft',
    activation_item: { item: 'goety:dark_altar' },
    craftType: 'forge',
    soulCost: 10000,
    duration: 600,
    ingredients: [
      { item: 'goety:void_shard' },
      { item: 'goety:void_shard' },
      { item: 'goety:void_shard' },
      { item: 'goety:void_shard' }
    ],
    result: { item: 'kubejs:goety_attunement' }
  }).id('kubejs:endgame/goety_attunement')

  // FareGo：冰火传说之龙（魂石体系）—— 魂石灌注
  event.shaped('kubejs:fargo_soul_attunement', [' D ', 'SES', ' D '], {
    D: 'mine_fargo:fire_dragon_blood_soul_stone',
    S: 'mine_fargo:empty_soul_stone',
    E: 'enigmaticlegacy:cosmic_heart'
  }).id('kubejs:endgame/fargo_soul_attunement')

  // Tetra：击打提取（data/tetra/actions/kubejs_void_extraction.json）
  //   用带幸运附魔的锤子击打 空白魂石 → 获得 kubejs:void_essence


  // ---------- 2. 虚空精粹：两条互相独立的汇合路线（任一体系卡住都不至于死锁） ----------
  event.shaped(VOID, [' A ', 'BXC', ' D '], {
    A: 'kubejs:botania_attunement',
    B: 'kubejs:create_attunement',
    C: 'kubejs:ars_attunement',
    D: 'kubejs:mna_attunement',
    X: 'enigmaticlegacy:cosmic_heart'
  }).id('kubejs:endgame/void_essence_arcane')

  event.shaped(VOID, [' A ', 'BXC', ' D '], {
    A: 'kubejs:enigmatic_attunement',
    B: 'kubejs:goety_attunement',
    C: 'kubejs:fargo_soul_attunement',
    D: 'kubejs:botania_attunement',
    X: 'enigmaticlegacy:cosmic_heart'
  }).id('kubejs:endgame/void_essence_ritual')


  // ---------- 3. 虚空合金：后期万能材料 ----------
  event.shaped('2x ' + INGOT, [' V ', 'NNN', ' V '], {
    V: VOID, N: 'minecraft:netherite_ingot'
  }).id('kubejs:endgame/void_ingot_from_netherite')

  event.shaped('2x ' + INGOT, [' V ', 'GGG', ' V '], {
    V: VOID, G: 'botania:gaia_ingot'
  }).id('kubejs:endgame/void_ingot_from_gaia')

  event.shaped('2x ' + INGOT, [' V ', 'CCC', ' V '], {
    V: VOID, C: 'cataclysm:cursium_ingot'
  }).id('kubejs:endgame/void_ingot_from_cursium')


  // ---------- 4. 星核：终局装备的骨架 ----------
  event.shaped('kubejs:star_core', [' M ', 'VIV', ' M '], {
    M: 'avaritia:crystal_matrix_ingot',
    V: VOID,
    I: INGOT
  }).id('kubejs:endgame/star_core')


  // ---------- 5. 见证：终局钥匙（取代原「寰宇支配之剑」的位置） ----------
  event.shaped('kubejs:final_witness', ['TST', 'SSS', 'TST'], {
    T: 'kubejs:star_core',
    S: VOID
  }).id('kubejs:endgame/final_witness')


  // ---------- 6. 终局奇点：无尽线在这里汇合，但不再通向无敌 ----------
  event.shaped('avaritia:eternal_singularity', ['WTW', 'TWT', 'WTW'], {
    W: 'kubejs:final_witness',
    T: 'kubejs:star_core'
  }).id('kubejs:endgame/eternal_singularity_from_void')
})
