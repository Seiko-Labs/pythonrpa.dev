import PythonAutomation from "@/shared/icons/dashboard/python.svg";
import Bot from "@/shared/icons/dashboard/bot.svg";
import Code from "@/shared/icons/dashboard/code.svg";
import Orc from "@/shared/icons/dashboard/orc.svg";
import type { FC, PropsWithChildren } from "react";
import { Button } from "@/shared/primitives/button";

import Community from "@/shared/icons/dashboard/community.svg";
import Docs from "@/shared/icons/dashboard/docs.svg";
import Cases from "@/shared/icons/dashboard/cases.svg";
import Requirements from "@/shared/icons/dashboard/requirements.svg";
import Security from "@/shared/icons/dashboard/security.svg";
import Tools from "@/shared/icons/dashboard/tools.svg";
import Roadmap from "@/shared/icons/dashboard/roadmap.svg";

interface CardProps {
  title: string;
  description: string;
  icon: React.FC;
}

const Card: FC<PropsWithChildren> = ({ children }) => (
  <div className="rounded-[34px] hover:ring-2 transition-all  min-h-[260px] hover:ring-primary border border-border bg-background p-6 flex flex-col gap-3.5">
    {children}
  </div>
);

interface CardHeaderProps {
  icon: React.FC;
  title: string;
}

const CardHeader: FC<CardHeaderProps> = ({ title, ...props }) => (
  <div className="flex gap-2.5 items-center [&>svg]:shrink-0">
    <props.icon />
    <h2 className="text-2xl font-bold">{title}</h2>
  </div>
);

const CardDescription: FC<{ children: string }> = ({ children }) => (
  <p className="text-muted-foreground max-w-80 text-sm">{children}</p>
);

const FeatureCard: FC<CardProps> = ({ title, description, ...props }) => (
  <Card>
    <CardHeader title={title} {...props} />

    <CardDescription>{description}</CardDescription>

    <Button size="lg" variant="outline" className="mt-auto">
      Getting started
    </Button>
  </Card>
);

const features = [
  {
    title: "Python Automation",
    description:
      "Build your Python scripts using any framework and orchestrate them with our orchestration tool.",
    icon: PythonAutomation,
  },

  {
    title: "Low-code Automation",
    description:
      "Explore our Low-code solution to develop and orchestrate your bots.",
    icon: Code,
  },

  {
    title: "Agent (Bot Runner)",
    description:
      "Use our bot runner application to execute Python or Low-code projects on user PC or virtual machine seamlessly with intelligent automation.",
    icon: Bot,
  },

  {
    title: "Orchestrator",
    description:
      "Build your Python scripts using any framework and orchestrate them with our orchestration tool.",
    icon: Orc,
  },
];

const knowledgeCenter = {
  title: "Knowledge Center",
  icon: Code,
  description: "Learn more to start and scale your automation smoothly.",

  items: [
    {
      title: "Community and Forum",
      icon: Community,
      url: "/",
    },
    {
      title: "Documentation",
      icon: Docs,
      url: "/",
    },
    {
      title: "Use cases",
      icon: Cases,
      url: "/",
    },
    {
      title: "Requirements",
      icon: Requirements,
      url: "/",
    },
    {
      title: "Security",
      icon: Security,
      url: "/",
    },
    {
      title: "Alternative tools",
      icon: Tools,
      url: "/",
    },
    {
      title: "Roadmap",
      icon: Roadmap,
      url: "/",
    },
  ],
};

const Page = () => {
  return (
    <div className="md:p-10 p-4 transition-all">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Home</h1>
        <p className="text-muted-foreground text-sm">
          Begin your Python RPA adventure here. Explore our product and discover
          the new features we&apos;re continuously developing for you.
        </p>
      </div>

      <section className="mt-7 grid gap-5 grid-cols-auto-fill">
        {features.map((feature) => (
          <FeatureCard {...feature} key={feature.title} />
        ))}
      </section>

      <section className="mt-4">
        <div className="rounded-[34px] border border-border bg-background p-6 flex flex-col gap-3.5">
          <CardHeader
            title={knowledgeCenter.title}
            icon={knowledgeCenter.icon}
          />
          <p className="text-muted-foreground text-sm">
            {knowledgeCenter.description}
          </p>

          <div className="grid grid-cols-auto-fill gap-5 w-full transition-all">
            {knowledgeCenter.items.map((item) => (
              <div
                className="px-8 py-5 transition-all bg-primary-foreground rounded-3xl hover:ring-2 hover:ring-primary flex flex-col gap-10"
                key={item.title}
              >
                <div className="flex items-center gap-4 [&>svg]:shrink-0 [&>svg]:ml-auto">
                  <h3 className="text-[28px] leading-8 text-ellipsis overflow-hidden font-bold">
                    {item.title}
                  </h3>

                  <item.icon />
                </div>

                <Button size="lg" variant="outline">
                  Learn more
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
