"""The office coffee machine, as the consumer agent sees it.

The agent reads the machine only through get_coffee_machine(), so a real
device can later be swapped in behind that function. For now it returns the
shared mock data.

Run this file to serve the machine over HTTP:

    python3 consumer-agent/src/coffee_machine.py
    curl http://127.0.0.1:8000/coffee-machine
"""

import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

PORT = 8000
MACHINE_FILE = Path(__file__).resolve().parents[2] / "mock-data" / "coffee-machine.json"


def get_coffee_machine() -> dict:
    """Return the machine's current state from mock-data/coffee-machine.json.

    The file is read on every call, so edits to it show up without a restart.
    """
    return json.loads(MACHINE_FILE.read_text(encoding="utf-8"))


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path != "/coffee-machine":
            self.send_error(404)
            return
        body = (json.dumps(get_coffee_machine(), indent=2) + "\n").encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    print(f"Serving http://127.0.0.1:{PORT}/coffee-machine (Ctrl+C to stop)")
    try:
        ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        pass
