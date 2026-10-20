// 植物魔艺 - 维度织物 + Boss战书 + 万法之戒
// priority: 40

// ============================================================
// 合成表
// ============================================================
ServerEvents.recipes(event => {
    // 万法之戒
    event.shaped('kubejs:mana_catalyst_ring', ['ABA','CDC','AEA'], {
        A: 'botania:terrasteel_ingot', B: 'irons_spellbooks:arcane_essence',
        C: 'ars_nouveau:source_gem', D: 'minecraft:nether_star',
        E: 'goety:void_shard'
    }).id('kubejs:mana_catalyst_ring_craft')

    // 维度织物
    event.shaped('kubejs:dimension_warp_stone', [
        'ABC','DEF','GHI'
    ], {
        A: 'botania:terrasteel_ingot',
        B: 'create:refined_radiance',
        C: 'botania:gaia_ingot',
        D: 'tconstruct:manyullyn_ingot',
        E: 'irons_spellbooks:arcane_essence',
        F: 'ars_nouveau:source_gem_block',
        G: 'apotheosis:mythic_material',
        H: 'create:shadow_steel',
        I: 'botania:dragonstone'
    }).id('kubejs:dimension_warp_stone_craft')

    // Boss战书
    event.shaped('kubejs:boss_compendium', ['ABA','CDC','AEA'], {
        A: 'minecraft:writable_book', B: 'cataclysm:void_core',
        C: 'twilightforest:naga_scale', D: 'botania:life_essence',
        E: 'irons_spellbooks:arcane_essence'
    }).id('kubejs:boss_compendium_craft')

    // 跨模组资源兑换
    event.shapeless('3x ars_nouveau:source_gem', ['botania:mana_diamond']).id('kubejs:mana_dia_to_source')
    event.shapeless('cataclysm:void_core', ['twilightforest:fiery_blood']).id('kubejs:fiery_to_void')
    event.shapeless('botania:mana_pearl', ['irons_spellbooks:arcane_essence', 'irons_spellbooks:arcane_essence']).id('kubejs:arcane_to_mana_pearl')
    event.shapeless('occultism:spirit_attuned_gem', ['goety:void_shard', 'goety:void_shard', 'goety:void_shard', 'goety:void_shard']).id('kubejs:soul_to_spirit')

    // 下界石英 + 魔法石英 → 赛特斯石英×4（丢入水中）
    event.custom({
        type: 'ae2:transform',
        circumstance: { type: 'fluid', tag: 'minecraft:water' },
        ingredients: [
            { item: 'minecraft:quartz' },
            { item: 'botania:quartz_mana' }
        ],
        result: { item: 'ae2:certus_quartz_crystal', count: 4 }
    }).id('kubejs:quartz_to_certus')

    // 赛特斯石英 → 4个紫水晶碎片（切石机）
    event.stonecutting('4x minecraft:amethyst_shard', 'ae2:certus_quartz_crystal').id('kubejs:certus_to_amethyst')

    // 线 + 赛特斯石英 → 羽毛（等量）
    event.shaped('4x minecraft:feather', ['S S',' C ','S S'], {
        S: 'minecraft:string',
        C: 'ae2:certus_quartz_crystal'
    }).id('kubejs:string_to_feather')

    // 任意原木 → 蘑菇（魔力池灌注，100魔力）
    event.custom({
        type: 'botania:mana_infusion',
        input: { tag: 'minecraft:logs' },
        output: { item: 'minecraft:brown_mushroom', count: 1 },
        mana: 100
    }).id('kubejs:log_to_mushroom')

    // 魔力石英+灵魂图腾 → 灵魂水晶（乱序）
    event.shapeless('enigmaticlegacy:soul_crystal', ['botania:quartz_mana', 'goety:totem_of_souls']).id('kubejs:soul_crystal_quartz')

    // 魔力钢锭+灵魂图腾 → 灵魂水晶（乱序）
    event.shapeless('enigmaticlegacy:soul_crystal', ['botania:manasteel_ingot', 'goety:totem_of_souls']).id('kubejs:soul_crystal_manasteel')

    // 纸 → MNA法术卷轴（魔力池灌注，2000魔力）
    event.custom({
        type: 'botania:mana_infusion',
        input: { item: 'minecraft:paper' },
        output: { item: 'mna:torn_journal_page', count: 1 },
        mana: 2000
    }).id('kubejs:paper_to_journal_page')

    // 魔力钻石×2+魔力珍珠×2+魔法石英×2+紫水晶×2 围一圈，中间放任意树苗 → 恼人至高木树苗
    event.shaped('ars_nouveau:purple_archwood_sapling', ['DPQ','ASD','QPA'], {
        D: 'botania:mana_diamond',
        P: 'botania:mana_pearl',
        Q: 'botania:quartz_mana',
        A: 'minecraft:amethyst_shard',
        S: '#minecraft:saplings'
    }).id('kubejs:archwood_sapling')

    // 觉醒绿宝石+魔力钻石，中间放纸 → 4个典籍残页
    event.shaped('4x ars_additions:codex_entry', ['ABA','BPB','ABA'], {
        A: 'goety:magic_emerald',
        B: 'botania:mana_diamond',
        P: 'minecraft:paper'
    }).id('kubejs:codex_entry')

    // 泰拉锭+源质锭，中间放纸 → 4个失落典籍残页
    event.shaped('4x ars_additions:lost_codex_entry', ['ABA','BPB','ABA'], {
        A: 'botania:terrasteel_ingot',
        B: 'botania:elementium_ingot',
        P: 'minecraft:paper'
    }).id('kubejs:lost_codex_entry')

    // 盖亚之魂+世界树碎片，中间放纸 → 4个远古典籍残页
    event.shaped('4x ars_additions:ancient_codex_entry', ['ABA','BPB','ABA'], {
        A: 'botania:life_essence',
        B: 'botania:dreamwood_twig',
        P: 'minecraft:paper'
    }).id('kubejs:ancient_codex_entry')

    // 粗铁+粗金+魔源宝石 → 8个温特姆矿石
    event.shapeless('8x mna:vinteum_ore', ['minecraft:raw_iron', 'minecraft:raw_gold', 'ars_nouveau:source_gem']).id('kubejs:vinteum_ore')

    // 魔源宝石+8个石头 → 16个魔源石
    event.shaped('16x ars_nouveau:sourcestone', ['SSS','SGS','SSS'], {
        S: 'minecraft:stone',
        G: 'ars_nouveau:source_gem'
    }).id('kubejs:sourcestone')

    // 魔力粉 → 奥术源质（消耗500魔力）
    event.custom({ type: 'botania:mana_infusion', input: { item: 'botania:mana_powder' }, output: { item: 'irons_spellbooks:arcane_essence', count: 1 }, mana: 500 }).id('kubejs:mana_powder_to_arcane')

    // 铁魔法墨水品级升级（魔力池灌注）
    // 奥术源质 → 普通墨水（2000魔力）
    event.custom({ type: 'botania:mana_infusion', input: { item: 'irons_spellbooks:arcane_essence' }, output: { item: 'irons_spellbooks:common_ink', count: 1 }, mana: 2000 }).id('kubejs:arcane_to_common_ink')
    // 普通墨水 → 卓越墨水（4000魔力）
    event.custom({ type: 'botania:mana_infusion', input: { item: 'irons_spellbooks:common_ink' }, output: { item: 'irons_spellbooks:uncommon_ink', count: 1 }, mana: 4000 }).id('kubejs:common_to_uncommon_ink')
    // 卓越墨水 → 稀有墨水（6000魔力）
    event.custom({ type: 'botania:mana_infusion', input: { item: 'irons_spellbooks:uncommon_ink' }, output: { item: 'irons_spellbooks:rare_ink', count: 1 }, mana: 6000 }).id('kubejs:uncommon_to_rare_ink')
    // 稀有墨水 → 史诗墨水（12000魔力）
    event.custom({ type: 'botania:mana_infusion', input: { item: 'irons_spellbooks:rare_ink' }, output: { item: 'irons_spellbooks:epic_ink', count: 1 }, mana: 12000 }).id('kubejs:rare_to_epic_ink')
    // 史诗墨水 → 传说墨水（20000魔力）
    event.custom({ type: 'botania:mana_infusion', input: { item: 'irons_spellbooks:epic_ink' }, output: { item: 'irons_spellbooks:legendary_ink', count: 1 }, mana: 20000 }).id('kubejs:epic_to_legendary_ink')
})

