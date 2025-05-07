import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// Create an MCP server
const server = new McpServer({
    name: "TimeTools",
    description: "Tools to help you manage time",
    version: "1.0.0",
});

const getTZ = (timezon?: string) => {
    return timezon || dayjs.tz.guess();
};

server.tool("get_timezone", "Get timezone (e.g. Asia/Tokyo)", async () => {
    return {
        content: [
            {
                type: "text",
                text: getTZ(),
            },
        ],
    };
});

server.tool("get_unixtime", "Get unixtime (e.g. 1746627290)", async () => {
    const unixTimestamp = dayjs().unix();
    return {
        content: [
            {
                type: "text",
                text: String(unixTimestamp),
            },
        ],
    };
});

server.tool(
    "convert_unix_to_datetime",
    "Convert unixtime to datetime time (e.g. 1746627290 to 2025-01-01 01:01:01)",
    {
        unixtime: z.number(),
        timezone: z.string().optional(),
        isISO: z.boolean().optional(),
    },
    async ({ unixtime, timezone, isISO }) => {
        const currentDateTime = dayjs
            .unix(unixtime)
            .tz(getTZ(timezone))
            .format(isISO ? undefined : DEFAULT_TIME_FORMAT);
        return {
            content: [
                {
                    type: "text",
                    text: currentDateTime,
                },
            ],
        };
    },
);

server.tool(
    "convert_datetime_to_unix",
    "Convert datetime time to unixtime (e.g. 2025-01-01 01:01:01 to 1746627290)",
    {
        time: z.string(),
        timezone: z.string().optional(),
    },
    async ({ time, timezone }) => {
        const unixtime = dayjs(time).tz(getTZ(timezone)).valueOf();
        return {
            content: [
                {
                    type: "text",
                    text: String(unixtime),
                },
            ],
        };
    },
);

server.tool(
    "get_current_date_time",
    "Get the current date and time (e.g. 2025-01-01 01:01:01)",
    {
        timezone: z.string().optional(),
    },
    async ({ timezone }) => {
        const currentDateTime = dayjs()
            .tz(getTZ(timezone))
            .format(DEFAULT_TIME_FORMAT);
        return {
            content: [
                {
                    type: "text",
                    text: currentDateTime,
                },
            ],
        };
    },
);

server.tool(
    "get_current_date_time_iso",
    "Get ISO 8601 time. (e.g. 2025-05-07T23:03:27+09:00)",
    {
        timezone: z.string().optional(),
    },
    async ({ timezone }) => {
        const currentDateTime = dayjs().tz(getTZ(timezone)).format();
        return {
            content: [
                {
                    type: "text",
                    text: currentDateTime,
                },
            ],
        };
    },
);

server.tool(
    "get_elapsed_time",
    "Get the difference time between two datetimes (e.g. 2025-01-01 01:01:01 and 2025-01-02 02:02:02)",
    {
        from: z.string(),
        to: z.string(),
        unit: z
            .enum([
                "millisecond",
                "second",
                "minute",
                "hour",
                "day",
                "week",
                "month",
                "year",
            ])
            .optional()
            .default("millisecond"),
    },
    async ({ from, to, unit = "second" }) => {
        const fromDateTime = dayjs(from);
        const toDateTime = dayjs(to);
        if (!fromDateTime.isValid() || !toDateTime.isValid()) {
            return {
                content: [{ type: "text", text: "Invalid format" }],
                isError: true,
            };
        }
        /**
         * {@link https://day.js.org/docs/en/display/difference}
         */
        const duration = toDateTime.diff(fromDateTime, unit, true);
        return {
            content: [{ type: "text", text: String(duration) }],
        };
    },
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Example MCP Server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
