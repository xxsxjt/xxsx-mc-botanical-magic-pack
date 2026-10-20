// ============================================================
// 植物神匠 - 自定义配方：Goety祭坛 + Botania符文祭坛 + 魔力池
// priority: 50
// ============================================================

// ============================================================
// 1. 256k存储元件 — Goety祭坛，锻造仪式
//    一圈赛特斯石英（8个），中间世界树水晶
//    每秒消耗10灵魂能量，持续5秒（50总）
// ============================================================
ServerEvents.recipes(event => {
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:craft',
        activation_item: { item: 'botanicpledge:yggdrasil_pylon' },
        craftType: 'forge',
        soulCost: 10,
        duration: 5,
        ingredients: [
            { item: 'ae2:certus_quartz_crystal' },
            { item: 'ae2:certus_quartz_crystal' },
            { item: 'ae2:certus_quartz_crystal' },
            { item: 'ae2:certus_quartz_crystal' },
            { item: 'ae2:certus_quartz_crystal' },
            { item: 'ae2:certus_quartz_crystal' },
            { item: 'ae2:certus_quartz_crystal' },
            { item: 'ae2:certus_quartz_crystal' }
        ],
        result: { item: 'ae2:cell_component_256k' }
    }).id('kubejs:256k_component_goety_altar')
})

// ============================================================
// 2. 奥术残骸×10 — Goety祭坛，魔法仪式
//    5个铁魔法奥术源质 + 4个create焦黑熔渣，中间TNT
//    每秒消耗10灵魂能量，持续10秒（100总）
// ============================================================
ServerEvents.recipes(event => {
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:craft',
        activation_item: { item: 'minecraft:tnt' },
        craftType: 'magic',
        soulCost: 10,
        duration: 10,
        ingredients: [
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'create:scorchia' },
            { item: 'create:scorchia' },
            { item: 'create:scorchia' },
            { item: 'create:scorchia' }
        ],
        result: { item: 'irons_spellbooks:arcane_debris', count: 10 }
    }).id('kubejs:arcane_debris_goety_altar')
})

// ============================================================
// 3. 空白符文×8 — Botania符文祭坛
//    5个铁魔法奥术源质，中间忏悔石
//    消耗5000魔力
// ============================================================
ServerEvents.recipes(event => {
    event.custom({
        type: 'botania:runic_altar',
        output: { item: 'irons_spellbooks:blank_rune', count: 8 },
        mana: 5000,
        ingredients: [
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'irons_spellbooks:arcane_essence' },
            { item: 'irons_spellbooks:shriving_stone' }
        ]
    }).id('kubejs:blank_rune_runic_altar')
})

// ============================================================
// 4. 天空石（陨石） — 合成表
//    上下左右：焦黑熔渣，4角：任意石头，中间：魔法石英
// ============================================================
ServerEvents.recipes(event => {
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: ['SsS', 'sTs', 'SsS'],
        key: {
            S: { item: 'create:scorchia' },
            s: { tag: 'forge:stone' },
            T: { item: 'botania:quartz_mana' }
        },
        result: { item: 'ae2:sky_stone_block', count: 4 }
    }).id('kubejs:sky_stone_craft')
})

// ============================================================
// 5. 诅咒金属 → 远古金属（魔力池灌注）
//    锭：1000魔力，块：9000魔力
// ============================================================
ServerEvents.recipes(event => {
    // 诅咒金属锭 → 远古金属锭（1000魔力）
    event.custom({
        type: 'botania:mana_infusion',
        input: { item: 'goety:cursed_ingot' },
        output: { item: 'cataclysm:ancient_metal_ingot', count: 1 },
        mana: 1000
    }).id('kubejs:cursed_to_ancient_ingot')

    // 诅咒金属块 → 远古金属块（9000魔力）
    event.custom({
        type: 'botania:mana_infusion',
        input: { item: 'goety:cursed_metal_block' },
        output: { item: 'cataclysm:ancient_metal_block', count: 1 },
        mana: 9000
    }).id('kubejs:cursed_to_ancient_block')
})