ServerEvents.recipes(event => {
    // 金锭 + 萤石粉 + 任意树叶 → 4黄金叶（改为无序合成，因为ae2:transform不支持tag原料）
    event.shapeless('4x naturesaura:gold_leaf', [
        'minecraft:gold_ingot',
        'minecraft:glowstone_dust',
        '#minecraft:leaves'
    ]).id('kubejs:gold_leaf_water')

    // 9箭 → 灵火粉
    event.shaped('kubejs:soul_fire_powder', ['AAA','AAA','AAA'], {
        A: 'minecraft:arrow'
    }).id('kubejs:soul_fire_powder_arrow')

    // 9火药 → 灵火粉
    event.shaped('kubejs:soul_fire_powder', ['AAA','AAA','AAA'], {
        A: 'minecraft:gunpowder'
    }).id('kubejs:soul_fire_powder_gunpowder')

    // 灵火粉 + 紫水晶 → 黑莲花（丢入水中）
    event.custom({
        type: 'ae2:transform',
        circumstance: { type: 'fluid', tag: 'minecraft:water' },
        ingredients: [
            { item: 'kubejs:soul_fire_powder' },
            { item: 'minecraft:amethyst_shard' }
        ],
        result: { item: 'botania:black_lotus', count: 1 }
    }).id('kubejs:black_lotus_water')

    // 灵火粉 → 线（魔力池灌注，100魔力）
    event.custom({
        type: 'botania:mana_infusion',
        input: { item: 'kubejs:soul_fire_powder' },
        output: { item: 'minecraft:string', count: 1 },
        mana: 100
    }).id('kubejs:soul_fire_powder_to_string')
})

