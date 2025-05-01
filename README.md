# MCP server for time manipulation

A dynamic MCP server management service for time manipulation. 

<a href="https://glama.ai/mcp/servers/@t-shiratori/time-tools-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@t-shiratori/time-tools-mcp-server/badge" alt="Time Tools Server MCP server" />
</a>

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

.vscode/mcp.json
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

## Example prompt

en

```md
## Overview
- Please execute the following tasks
- Also measure the time required to execute the tasks
- Please follow the Time Tracker requirements for the measurement method

## Tasks
- Create a src directory
- Create an empty file in it
- Name the file index.ts

## Time Tracker requirements
1. Get and display the current time before the task starts
2. Get and display the current time after the task ends
3. Get and display the elapsed time from the start and end times of the task
4. Finally, display in the following table format
| Start time | End time | Elapsed time |
| ---- | ---- | ---- |
| <Start time> | <End time> | <Elapsed time> |
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
| 開始時間 | 終了時間 | 経過時間 |
| ---- | ---- | ---- |
| <開始時間> | <終了時間> | <経過時間> |
```