// ============================================================
// 6. 蘑菇士兵召唤 — Goety祭坛，安息日仪式
//    基座放任意蘑菇，祭坛中心放任意蘑菇
//    每秒消耗10灵魂能量，持续1秒（10总）
//    召唤1个MNA魔法艺术蘑菇士兵
// ============================================================
ServerEvents.recipes(event => {
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:summon',
        activation_item: { tag: 'forge:mushrooms' },
        craftType: 'sabbath',
        entity_to_summon: 'mna:mushroom_soldier',
        soulCost: 10,
        duration: 1,
        ingredients: [
            { tag: 'forge:mushrooms' },
            { tag: 'forge:mushrooms' }
        ],
        result: { item: 'goety:jei_dummy/none' }
    }).id('kubejs:summon_mushroom_soldier')
})

// ============================================================
// 7. 秘鸣宝石 — ae2水中转化
//    魔力尘 + 魔力石英 丢水里 → 5个秘鸣宝石
// ============================================================
ServerEvents.recipes(event => {
    event.custom({
        type: 'ae2:transform',
        ingredients: [
            { item: 'botania:mana_powder' },
            { item: 'botania:quartz_mana' }
        ],
        circumstance: { type: 'fluid', tag: 'minecraft:water' },
        result: { item: 'mna:chimerite_gem', count: 5 }
    }).id('kubejs:chimerite_gem_water')
})

// ============================================================
// Tetra物品多样化合成
// ============================================================

// --- 晶簇 ---
// 多种获取方式：合成台、ae2水中转化

// 8. 晶簇 — 合成台
//    紫水晶碎片×4 + 石英块×4 + 钻石
ServerEvents.recipes(event => {
    event.shaped('tetra:geode', [
        'AQA',
        'QDQ',
        'AQA'
    ], {
        A: 'minecraft:amethyst_shard',
        Q: 'minecraft:quartz_block',
        D: 'minecraft:diamond'
    }).id('kubejs:geode_craft')
})

// 单碎片魔力池路线已移除：它会跳过合成台/AE2路线的阶段成本。

// 9. 晶簇 — ae2水中转化
//    紫水晶碎片×4 + 石英 丢水里 → 1个晶簇
ServerEvents.recipes(event => {
    event.custom({
        type: 'ae2:transform',
        ingredients: [
            { item: 'minecraft:amethyst_shard' },
            { item: 'minecraft:amethyst_shard' },
            { item: 'minecraft:amethyst_shard' },
            { item: 'minecraft:amethyst_shard' },
            { item: 'minecraft:quartz' }
        ],
        circumstance: { type: 'fluid', tag: 'minecraft:water' },
        result: { item: 'tetra:geode', count: 1 }
    }).id('kubejs:geode_water')
})

// --- 热电池 ---
// 多种获取方式：合成台、自然灵气森林仪式、ae2水中转化

// 11. 热电池 — 合成台
//    红石×4 + 铁锭×4 + 烈焰粉
ServerEvents.recipes(event => {
    event.shaped('tetra:thermal_cell', [
        'RIR',
        'IBI',
        'RIR'
    ], {
        R: 'minecraft:redstone',
        I: 'minecraft:iron_ingot',
        B: 'minecraft:blaze_powder'
    }).id('kubejs:thermal_cell_craft')
})

// 12. 热电池 — 自然灵气森林仪式
//    红石×4 + 铁锭×3 + 烈焰粉 + 橡树树苗 → 1个
ServerEvents.recipes(event => {
    event.custom({
        type: 'naturesaura:tree_ritual',
        ingredients: [
            { item: 'minecraft:redstone' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:redstone' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:redstone' },
            { item: 'minecraft:blaze_powder' },
            { item: 'minecraft:redstone' },
            { item: 'minecraft:iron_ingot' }
        ],
        sapling: { item: 'minecraft:oak_sapling' },
        output: { item: 'tetra:thermal_cell', count: 1 },
        time: 200
    }).id('kubejs:thermal_cell_naturesaura')
})

