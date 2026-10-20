// 植物魔艺 - 额外主世界 生物强化 + 掉落物
// priority: 50

const ADV_DIM = 'kubejs:advanced_overworld'

// ===== 生物强化：额外主世界怪物属性大幅强化 =====
EntityEvents.spawned('monster', event => {
    if (String(event.entity.level.dimension) !== ADV_DIM) return

    // 血量 ×10
    event.entity.modifyAttribute('minecraft:generic.max_health', 'advanced_difficulty', 9.0, 'multiply_base')
    event.entity.heal(99999)

    // 攻击 ×10
    event.entity.modifyAttribute('minecraft:generic.attack_damage', 'advanced_difficulty', 9.0, 'multiply_base')

    // 速度 ×2（+100%）
    event.entity.modifyAttribute('minecraft:generic.movement_speed', 'advanced_difficulty', 1.0, 'multiply_base')

    // 护甲 ×10
    event.entity.modifyAttribute('minecraft:generic.armor', 'advanced_difficulty', 40.0, 'multiply_base')

    // 盔甲韧性 ×10
    event.entity.modifyAttribute('minecraft:generic.armor_toughness', 'advanced_difficulty', 40.0, 'multiply_base')

    // 击退抗性 +100%
    event.entity.modifyAttribute('minecraft:generic.knockback_resistance', 'advanced_difficulty', 1.0, 'addition')
})

// ===== 60% 全减伤（通过受伤回调） =====
EntityEvents.hurt(event => {
    if (event.level.clientSide) return
    const entity = event.entity
    if (!entity || !entity.living) return
    if (String(entity.level.dimension) !== ADV_DIM) return
    if (!entity.monster) return

    // 取消原伤害，施加 40% 的伤害
    const originalDamage = event.damage
    if (originalDamage > 0) {
        event.cancel()
        // 延迟 1 tick 施加减免后伤害，避免无限递归
        event.server.scheduleInTicks(1, () => {
            entity.attack(event.damageSource, originalDamage * 0.4)
        })
    }
})

// ===== 掉落物翻倍（LootJS 2.12.0 API） =====
LootJS.modifiers(event => {
    event.addLootTypeModifier(LootType.ENTITY)
        .apply(ctx => {
            let level = ctx.level
            if (level && String(level.dimension) === ADV_DIM) {
                ctx.loot.forEach(item => {
                    if (item.getCount() > 0) {
                        item.setCount(item.getCount() * 2)
                    }
                })
            }
        })
})
