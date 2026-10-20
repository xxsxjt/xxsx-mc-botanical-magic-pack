// ============================================================
// 灵魂水晶自动消失 — 七咒之戒死亡后2个游戏日消失
// priority: 55
// ============================================================

// 监听实体生成事件，当灵魂水晶物品实体生成时，调度2个游戏日后消失
EntityEvents.spawned(event => {
    const entity = event.entity
    if (!entity || entity.level.clientSide) return

    // 只处理物品实体
    if (String(entity.type) !== 'minecraft:item') return

    const stack = entity.item
    if (!stack || stack.isEmpty()) return

    // 检查是否是灵魂水晶
    if (String(stack.id) !== 'enigmaticlegacy:soul_crystal') return

    // 记录生成时间
    const spawnTick = entity.server.tickCount
    const lifetime = 48000 // 2个游戏日 = 2 * 24000 = 48000 ticks

    // 每tick检查，到时间就消失
    const entityId = entity.id

    // 用LevelEvents.tick定期检查
    // 为了避免内存泄漏，用一个简单的标记
    entity.persistentData.soulCrystalExpiry = spawnTick + lifetime
})

// 定期检查灵魂水晶是否过期
LevelEvents.tick(event => {
    const level = event.level
    if (level.clientSide) return

    const server = level.server
    if (!server) return

    // 每秒检查一次
    if (server.tickCount % 20 !== 0) return

    const currentTick = server.tickCount

    // 遍历所有物品实体
    level.getEntities().forEach(entity => {
        if (String(entity.type) !== 'minecraft:item') return

        const expiry = entity.persistentData.soulCrystalExpiry
        if (!expiry) return

        if (currentTick >= expiry) {
            // 时间到，消失
            // 播放粒子效果
            try {
                level.playSound(null, entity.blockPosition, 'botania:enchanter_fade', 'ambient', 0.5, 1.0)
            } catch (e) {}
            entity.discard()
        }
    })
})
