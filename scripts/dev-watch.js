#!/usr/bin/env node
/**
 * Startet den Next-Dev-Server und startet ihn bei Absturz neu.
 * Kein PM2 nötig – einfache Alternative zum Daemon-Mode.
 */
const { spawn } = require("child_process");

function run() {
  const child = spawn("npm", ["run", "dev"], {
    stdio: "inherit",
    shell: true,
    cwd: __dirname + "/..",
  });
  child.on("close", (code) => {
    if (code !== 0 && code !== null) {
      console.log("\n[dev-watch] Server beendet, Neustart in 2s …");
      setTimeout(run, 2000);
    }
  });
}

run();