// 13. 热电池 — ae2水中转化
//    红石×4 + 铁锭×2 + 烈焰粉丢水里 → 热电池
ServerEvents.recipes(event => {
    event.custom({
        type: 'ae2:transform',
        ingredients: [
            { item: 'minecraft:redstone' },
            { item: 'minecraft:redstone' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:redstone' },
            { item: 'minecraft:redstone' },
            { item: 'minecraft:blaze_powder' }
        ],
        circumstance: { type: 'fluid', tag: 'minecraft:water' },
        result: { item: 'tetra:thermal_cell' }
    }).id('kubejs:thermal_cell_water')
})

// --- 原理图 ---
// 根据章节进度分配不同合成方式：
// 前期简单合成 → 中期Botania/自然灵气 → 后期Goety仪式

// 14. 原理图 — 基础合成（前期）
//    纸×3 + 墨囊 + 金粒
ServerEvents.recipes(event => {
    event.shapeless(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"schematics",intricate:true,material:2,ribbon:"ffd700"}]}}'), [
        'minecraft:paper',
        'minecraft:paper',
        'minecraft:paper',
        'minecraft:ink_sac',
        'minecraft:gold_nugget'
    ]).id('kubejs:schematic_craft')
})

// 15. 原理图 — Botania符文祭坛
//    纸×3 + 魔力钻石，消耗2000魔力
ServerEvents.recipes(event => {
    event.custom({
        type: 'botania:runic_altar',
        output: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"schematics",intricate:true,material:2,ribbon:"ffd700"}]}}', count: 2 },
        mana: 2000,
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'botania:mana_diamond' }
        ]
    }).id('kubejs:schematic_runic')
})

// 16. 原理图 — 自然灵气森林仪式
//    纸×6 + 金粒×2
ServerEvents.recipes(event => {
    event.custom({
        type: 'naturesaura:tree_ritual',
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:gold_nugget' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:gold_nugget' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' }
        ],
        sapling: { item: 'minecraft:oak_sapling' },
        output: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"schematics",intricate:true,material:2,ribbon:"ffd700"}]}}', count: 3 },
        time: 250
    }).id('kubejs:schematic_naturesaura')
})

// 17. 原理图 — Goety锻造仪式
//    纸×4 + 墨囊 + 金粒×2 + 禁忌卷轴；每周期25灵魂，持续约50秒（总计约1250）
ServerEvents.recipes(event => {
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:craft',
        activation_item: { item: 'goety:forbidden_scroll' },
        craftType: 'forge',
        soulCost: 25,
        duration: 50,
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:ink_sac' },
            { item: 'minecraft:gold_nugget' },
            { item: 'minecraft:gold_nugget' }
        ],
        result: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"schematics",intricate:true,material:2,ribbon:"ffd700"}]}}', count: 5 }
    }).id('kubejs:schematic_goety')
})

// 18. 原理图 — ae2水中转化
//    纸×4 + 墨囊 丢水里 → 2个原理图
ServerEvents.recipes(event => {
    event.custom({
        type: 'ae2:transform',
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:ink_sac' }
        ],
        circumstance: { type: 'fluid', tag: 'minecraft:water' },
        result: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"schematics",intricate:true,material:2,ribbon:"ffd700"}]}}', count: 2 }
    }).id('kubejs:schematic_water')
})

// ============================================================
// Tetra卷轴多样化合成（原理图/战锻/专精/效率/镀金）
// ============================================================

// --- 特殊原理图 ---
// 尖端之末、啸刃、坚固护手、飞刀

