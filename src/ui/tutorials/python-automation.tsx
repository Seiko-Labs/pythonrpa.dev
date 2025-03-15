"use client";

import { Button } from "@/shared/primitives/button";
import { useMemo } from "react";
import RequirementsIcon from "@/shared/icons/requirements.svg";
import DownloadIcon from "@/shared/icons/download.svg";

export function PythonAutomation() {
  const steps = useMemo(
    () => [
      {
        title: "🛠️ Step 1: Get Ready",
        description: "🔍 Make sure everything is set up:",
        items: [
          <>Install Python (version 3.8 or higher).</>,
          <>
            Add the required libraries using:{" "}
            <code className="bg-accent/20 text-sm font-mono px-1 py-0.5 rounded-md">
              pip install -r requirements.txt
            </code>
          </>,
          <>Have your Orchestrator access ready (login or API key).</>,
        ],
      },
      {
        title: "📥 Step 2: Set Up the Agent",
        description:
          "⚙️ Download the agent using the Download Agent button. 🖥️ Install it, open the settings, and connect it:",
        items: [
          <>Enter the Orchestrator address.</>,
          <>Input your login/password or API key.</>,
        ],
      },
      {
        title: "📝 Step 3: Prepare Your Python Script",
        description: "🧩 Add what's needed:",
        items: [
          <>Make sure your script has a main function, like this:</>,
          <>
            Input your login/password or API key.{" "}
            <code className="bg-accent/20 text-sm font-mono px-1 py-0.5 rounded-md">
              from rpa_orchestrator import Orchestrator
            </code>
          </>,
          <>Check the input and output parameters of your script.</>,
        ],
      },
    ],
    []
  );

  return (
    <article
      aria-labelledby="py-title"
      className="bg-background p-8 space-y-5 font-medium border border-accent/20 rounded-3xl"
    >
      <p>
        Python RPA enables orchestration of Python scripts (bots). The platform
        support both Python code based scripts (bots) orchestration as well as
        bots build using Low-code Studio.
      </p>

      <p>
        Below you can find an instruction on how to connect Python scripts(bots)
        to Orchestrator.
      </p>

      <p className="font-bold">
        🚀 Guide: How to Connect a Python Script to the Orchestrator
      </p>

      {steps.map((step) => (
        <div key={step.title} className="p-2.5 bg-muted rounded-md">
          <p className="font-bold mb-2">{step.title}</p>
          <p>{step.description}</p>
          <ul className="list-disc list-inside ml-2">
            {step.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex gap-5">
        <Button>
          Requirements
          <RequirementsIcon />
        </Button>
        <Button variant="outline">
          Download Agent
          <DownloadIcon />
        </Button>
      </div>
    </article>
  );
}
