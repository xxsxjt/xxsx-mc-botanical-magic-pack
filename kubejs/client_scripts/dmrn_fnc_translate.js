// priority: 99
// DM&R + FNC 翻译兜底。
// 主模组条目由 !BotanicalMagic-Language.zip 提供；这里只保留资源包未覆盖的兼容键，
// 避免 KubeJS 在资源包之后用旧译文覆盖正确译文。

let allKeys = {
    'item.dmnr.netherite_curse_protection_amulet': '下界合金诅咒防护护符',
    'item.dmnr.collector': '虚空之眼',
    'item.dmnr.key_of_home': '家园之钥',
    'item.dmnr.king_heart_necklace': '国王之心护符',
    'item.dmnr.bracelet_of_harmony': '水之手镯',
    'item.dmnr.ring_of_reach': '延伸之戒',
    'item.dmnr.night_vision_goggles': '夜视护目镜',
    'item.dmnr.infinite_potion': '无限药水',
    'item.dmnr.damage_adjustment_belt': '牛头人腰带',
    'item.dmnr.hiding_tiara': '隐匿头冠',
    'item.dmnr.revenge_amulet': '复仇护符',
    'item.dmnr.revenge_amulet_greater': '高阶复仇护符',
    'item.dmnr.reflect_amulet': '反射护符',
    'item.dmnr.reflect_amulet_greater': '高阶反射护符',
    'item.dmnr.flame_amulet': '烈焰护符',
    'item.dmnr.flame_amulet_greater': '高阶烈焰护符',
    'item.dmnr.bracelet_of_friendship.lore_1': '戴上它，你们就是最好的朋友了。',
    'item.dmnr.king_heart_necklace.description': '提高生命恢复速度。',
    'item.dmnr.bracelet_of_harmony.description': '提升护甲韧性。',
    'item.dmnr.ring_of_reach.description': '提高触及距离。',
    'item.dmnr.collector.description': '击杀生物时收集经验球和灵魂。',
    'item.dmnr.night_vision_goggles.description': '佩戴时获得夜视效果。',
    'item.dmnr.revenge_amulet.description': '受伤时暂时提高攻击伤害。',
    'item.dmnr.reflect_amulet.description': '有几率反射伤害。',
    'item.dmnr.flame_amulet.description': '点燃攻击者。',
    'item.dmnr.infinite_potion.description': '一瓶能自我补充的药水。',
    'item.dmnr.damage_adjustment_belt.description': '调整承受和造成的伤害。',
    'item.dmnr.netherite_curse_protection_amulet.description': '防止诅咒附魔。',
    'item.dmnr.fallen_angel_ring.description': '并非所有天使都身处天堂。',
    'item.fnc.rune_sword': '符文剑',
    'item.fnc.rune_pickaxe': '符文镐',
    'item.fnc.rune_axe': '符文斧',
    'item.fnc.rune_shovel': '符文锹',
    'item.fnc.rune_hoe': '符文锄',
    'item.fnc.rune_bow': '符文弓',
    'item.fnc.rune_crossbow': '符文弩',
    'item.fnc.rune_shield': '符文盾牌',
    'item.fnc.rune_helmet': '符文头盔',
    'item.fnc.rune_chestplate': '符文胸甲',
    'item.fnc.rune_leggings': '符文护腿',
    'item.fnc.rune_boots': '符文靴子',
    'item.fnc.disassembler': '拆解者',
    'item.fnc.random_modifier': '随机修改器',
    'item.fnc.station_controller': '站点控制器',
    'item.fnc.teleport_controller': '传送控制器',
    'item.fnc.quest_giver': '任务发布者',
    'item.fnc.pos_logger': '位置记录器',
    'item.fnc.redstone_controller': '红石控制器',
    'item.fnc.experience_charger': '经验充能器',
    'item.fnc.loot_chest': '战利品箱',
    'item.fnc.rune_armor': '符文护甲',
};

for (let locale of ['en_us', 'zh_cn']) {
    ClientEvents.lang(locale, event => {
        for (let [key, value] of Object.entries(allKeys)) {
            event.add(key, value);
        }
        console.log('[翻译] DM&R/FNC 仅注入资源包未覆盖的兼容键: ' + Object.keys(allKeys).length);
    });
}