ServerEvents.recipes(event => {
    // 尖端之末已移除：Tetra 6.9.0 不注册 tetra:single/points_end，避免生成失效卷轴。

    // 啸刃 — 纸 + 铁锭 + 音符盒
    event.shaped(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"sword/howling",schematics:["tetra:sword/howling"],intricate:true,material:2,ribbon:"708090"}]}}'), [
        ' P ',
        'INI',
        ' P '
    ], { P: 'minecraft:paper', I: 'minecraft:iron_ingot', N: 'minecraft:note_block' }).id('kubejs:scroll_howling')

    // 坚固护手 — 纸 + 铁锭 + 盾牌
    event.shaped(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"sword/sturdy_guard",schematics:["tetra:sword/sturdy_guard"],intricate:true,material:2,ribbon:"b22222"}]}}'), [
        ' P ',
        'ISI',
        ' P '
    ], { P: 'minecraft:paper', I: 'minecraft:iron_ingot', S: 'minecraft:shield' }).id('kubejs:scroll_sturdy_guard')

    // 飞刀 — 纸 + 铁锭 + 燧石
    event.shaped(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"sword/throwing_knife",schematics:["tetra:sword/throwing_knife"],intricate:true,material:2,ribbon:"c0c0c0"}]}}'), [
        ' P ',
        'IFI',
        ' P '
    ], { P: 'minecraft:paper', I: 'minecraft:iron_ingot', F: 'minecraft:flint' }).id('kubejs:scroll_throwing_knife')
})

// --- 战锻卷轴（Tools of War）---
// 分配到不同mod体系：Botania符文祭坛、Goety锻造仪式、自然灵气森林仪式

ServerEvents.recipes(event => {
    // 战斧（Ch.1）— Botania符文祭坛
    event.custom({
        type: 'botania:runic_altar',
        output: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"warforge/axe",schematics:["tetra:warforge/axe"],intricate:true,material:2,ribbon:"8b4513"}]}}', count: 1 },
        mana: 3000,
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_axe' },
            { item: 'minecraft:paper' },
            { item: 'botania:mana_diamond' }
        ]
    }).id('kubejs:scroll_warforge_axe')

    // 战锤（Ch.2）— Goety锻造仪式；每周期30灵魂，持续约60秒（总计约1800）
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:craft',
        activation_item: { item: 'minecraft:iron_block' },
        craftType: 'forge',
        soulCost: 30,
        duration: 60,
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:iron_ingot' }
        ],
        result: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"warforge/hammer",schematics:["tetra:warforge/hammer"],intricate:true,material:2,ribbon:"708090"}]}}' }
    }).id('kubejs:scroll_warforge_hammer')

    // 战镐（Ch.3）— 自然灵气森林仪式
    event.custom({
        type: 'naturesaura:tree_ritual',
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_pickaxe' },
            { item: 'minecraft:paper' },
            { item: 'naturesaura:gold_leaf' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:paper' },
            { item: 'naturesaura:gold_leaf' }
        ],
        sapling: { item: 'minecraft:oak_sapling' },
        output: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"warforge/pickaxe",schematics:["tetra:warforge/pickaxe"],intricate:true,material:2,ribbon:"a9a9a9"}]}}', count: 1 },
        time: 250
    }).id('kubejs:scroll_warforge_pickaxe')

    // 钝端（Ch.4）— 合成台
    event.shaped(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"warforge/butt",schematics:["tetra:warforge/butt"],intricate:true,material:2,ribbon:"deb887"}]}}'), [
        ' P ',
        'IBI',
        ' P '
    ], { P: 'minecraft:paper', I: 'minecraft:iron_ingot', B: 'minecraft:stick' }).id('kubejs:scroll_warforge_butt')

    // 战爪（Ch.5）— Botania符文祭坛
    event.custom({
        type: 'botania:runic_altar',
        output: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"warforge/claw",schematics:["tetra:warforge/claw"],intricate:true,material:2,ribbon:"ff6347"}]}}', count: 1 },
        mana: 3000,
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:paper' },
            { item: 'botania:mana_diamond' }
        ]
    }).id('kubejs:scroll_warforge_claw')

    // 战锄（Ch.6）— Goety锻造仪式；每周期30灵魂，持续约60秒（总计约1800）
    event.custom({
        type: 'goety:ritual',
        ritual_type: 'goety:craft',
        activation_item: { item: 'minecraft:diamond' },
        craftType: 'forge',
        soulCost: 30,
        duration: 60,
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:iron_hoe' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:iron_hoe' }
        ],
        result: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"warforge/hoe",schematics:["tetra:warforge/hoe"],intricate:true,material:2,ribbon:"9acd32"}]}}' }
    }).id('kubejs:scroll_warforge_hoe')

    // 战镰（Ch.7）— 自然灵气森林仪式
    event.custom({
        type: 'naturesaura:tree_ritual',
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:paper' },
            { item: 'naturesaura:gold_leaf' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:paper' },
            { item: 'naturesaura:gold_leaf' }
        ],
        sapling: { item: 'minecraft:dark_oak_sapling' },
        output: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"warforge/sickle",schematics:["tetra:warforge/sickle"],intricate:true,material:2,ribbon:"2e8b57"}]}}', count: 1 },
        time: 250
    }).id('kubejs:scroll_warforge_sickle')

    // 战锛（Ch.8）— ae2水中转化
    event.custom({
        type: 'ae2:transform',
        ingredients: [
            { item: 'minecraft:paper' },
            { item: 'minecraft:iron_axe' },
            { item: 'minecraft:paper' },
            { item: 'minecraft:gold_ingot' }
        ],
        circumstance: { type: 'fluid', tag: 'minecraft:water' },
        result: { item: 'tetra:scroll_rolled', nbt: '{BlockEntityTag:{data:[{key:"warforge/adze",schematics:["tetra:warforge/adze"],intricate:true,material:2,ribbon:"cd853f"}]}}' }
    }).id('kubejs:scroll_warforge_adze')
})

