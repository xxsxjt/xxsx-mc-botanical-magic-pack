// 无尽装备禁用 Tooltip — 红色警告
ItemEvents.tooltip(event => {
  const warn = [
    Text.red("[已禁用]").bold(true),
    Text.gray(" 有Bug，且严重削减游戏数值碰撞的乐趣")
  ]

  const items = [
    'avaritia:infinity_helmet',
    'avaritia:infinity_chestplate',
    'avaritia:infinity_pants',
    'avaritia:infinity_boots',
    'avaritia:infinity_sword',
    'avaritia:infinity_bow',
    'more_avaritia:neutron_helmet',
    'more_avaritia:neutron_chestplate',
    'more_avaritia:neutron_leggings',
    'more_avaritia:neutron_boots',
    'more_avaritia:neutron_sword',
    'more_avaritia:neutron_bow',
    'more_avaritia:infinity_helmet',
    'more_avaritia:infinity_head',
    'more_avaritia:infinity_chestplate',
    'more_avaritia:infinity_legs',
    'more_avaritia:infinity_boots',
    'more_avaritia:infinity_sword',
    'more_avaritia:infinity_god_sword',
    'avaritia_expand:crystal_helmet',
    'avaritia_expand:crystal_chestplate',
    'avaritia_expand:crystal_leggings',
    'avaritia_expand:crystal_boots',
    'avaritia_expand:crystal_bow',
    'avaritia_expand:blaze_helmet',
    'avaritia_expand:blaze_chestplate',
    'avaritia_expand:blaze_leggings',
    'avaritia_expand:blaze_boots',
    'avaritia_expand:blaze_bow',
  ]

  items.forEach(id => {
    event.add(id, warn)
  })
})
