// priority: 90
// 植物魔艺 — 自定义物品注册

StartupEvents.registry('item', event => {
    // 万法之戒
    event.create('mana_catalyst_ring')
        .displayName('§d万法之戒')
        .glow(true).rarity('epic')
        .tooltip('§e装备戒指栏位 §7| §aBotania魔力 ↔ Iron/Ars法力双向转换')
        .maxStackSize(1)

    // 维度织物
    event.create('dimension_warp_stone')
        .displayName('§b维度织物')
        .glow(true).rarity('epic')
        .tooltip('§e右键使用 §7| §a主世界↔额外主世界传送')
        .tooltip('§7空岛内容只做到这了，更多内容请自行探索吧')
        .maxStackSize(1)

    // Boss战书
    event.create('boss_compendium')
        .displayName('§4Boss战书')
        .glow(true).rarity('epic')
        .tooltip('§e右键查看 §7| §aBoss击杀进度')

    // 增加饰品栏位
    const slots = [
        { id: 'head_slot_token', name: '增加头饰栏位' },
        { id: 'necklace_slot_token', name: '增加项链栏位' },
        { id: 'ring_slot_token', name: '增加戒指栏位' },
        { id: 'belt_slot_token', name: '增加腰带栏位' },
        { id: 'charm_slot_token', name: '增加护符栏位' },
        { id: 'body_slot_token', name: '增加身体栏位' },
        { id: 'back_slot_token', name: '增加背部栏位' },
        { id: 'hands_slot_token', name: '增加手部栏位' },
        { id: 'feet_slot_token', name: '增加脚部栏位' },
    ]
    slots.forEach(slot => {
        event.create(slot.id)
            .displayName(slot.name)
            .glow(true).rarity('epic')
            .tooltip('§e右键使用 §7| §a永久增加一个额外饰品栏位')
    })

    // 进阶增加饰品栏位
    event.create('advanced_slot_token')
        .displayName('§6进阶增加饰品栏位')
        .glow(true).rarity('epic')
        .tooltip('§e右键使用 §7| §a所有饰品栏各 +1')
        .tooltip('§c无上限')

    // 灵火粉
    event.create('soul_fire_powder')
        .texture('kubejs:item/soul_fire_powder')
        .displayName('§6灵火粉')
        .tooltip('§e丢入水中 + 紫水晶 §7| §a生成黑莲花')
        .tooltip('§e丢入魔力池 §7| §a消耗100魔力 → 线')
        .maxStackSize(64)

    // 简易武装箱
    event.create('basic_armed_box')
        .texture('kubejs:item/basic_armed_box')
        .displayName('§a简易武装箱')
        .tooltip('§7用于合成，无法使用')
        .maxStackSize(16)

    // 进阶武装箱
    event.create('advanced_armed_box')
        .texture('kubejs:item/advanced_armed_box')
        .displayName('§9进阶武装箱')
        .tooltip('§7用于合成，无法使用')
        .maxStackSize(16)

    // 特权武装箱
    event.create('privileged_armed_box')
        .texture('kubejs:item/privileged_armed_box')
        .displayName('§d特权武装箱')
        .tooltip('§e携带 §63级以上锤子 §e去 §bTetra加工台 §e开箱')
        .tooltip('§7内含追焰遗物随机物品')
        .maxStackSize(1)

    // ============================================================
    // 终局链条 — 虚空系材料（配方见 server_scripts/endgame_void_chain.js）
    // ============================================================
    event.create('void_essence')
        .texture('kubejs:item/void_essence')
        .displayName('§5虚空精粹')
        .tooltip('§7把各个体系的终局材料汇合而成')
        .tooltip('§7后期绝大多数终局配方的通用底料')
        .glow(true).rarity('epic')

    event.create('void_ingot')
        .texture('kubejs:item/void_ingot')
        .displayName('§5虚空合金')
        .tooltip('§7以虚空精粹为核心熔铸的合金')
        .glow(true).rarity('epic')

    event.create('star_core')
        .texture('kubejs:item/star_core')
        .displayName('§6星核')
        .tooltip('§7终局装备的骨架')
        .glow(true).rarity('epic')

    event.create('final_witness')
        .texture('kubejs:item/final_witness')
        .displayName('§4终焉之证')
        .tooltip('§7走过所有体系的证明')
        .tooltip('§7终局奇点所需')
        .glow(true).rarity('epic')

    // 各体系的「媒介」：同名显示，靠颜色区分体系
    const attunements = [
        { id: 'botania_attunement', name: '§a自然之印', tip: '§2植物魔法体系' },
        { id: 'create_attunement', name: '§8机巧之印', tip: '§8机械动力体系' },
        { id: 'ars_attunement', name: '§d奥术之印', tip: '§5新生魔艺体系' },
        { id: 'mna_attunement', name: '§b秘法之印', tip: '§3魔法艺术体系' },
        { id: 'enigmatic_attunement', name: '§e遗秘之印', tip: '§6神秘遗物体系' },
        { id: 'goety_attunement', name: '§4亡灵之印', tip: '§c诡厄巫法体系' },
        { id: 'fargo_soul_attunement', name: '§6灵魂之印', tip: '§e魂石体系' },
    ]
    attunements.forEach(a => {
        event.create(a.id)
            .texture('kubejs:item/' + a.id)
            .displayName(a.name)
            .tooltip(a.tip + ' §7的终局媒介')
            .tooltip('§7汇聚 4 个体系的媒介 + 寰宇之心 → 虚空精粹')
            .glow(true).rarity('epic')
    })
})