// --- 材料专精卷轴（Treatises）---
// 每种材料对应其原料合成

ServerEvents.recipes(event => {
    var treatises = [
        { key: 'wood_expertise',       effect: 'tetra:treatise/expertise/wood',   mat: 'minecraft:oak_planks',    ribbon: '8b4513' },
        { key: 'stone_expertise',      effect: 'tetra:treatise/expertise/stone',  mat: 'minecraft:cobblestone',   ribbon: '808080' },
        { key: 'bone_expertise',       effect: 'tetra:treatise/expertise/bone',   mat: 'minecraft:bone',          ribbon: 'fffff0' },
        { key: 'metal_expertise',      effect: 'tetra:treatise/expertise/metal',  mat: 'minecraft:iron_ingot',    ribbon: 'c0c0c0' },
        { key: 'fabric_expertise',     effect: 'tetra:treatise/expertise/fabric', mat: 'minecraft:white_wool',    ribbon: 'f5f5dc' },
        { key: 'fibre_expertise',      effect: 'tetra:treatise/expertise/fibre',  mat: 'minecraft:string',        ribbon: 'faf0e6' },
        { key: 'gem_expertise',        effect: 'tetra:treatise/expertise/gem',    mat: 'minecraft:diamond',       ribbon: '00ffff' },
        { key: 'scale_expertise',      effect: 'tetra:treatise/expertise/scale',  mat: 'minecraft:scute',         ribbon: '556b2f' },
        { key: 'skin_expertise',       effect: 'tetra:treatise/expertise/skin',   mat: 'minecraft:leather',       ribbon: 'd2691e' }
    ]

    treatises.forEach(t => {
        event.shaped(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"' + t.key + '",effects:["' + t.effect + '"],intricate:false,material:1,ribbon:"' + t.ribbon + '"}]}}'), [
            ' P ',
            'MGM',
            ' P '
        ], { P: 'minecraft:paper', M: t.mat, G: 'minecraft:gold_nugget' }).id('kubejs:scroll_' + t.key)
    })
})