// ============================================================
// 万法之戒 — Curios 戒指栏装备后每秒 +5 法力
// ============================================================
PlayerEvents.tick(event => {
    const { player, level } = event
    if (level.clientSide || player.age % 20 !== 0) return

    // 检测 Curios 戒指栏
    let hasRing = false
    try {
        const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')
        const opt = CuriosApi.getCuriosInventory(player)
        if (opt.isPresent()) {
            const curios = opt.get()
            const ringOpt = curios.getStacksHandler('ring')
            if (ringOpt.isPresent()) {
                const slots = ringOpt.get().getStacks()
                for (let i = 0; i < slots.getSlots(); i++) {
                    const stack = slots.getStackInSlot(i)
                    if (!stack.isEmpty() && String(stack.getId()) === 'kubejs:mana_catalyst_ring') {
                        hasRing = true
                        break
                    }
                }
            }
        }
    } catch (e) {
        return
    }

    if (!hasRing) return

    // Iron's Spellbooks +5法力/秒
    try {
        const ManaData = Java.loadClass('io.redspace.ironsspellbooks.api.mana.ManaData')
        const md = ManaData.getPlayerManaData(player)
        if (md) md.addMana(5)
    } catch (e) {}
})

// ============================================================
// 维度织物 — 使用命令传送，避免 getLevel() 返回 null
// ============================================================
ItemEvents.rightClicked('kubejs:dimension_warp_stone', event => {
    const player = event.player
    if (!player || player.isFake()) return

    const currentDim = String(player.level.dimension)
    const playerName = player.getName().getString()
    const x = Math.floor(player.x)
    const y = Math.floor(player.y)
    const z = Math.floor(player.z)

    if (currentDim === 'minecraft:overworld') {
        // 前往额外主世界
        player.server.runCommandSilent(
            'execute in kubejs:advanced_overworld run tp ' + playerName + ' ' + x + ' ' + y + ' ' + z
        )
        player.tell(Text.gold('§6✦ 维度织物 §r§e穿梭至额外主世界'))
    } else if (currentDim === 'kubejs:advanced_overworld') {
        // 返回主世界
        player.server.runCommandSilent(
            'execute in minecraft:overworld run tp ' + playerName + ' ' + x + ' ' + y + ' ' + z
        )
        player.tell(Text.green('§a✦ 维度织物 §r§a返回主世界'))
    } else {
        player.tell(Text.gray('§7维度织物只能在主世界和额外主世界之间传送'))
    }
})

// ============================================================
// Boss战书 — 右键查看击杀进度
// ============================================================
ItemEvents.rightClicked('kubejs:boss_compendium', event => {
    const { player, level } = event
    if (level.clientSide) return

    const adv = player.advancements
    const bosses = [
        { name: '§a末影龙', adv: 'minecraft:end/kill_dragon' },
        { name: '§4凋灵', adv: 'minecraft:nether/summon_wither' },
        { name: '§2盖亚守护者 I', adv: 'botania:challenge/gaia_guardian' },
        { name: '§2盖亚守护者 II', adv: 'botania:challenge/gaia_guardian_hardmode' },
        { name: '§d娜迦', adv: 'twilightforest:progress/naga' },
        { name: '§d巫妖', adv: 'twilightforest:progress/lich' },
        { name: '§d九头蛇', adv: 'twilightforest:progress/hydra' },
        { name: '§d暮色恶魂', adv: 'twilightforest:progress/ur_ghast' },
        { name: '§d雪怪首领', adv: 'twilightforest:progress/knight_phantom' },
        { name: '§d冰雪女王', adv: 'twilightforest:progress/snow_queen' },
        { name: '§d巨人', adv: 'twilightforest:progress/giant' },
    ]

    player.tell('§4§l═══ Boss击杀进度 ═══')
    let killed = 0
    bosses.forEach(b => {
        try {
            const done = adv.getOrStartProgress(b.adv).done
            player.tell('  ' + (done ? '§a✔' : '§7✘') + ' ' + b.name)
            if (done) killed++
        } catch (e) {
            player.tell('  §7✘ ' + b.name)
        }
    })
    player.tell('§4§l═══ §e' + killed + '§7/§e' + bosses.length + ' §4§l═══')
})
