// priority: 99
// 植物神匠 - 关闭烦人的弹窗

ServerEvents.loaded(event => {
    // 关闭进度公告
    event.server.runCommandSilent('gamerule announceAdvancements false')
})
