import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import registerPiExtension from "../src/pi-extension.js";

type NotificationLevel = "info" | "success" | "warning" | "error";

interface PiHandlers {
  session_start: unknown;
  tool_result: unknown;
}

interface RegisteredCommand {
  description: string;
  handler: unknown;
}

class Harness {
  handlers: Partial<PiHandlers> = {};

  command: RegisteredCommand | undefined;

  on<K extends keyof PiHandlers>(event: K, handler: PiHandlers[K]): void {
    this.handlers[event] = handler;
  }

  registerCommand(name: string, command: RegisteredCommand): void {
    if (name !== "lint-branching") {
      throw new Error(`Unexpected command registered: ${name}`);
    }

    this.command = command;
  }
}

describe("pi extension /lint-branching command", () => {
  function createHarness() {
    const harness = new Harness();

    registerPiExtension(harness);

    if (!harness.command) {
      throw new Error("lint-branching command was not registered");
    }

    return harness;
  }

  async function writeProject(files: Record<string, string>) {
    const projectDir = await mkdtemp(path.join(os.tmpdir(), "lint-branching-"));

    for (const [relativePath, content] of Object.entries(files)) {
      const filePath = path.join(projectDir, relativePath);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, content);
    }

    return projectDir;
  }

  async function runLintBranching(files: Record<string, string>) {
    const cwd = process.cwd();
    const projectDir = await writeProject(files);
    const harness = createHarness();
    const notifications: Array<[string, NotificationLevel]> = [];

    try {
      process.chdir(projectDir);
      await (harness.handlers.session_start as any)?.();

      await (harness.command.handler as any)("", {
        ui: {
          notify(message: string, level: NotificationLevel) {
            notifications.push([message, level]);
          },
        },
      });

      return notifications;
    } finally {
      process.chdir(cwd);
      await rm(projectDir, { recursive: true, force: true });
    }
  }

  test("reports success for TS-only projects", async () => {
    const notifications = await runLintBranching({
      "src/app.ts": "const answer = 42;\n",
    });

    expect(notifications).toContainEqual([
      "No redundant branching patterns found.",
      "success",
    ]);
    expect(notifications.some(([, level]) => level === "error")).toBe(false);
  });

  test("reports success for TSX-only projects", async () => {
    const notifications = await runLintBranching({
      "src/app.tsx": "const answer = 42;\n",
    });

    expect(notifications).toContainEqual([
      "No redundant branching patterns found.",
      "success",
    ]);
    expect(notifications.some(([, level]) => level === "error")).toBe(false);
  });
});