// --- 效率卷轴（Efficiency Scrolls）---

ServerEvents.recipes(event => {
    // 斧效率 — 纸 + 铁斧 + 金粒
    event.shaped(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"axe_efficiency",effects:["tetra:treatise/efficiency/axe"],intricate:false,material:1,ribbon:"228b22"}]}}'), [
        ' P ',
        'AGA',
        ' P '
    ], { P: 'minecraft:paper', A: 'minecraft:iron_axe', G: 'minecraft:gold_nugget' }).id('kubejs:scroll_axe_efficiency')

    // 切割效率 — 纸 + 剪刀 + 金粒
    event.shaped(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"cut_efficiency",effects:["tetra:treatise/efficiency/cut"],intricate:false,material:1,ribbon:"dc143c"}]}}'), [
        ' P ',
        'SGS',
        ' P '
    ], { P: 'minecraft:paper', S: 'minecraft:shears', G: 'minecraft:gold_nugget' }).id('kubejs:scroll_cut_efficiency')

    // 锤效率 — 纸 + 铁锭 + 铁砧
    event.shaped(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"hammer_efficiency",effects:["tetra:treatise/efficiency/hammer"],intricate:false,material:1,ribbon:"4682b4"}]}}'), [
        ' P ',
        'IAI',
        ' P '
    ], { P: 'minecraft:paper', I: 'minecraft:iron_ingot', A: 'minecraft:anvil' }).id('kubejs:scroll_hammer_efficiency')
})

// --- 镀金卷轴 I ---
// 纸 + 金锭 + 末影珍珠
ServerEvents.recipes(event => {
    event.shaped(Item.of('tetra:scroll_rolled', '{BlockEntityTag:{data:[{key:"hone/gild_1",schematics:["tetra:shared/hone_gild_1"],intricate:true,material:2,ribbon:"c9ae69"}]}}'), [
        ' P ',
        'GEG',
        ' P '
    ], { P: 'minecraft:paper', G: 'minecraft:gold_ingot', E: 'minecraft:ender_pearl' }).id('kubejs:scroll_gild_1')
})

// ============================================================
// 19. 神秘花瓣颜色循环 — 魔力池灌注
//     每种颜色花瓣 → 下一个颜色，消耗100魔力
//     循环顺序: white→orange→magenta→light_blue→yellow→lime
//              →pink→gray→light_gray→cyan→purple→blue
//              →brown→green→red→black→white(回到起点)
// ============================================================
ServerEvents.recipes(event => {
    const petalCycle = [
        ['botania:white_petal',      'botania:orange_petal'],
        ['botania:orange_petal',     'botania:magenta_petal'],
        ['botania:magenta_petal',    'botania:light_blue_petal'],
        ['botania:light_blue_petal', 'botania:yellow_petal'],
        ['botania:yellow_petal',     'botania:lime_petal'],
        ['botania:lime_petal',       'botania:pink_petal'],
        ['botania:pink_petal',       'botania:gray_petal'],
        ['botania:gray_petal',       'botania:light_gray_petal'],
        ['botania:light_gray_petal', 'botania:cyan_petal'],
        ['botania:cyan_petal',       'botania:purple_petal'],
        ['botania:purple_petal',     'botania:blue_petal'],
        ['botania:blue_petal',       'botania:brown_petal'],
        ['botania:brown_petal',      'botania:green_petal'],
        ['botania:green_petal',      'botania:red_petal'],
        ['botania:red_petal',        'botania:black_petal'],
        ['botania:black_petal',      'botania:white_petal']
    ]

    petalCycle.forEach(([inputPetal, outputPetal]) => {
        event.custom({
            type: 'botania:mana_infusion',
            input: { item: inputPetal },
            output: { item: outputPetal, count: 1 },
            mana: 100
        }).id('kubejs:petal_' + inputPetal.split(':')[1] + '_to_' + outputPetal.split(':')[1])
    })
})

