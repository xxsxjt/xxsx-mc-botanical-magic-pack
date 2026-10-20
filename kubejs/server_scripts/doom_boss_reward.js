// 植物魔艺 — Boss击杀自动奖励终焉技能树经验
// 当玩家完成 FTB Quests 中带 kill 任务的任务时，+1 终焉经验
// priority: 60

FTBQuestsEvents.completed(event => {
    let quest = event.getQuest()
    if (!quest) return
    let tasks = quest.getTasks()
    for (let task of tasks) {
        if (task.getType() == 'kill') {
            let player = event.getPlayer()
            player.runCommandSilent('puffish_skills experience add @s doom 1')
            break
        }
    }
})
