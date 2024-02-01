"use client";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function LandingHero() {
  const { theme } = useTheme();

  const getImgBasedOnTheme = () => {
    return theme === "dark"
      ? "https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
      : "https://tailwindui.com/img/component-images/project-app-screenshot.png";
  };

  return (
    <div className="relative isolate overflow-hidden">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="unique-pattern-id"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#unique-pattern-id)"
        />
      </svg>

      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Button variant="outline">
              <span>Just shipped v1.0</span>
              <ChevronRightIcon
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
              />
            </Button>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Build something new and bold
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button>Get started</Button>
            <Button variant="link">
              Learn more <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src={getImgBasedOnTheme()}
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-[76rem] rounded-md bg-white/5 dark:bg-gray-900/5 shadow-2xl ring-1 ring-white/10 dark:ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
