import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import dayjs from "dayjs";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const DEFAULT_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

// Create an MCP server
const server = new McpServer({
	name: "TimeTools",
	description: "Tools to help you manage time",
	version: "1.0.0",
});

server.tool(
	"getCurrentDateTime",
	"Get the current date and time (e.g. 2025-01-01 01:01:01)",
	async () => {
		const currentDateTime = dayjs().format(DEFAULT_TIME_FORMAT);
		return {
			content: [{ type: "text", text: currentDateTime }],
		};
	},
);

server.tool(
	"getDurationDateTime",
	"Get the difference time between two datetimes (e.g. 2025-01-01 01:01:01 and 2025-01-02 02:02:02)",
	{
		from: z.string(),
		to: z.string(),
		unit: z.enum(["second", "minute", "hour"]).optional().default("second"),
	},
	async ({ from, to, unit = "second" }) => {
		const fromDateTime = dayjs(from);
		const toDateTime = dayjs(to);
		if (!fromDateTime.isValid() || !toDateTime.isValid()) {
			throw new Error("Invalid date format");
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
