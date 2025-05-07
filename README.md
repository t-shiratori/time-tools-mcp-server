## MCP server for time manipulation

A dynamic MCP server management service for time manipulation. 

<a href="https://glama.ai/mcp/servers/@t-shiratori/time-tools-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@t-shiratori/time-tools-mcp-server/badge" alt="Time Tools Server MCP server" />
</a>

## MCP Tools

This server provides several time-related tools via the Model Context Protocol (MCP).

---

### get_timezone

Get the current timezone of the server.

- **Returns:**  
  - `text`: The timezone string.  
    - e.g. `Asia/Tokyo`

---

### get_unixtime

Get the current Unix timestamp (seconds since epoch).

- **Returns:**  
  - `text`: The Unix timestamp as a string.  
    - e.g. `1746627290`

---

### convert_unix_to_datetime

Convert a Unix timestamp to a formatted datetime string.

- **Parameters:**
  - `unixtime` (`number`, required): The Unix timestamp to convert.  
    - e.g. `1746627290`
  - `timezone` (`string`, optional): The timezone to use (default: server's timezone).  
    - e.g. `Asia/Tokyo`
  - `isISO` (`boolean`, optional): If true, returns ISO 8601 format; otherwise, returns `YYYY-MM-DD HH:mm:ss`.  
    - e.g. `true`

- **Returns:**  
  - `text`: The formatted datetime string.  
    - e.g. `2025-01-01 01:01:01` or `2025-01-01T01:01:01+09:00`

---

### convert_datetime_to_unix

Convert a datetime string to a Unix timestamp (milliseconds since epoch).

- **Parameters:**
  - `time` (`string`, required): The datetime string to convert.  
    - e.g. `2025-01-01 01:01:01`
  - `timezone` (`string`, optional): The timezone to use (default: server's timezone).  
    - e.g. `Asia/Tokyo`

- **Returns:**  
  - `text`: The Unix timestamp as a string.  
    - e.g. `1746627290000`

---

### get_current_date_time

Get the current date and time in `YYYY-MM-DD HH:mm:ss` format.

- **Parameters:**
  - `timezone` (`string`, optional): The timezone to use (default: server's timezone).  
    - e.g. `Asia/Tokyo`

- **Returns:**  
  - `text`: The formatted current date and time.  
    - e.g. `2025-01-01 01:01:01`

---

### get_current_date_time_iso

Get the current date and time in ISO 8601 format.

- **Parameters:**
  - `timezone` (`string`, optional): The timezone to use (default: server's timezone).  
    - e.g. `Asia/Tokyo`

- **Returns:**  
  - `text`: The ISO 8601 formatted current date and time.  
    - e.g. `2025-05-07T23:03:27+09:00`

---

### get_elapsed_time

Calculate the difference between two datetime strings.

- **Parameters:**
  - `from` (`string`, required): The start datetime.  
    - e.g. `2025-01-01 01:01:01`
  - `to` (`string`, required): The end datetime.  
    - e.g. `2025-01-02 02:02:02`
  - `unit` (`"millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "year"`, optional, default: `"second"`): The unit for the difference.  
    - e.g. `"hour"`

- **Returns:**  
  - `text`: The difference between the two datetimes in the specified unit.  
    - e.g. `3600`

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
pnpm inspect
```

get_current_date_time

<img width="800" alt="Image" src="https://github.com/user-attachments/assets/0b1e741c-773a-4a46-bc49-d26b4b7f66b9" />

get_elapsed_time

<img width="800" alt="Image" src="https://github.com/user-attachments/assets/a611efa7-a618-4080-9b16-945b6ecdf990" />

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
- Please follow the time tracking requirements for the measurement method

## Tasks
- Create the src directory
- Create an empty file in it
- Name the file index.ts

## Time tracking requirements
1. retrieve and display the current time before the task starts 2.
2. retrieve and display the current time after the task is completed 3.
3. retrieve and display the elapsed time from the start and end time of the task 4. finally display the following table
4. finally display in the following table format 
|item|record| 
|:---|:---| 
|start time|<enter result>| 
|end time|<enter result>| 
|elapsed time|<enter result>|
```

jp

```md
## 概要
- 以下のタスクを実行してください
- タスク実行に要した時間も計測します
- 計測の方法はタイムトラッキング要件にしたがってください

## タスク
- src ディレクトリを作成する
- その中に空のファイルを作成する
- 作成するファイル名は index.ts とする

## タイムトラッキング要件
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

