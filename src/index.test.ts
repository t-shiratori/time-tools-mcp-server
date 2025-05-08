import { describe, it, expect, test, beforeEach } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { server } from "./index.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Helper function to set up an in-memory connection between the MCP client and server.
 * This is used in each test case to create a fresh client-server connection.
 * @returns {Promise<Client>} A connected client instance
 */
const setupConnection = async () => {
    const client = new Client({
        name: "test client",
        version: "0.1.0",
    });

    const [clientTransport, serverTransport] =
        InMemoryTransport.createLinkedPair();

    await Promise.all([
        client.connect(clientTransport),
        server.connect(serverTransport),
    ]);

    return client;
};

describe("get_timezone", () => {
    test("return time zone", async () => {
        const client = await setupConnection();

        const expectTimezone = dayjs.tz.guess();

        const result = await client.callTool({
            name: "get_timezone",
        });

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: expectTimezone,
                },
            ],
        });
    });
});

describe("get_unixtime", () => {
    test("return unixtime", async () => {
        const client = await setupConnection();

        const result = await client.callTool({
            name: "get_unixtime",
        });

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: expect.stringMatching(/^\d{10,}$/),
                },
            ],
        });
    });
});

describe("convert_unix_to_datetime", () => {
    test("return datetime", async () => {
        const client = await setupConnection();

        const result = await client.callTool({
            name: "convert_unix_to_datetime",
            arguments: {
                unixtime: 1746627290,
                timezone: "Asia/Tokyo",
                isISO: false,
            },
        });

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: "2025-05-07 23:14:50",
                },
            ],
        });
    });

    test("return datetime with ISO format", async () => {
        const client = await setupConnection();

        const result = await client.callTool({
            name: "convert_unix_to_datetime",
            arguments: {
                unixtime: 1746627290,
                timezone: "Asia/Tokyo",
                isISO: true,
            },
        });

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: "2025-05-07T23:14:50+09:00",
                },
            ],
        });
    });
});

describe("convert_datetime_to_unix", () => {
    test("return unixtime", async () => {
        const client = await setupConnection();

        const result = await client.callTool({
            name: "convert_datetime_to_unix",
            arguments: {
                time: "2025-05-07 23:14:50",
                timezone: "Asia/Tokyo",
            },
        });

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: "1746627290000",
                },
            ],
        });
    });
});

describe("get_current_date_time", () => {
    test("return datetime", async () => {
        const client = await setupConnection();

        const result = await client.callTool({
            name: "get_current_date_time",
            arguments: {
                timezone: "Asia/Tokyo",
            },
        });

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: expect.stringMatching(
                        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
                    ),
                },
            ],
        });
    });
});

describe("get_current_date_time_iso", () => {
    test("return datetime with ISO format", async () => {
        const client = await setupConnection();

        const result = await client.callTool({
            name: "get_current_date_time_iso",
            arguments: {
                timezone: "Asia/Tokyo",
            },
        });

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: expect.stringMatching(
                        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/,
                    ),
                },
            ],
        });
    });
});

describe("get_elapsed_time", () => {
    test("return diff time", async () => {
        const client = await setupConnection();

        const result = await client.callTool({
            name: "get_elapsed_time",
            arguments: {
                from: "2025-05-07 23:14:50",
                to: "2025-05-08 23:14:50",
                timezone: "Asia/Tokyo",
            },
        });

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: "86400000",
                },
            ],
        });
    });

    test.each([
        { unit: "millisecond", expected: "86400000" },
        { unit: "second", expected: "86400" },
        { unit: "minute", expected: "1440" },
        { unit: "hour", expected: "24" },
        { unit: "day", expected: "1" },
    ])("return diff time with unit: $unit", async ({ unit, expected }) => {
        const client = await setupConnection();

        const result = await client.callTool({
            name: "get_elapsed_time",
            arguments: {
                from: "2025-05-07 23:14:50",
                to: "2025-05-08 23:14:50",
                timezone: "Asia/Tokyo",
                unit,
            },
        });

        expect(result).toEqual({
            content: [
                {
                    type: "text",
                    text: expected,
                },
            ],
        });
    });
});
