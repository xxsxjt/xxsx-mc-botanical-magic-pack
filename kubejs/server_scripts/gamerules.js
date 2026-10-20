// 植物魔艺 - 游戏规则
// priority: 100

let gamerulesSet = false

ServerEvents.loaded(event => {
    if (gamerulesSet) return
    gamerulesSet = true
    // 用命令设置，最可靠
    event.server.runCommandSilent('gamerule keepInventory true')
    console.log('[植物魔艺] keepInventory = true')
})