// ============================================================
// 20. 跨模组金属转换 — 魔力池灌注
//     相同金属不同模组间互转，消耗100魔力
//     iceandfire ↔ occultism 银锭双向转换
// ============================================================
ServerEvents.recipes(event => {
    // 冰火银锭 → 神秘学银锭
    event.custom({
        type: 'botania:mana_infusion',
        input: { item: 'iceandfire:silver_ingot' },
        output: { item: 'occultism:silver_ingot', count: 1 },
        mana: 100
    }).id('kubejs:silver_iceandfire_to_occultism')

    // 神秘学银锭 → 冰火银锭
    event.custom({
        type: 'botania:mana_infusion',
        input: { item: 'occultism:silver_ingot' },
        output: { item: 'iceandfire:silver_ingot', count: 1 },
        mana: 100
    }).id('kubejs:silver_occultism_to_iceandfire')
})

// ============================================================
// 21. 跨模组黄铜转换 — 魔力池灌注
//     basicinnovations ↔ create 黄铜锭双向转换
// ============================================================
ServerEvents.recipes(event => {
    event.custom({
        type: 'botania:mana_infusion',
        input: { item: 'basicinnovations:brass_ingot' },
        output: { item: 'create:brass_ingot', count: 1 },
        mana: 100
    }).id('kubejs:brass_basic_to_create')

    event.custom({
        type: 'botania:mana_infusion',
        input: { item: 'create:brass_ingot' },
        output: { item: 'basicinnovations:brass_ingot', count: 1 },
        mana: 100
    }).id('kubejs:brass_create_to_basic')
})

// ============================================================
// 23. 武装箱三阶合成
// ============================================================

// 23a. 简易武装箱 — 无尽贪婪终极工作台 5x5
//      魔力铁锭 X 形排列 + 灵火粉中心
ServerEvents.recipes(event => {
    event.custom({
        type: 'avaritia:shaped_table',
        tier: 2,
        key: {
            M: { item: 'botania:manasteel_ingot' },
            P: { item: 'kubejs:soul_fire_powder' }
        },
        pattern: [
            'M   M',
            ' M M ',
            '  P  ',
            ' M M ',
            'M   M'
        ],
        result: { item: 'kubejs:basic_armed_box' }
    }).id('kubejs:basic_armed_box')
})

// 23b. 进阶武装箱 — AE2 水中转化
//      简易武装箱 + 金块 丢入水中
ServerEvents.recipes(event => {
    event.custom({
        type: 'ae2:transform',
        ingredients: [
            { item: 'kubejs:basic_armed_box' },
            { item: 'minecraft:gold_block' }
        ],
        circumstance: { type: 'fluid', tag: 'minecraft:water' },
        result: { item: 'kubejs:advanced_armed_box' }
    }).id('kubejs:advanced_armed_box')
})

// 23d. 任意4个武装箱战利品 → 1个进阶武装箱 (5×5 四角)
ServerEvents.recipes(event => {
    event.custom({
        type: 'avaritia:shaped_table',
        tier: 2,
        key: {
            F: { tag: 'kubejs:armed_box_loot' }
        },
        pattern: [
            'F   F',
            '     ',
            '     ',
            '     ',
            'F   F'
        ],
        result: { item: 'kubejs:advanced_armed_box', count: 1 }
    }).id('kubejs:advanced_armed_box_from_loot')
})

// 23c. 特权武装箱 — 无尽贪婪终极工作台 5x5
//      两圈黑莲花包围进阶武装箱
ServerEvents.recipes(event => {
    event.custom({
        type: 'avaritia:shaped_table',
        tier: 2,
        key: {
            L: { item: 'botania:black_lotus' },
            B: { item: 'kubejs:advanced_armed_box' }
        },
        pattern: [
            'LLLLL',
            'L   L',
            'L B L',
            'L   L',
            'LLLLL'
        ],
        result: { item: 'kubejs:privileged_armed_box' }
    }).id('kubejs:privileged_armed_box')
})
