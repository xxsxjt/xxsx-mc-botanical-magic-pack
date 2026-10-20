# 部署：把本仓库镜像到实例

目标实例（受限根，写入前需当前任务授权）：

```
E:\_dx\_Games\MC\xxxxxx\.minecraft\versions\Botanical-Magic-Art
```

只覆盖本仓库跟踪的目录：`kubejs/`、`config/`、`defaultconfigs/`、`packmenu/`、`resourcepacks/`。
不触碰 `mods/`、存档、日志。

```powershell
# 1. 检查实例没有在跑
Get-Process java -ErrorAction SilentlyContinue | Select-Object Id, StartTime, Path

# 2. 改动前备份实例侧对应目录
$dst  = 'E:\_dx\_Games\MC\xxxxxx\.minecraft\versions\Botanical-Magic-Art'
$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
foreach ($d in 'kubejs','config','defaultconfigs','packmenu','resourcepacks') {
    robocopy "$dst\$d" "$dst\backups\before-deploy-$stamp\$d" /MIR /NFL /NDL /NJH /NJS | Out-Null
}

# 3. 镜像
#    /XJ：跳过 junction / 符号链接，避免沿链接把实例外的东西写入
foreach ($d in 'kubejs','config','defaultconfigs','packmenu','resourcepacks') {
    robocopy "$PSScriptRoot\..\$d" "$dst\$d" /MIR /XJ /NFL /NDL /NJH /NJS | Out-Null
}

# 4. 复核
git -C "$PSScriptRoot\.." status --short
```

## 注意

- `/kubejs reload server_scripts` 只重载服务端脚本；改 `startup_scripts/` 必须冷启动。
- 改 `config/ftbquests/` 后可在游戏内 `/ftbquests reload`。
- `robocopy /MIR` 会删除目标侧多余文件；实例侧的临时手改会丢。部署前先确认。
- `kubejs/probe`、`config/yes_steve_model` 不进仓库，镜像源里没有它们，
  所以 `/MIR` 会把实例里这两个目录**删掉**。删了无害（probe 是自动生成，YSM 是客户端模型缓存）；
  要保留就先手动把这两个目录移出实例。
