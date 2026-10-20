// priority: 10
// 植物魔艺 - 增加饰品栏位系统

const SLOT_MAP = {
    'kubejs:head_slot_token': 'head',
    'kubejs:necklace_slot_token': 'necklace',
    'kubejs:ring_slot_token': 'ring',
    'kubejs:belt_slot_token': 'belt',
    'kubejs:charm_slot_token': 'charm',
    'kubejs:body_slot_token': 'body',
    'kubejs:back_slot_token': 'back',
    'kubejs:hands_slot_token': 'hands',
    'kubejs:feet_slot_token': 'feet',
}

const FREE_LIMIT = 3

// ===== 合成表 =====
ServerEvents.recipes(event => {
    event.shaped('kubejs:head_slot_token', ['ABA','CDC','AEA'], {
        A: 'botania:life_essence', B: 'twilightforest:naga_scale',
        C: 'apotheosis:gem_dust', D: 'minecraft:nether_star', E: 'irons_spellbooks:arcane_essence'
    })
    event.shaped('kubejs:necklace_slot_token', ['ABA','CDC','AEA'], {
        A: 'ars_nouveau:source_gem', B: 'occultism:spirit_attuned_gem',
        C: 'goety:void_shard', D: 'minecraft:nether_star', E: 'botania:mana_diamond'
    })
    event.shaped('kubejs:ring_slot_token', ['ABA','CDC','AEA'], {
        A: 'mekanism:alloy_infused', B: 'thermal:signalum_ingot',
        C: 'create:andesite_alloy', D: 'minecraft:nether_star', E: 'refinedstorage:quartz_enriched_iron'
    })
    event.shaped('kubejs:belt_slot_token', ['ABA','CDC','AEA'], {
        A: 'tconstruct:manyullyn_ingot', B: 'tetra:pristine_lapis',
        C: 'art_of_forging:forged_steel_ingot', D: 'minecraft:nether_star', E: 'mantle:creative_modifier'
    })
    event.shaped('kubejs:charm_slot_token', ['ABA','CDC','AEA'], {
        A: 'goety_cataclysm:abyssal_sacrifice', B: 'cataclysm:void_core',
        C: 'apotheosis:infused_breath', D: 'minecraft:nether_star', E: 'irons_spellbooks:cinder_essence'
    })
    event.shaped('kubejs:body_slot_token', ['ABA','CDC','AEA'], {
        A: 'botania:terrasteel_ingot', B: 'mysticalagriculture:supremium_ingot',
        C: 'farmersdelight:golden_knife', D: 'minecraft:nether_star', E: 'twilightforest:fiery_blood'
    })
    event.shaped('kubejs:back_slot_token', ['ABA','CDC','AEA'], {
        A: 'create:precision_mechanism', B: 'ae2:cell_component_256k',
        C: 'mekanism:teleportation_core', D: 'minecraft:nether_star', E: 'sophisticatedbackpacks:backpack'
    })
    event.shaped('kubejs:hands_slot_token', ['ABA','CDC','AEA'], {
        A: 'tetra:holo', B: 'irons_spellbooks:cooldown_reduction_gem',
        C: 'cataclysm:monstrous_horn', D: 'minecraft:nether_star', E: 'goety:necronomicon'
    })
    event.shaped('kubejs:feet_slot_token', ['ABA','CDC','AEA'], {
        A: 'waystones:warp_dust', B: 'comforts:sleeping_bag_black',
        C: 'curios:ring_of_airs', D: 'minecraft:nether_star', E: 'twilightforest:maze_map_focus'
    })
    event.shaped('kubejs:advanced_slot_token', ['ABC','DEF','GHI'], {
        A: 'kubejs:head_slot_token', B: 'kubejs:necklace_slot_token', C: 'kubejs:ring_slot_token',
        D: 'kubejs:belt_slot_token', E: 'minecraft:netherite_block', F: 'kubejs:charm_slot_token',
        G: 'kubejs:body_slot_token', H: 'kubejs:back_slot_token', I: 'kubejs:feet_slot_token'
    })
})

// ===== 右键使用 =====
ItemEvents.rightClicked(event => {
    const { player, item, level } = event
    if (!player || level.clientSide) return
    const itemId = item.id
    const playerName = player.getName().getString()

    // 进阶解锁符：所有栏位各 +1
    if (itemId === 'kubejs:advanced_slot_token') {
        let unlocked = 0
        Object.values(SLOT_MAP).forEach(slot => {
            if (tryUnlock(player, playerName, slot, true)) unlocked++
        })
        if (unlocked > 0) {
            player.tell(Text.of('§6§l✦ 进阶解锁符生效！ §r§a共解锁 §e' + unlocked + ' §a个额外栏位！'))
            if (!player.isCreative()) item.shrink(1)
        }
        event.cancel()
        return
    }

    // 普通解锁符
    const slotType = SLOT_MAP[itemId]
    if (slotType) {
        let playerData = player.persistentData
        let key = 'curios_extra_' + slotType
        let current = playerData.getInt(key) || 0

        if (current >= FREE_LIMIT) {
            player.tell(Text.of('§c§l✦ ' + slotType + ' 已达 +' + FREE_LIMIT + ' 上限！ §r§e请使用 §6进阶饰品栏解锁符 §e继续突破').red())
            event.cancel()
            return
        }

        if (tryUnlock(player, playerName, slotType, false)) {
            player.tell(Text.of('§a§l✦ 解锁成功！ §r§a额外 §e' + slotType + ' §a栏位 +1'))
            if (!player.isCreative()) item.shrink(1)
        }
        event.cancel()
    }
})

function tryUnlock(player, playerName, slotType, isAdvanced) {
    let playerData = player.persistentData
    let key = 'curios_extra_' + slotType
    let current = playerData.getInt(key) || 0

    if (!isAdvanced && current >= FREE_LIMIT) return false

    player.server.runCommandSilent('curios add ' + slotType + ' ' + playerName + ' 1')
    playerData.putInt(key, current + 1)

    let limitText = isAdvanced ? '§c(突破)' : '§a/' + FREE_LIMIT
    player.tell(Text.of('§7[饰品系统] §f' + slotType + ' 额外栏位: §e' + (current + 1) + limitText).gray())
    return true
}
