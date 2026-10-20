// 七魔之戒 工具提示修改 — xxsx的赐福

ItemEvents.tooltip(event => {
    event.add("enigmaticlegacy:cursed_ring", [
        Text.green("此物已经过xxsx的赐福，化解了大部分诅咒"),
        Text.empty(),
        Text.green("7个诅咒已被赐福化解大半").append(Text.gray("（但代价是……）"))
    ])
})
