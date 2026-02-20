This tab allows you to monitor the health, statistics, and real-time logs of the OpenClaw Gateway daemon running in the background of Cafelua OS.

![Diagnostics Tab](diagnostics-tab.png)

## Status Overview
In the top grid, you can check key gateway metrics:
- **Gateway**: Current connection status (🟢 OK, 🔴 Error)
- **Node ID**: The unique identifier of the gateway
- **Uptime**: How long the system has been running
- **Platform / Arch**: OS and architecture information
- **Total Requests / Tokens**: Requests and tokens processed today
- **Total Cost**: Total cost incurred

## Real-time Log Streaming
The bottom panel streams detailed internal logs directly from the gateway.
- **Start Logs / Stop Logs**: You can start or stop the log stream at any time.
- If the system encounters a problem or a messenger integration fails, you can find the detailed cause in these logs.

## RPC Methods List
At the very bottom of the tab, a list of all supported Remote Procedure Call (RPC) methods is displayed as tags, allowing you to quickly verify which features the gateway currently supports.
