# MCP server for time manipulation

## Prepare mcp server app

### 1. Install packages

```bash
pnpm install
```

### 2. Build

```bash
pnpm build
```

## Mcp Inspector

[Inspector - Model Context Protocol](https://modelcontextprotocol.io/docs/tools/inspector)

```bash
pnpm start
```

```bash
pnpm inspect
```

getCurrentDateTime

<img width="800" alt="Image" src="https://github.com/user-attachments/assets/f8d711e4-136b-4e09-81fb-f1db17f2b39a" />

getDurationDateTime

<img width="800" alt="Image" src="https://github.com/user-attachments/assets/f243b586-ccec-4e30-bdf2-b19163e9dbce" />

## VS Code

### When managed in a project

`.vscode/mcp.json`

```json
{
  "servers": {
    "time-tools": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/build/index.js"]
    }
  }
}
```

### For personal global management

`~/Library/Application Support/Code/User/settings.json`

```json
{
  "mcp": {
    "servers": {
      "time-tools": {
        "command": "node",
        "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/build/index.js"]
      }
    }
  }
}
```

## Example prompt

en

```md
## Overview
- Please perform the following tasks
- Perform the following tasks and measure the time it takes to perform the tasks.
- Please follow the time tracker requirements for the measurement method.

## Tasks
- Create the src directory
- Create an empty file in it
- The name of the file to be created should be index.ts

## Time Tracker Requirements
1. retrieve and display the current time before the task starts 2.
2. retrieve and display the current time after the task is completed 3.
3. retrieve and display the elapsed time from the start and end time of the task 4. finally display the following table
4. finally display in the following table format 
|item|record| 
|:---|:---| 
|start time|<enter result>| 
|end time|<enter result>| 
|elapsed time|<enter result>|

Translated with DeepL.com (free version)
```

jp

```md
## 概要
- 以下のタスクを実行してください
- タスク実行に要した時間も計測します
- 計測の方法はタイムトラッカー要件にしたがってください

## タスク
- src ディレクトリを作成する
- その中に空のファイルを作成する
- 作成するファイル名は index.ts とする

## タイムトラッカー要件
1. タスク開始前の現在時間を取得して表示する
2. タスク終了後の現在時間を取得して表示する
3. タスクの開始時と終了時の時間から経過時間を取得して表示する
4. 最終的に以下の表形式で表示してください
|項目|記録|
|:---|:---|
|開始時間|<結果を入力>|
|終了時間|<結果を入力>|
|経過時間|<結果を入力>|
```
