import { useEffect, useState } from "react";

import ActionRoller from "./ActionRoller";
import Credits from "./Credits";
import DualityDiceRoller from "./DualityDiceRoller";
import Layout from "./Layout";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const ROUTES = [
  { path: "/ActionRoller", component: ActionRoller, label: "Action Roll" },
  {
    path: "/DualityDiceRoller",
    component: DualityDiceRoller,
    label: "Roll Duality Dice",
  },
  { path: "/credits", component: Credits, label: undefined },
] as const;

const NAV_ROUTES = ROUTES.filter((r) => r.label !== undefined);

export default function App() {
  const [hash, setHash] = useState(globalThis.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setHash(globalThis.location.hash);
    };
    globalThis.addEventListener("hashchange", onHashChange);
    return () => {
      globalThis.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  const path = hash.slice(1) || "/";
  const match = ROUTES.find((r) => r.path === path);

  if (match) {
    const Page = match.component;
    return (
      <Layout>
        <Page />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center gap-8 px-6 py-12 min-h-screen text-slate-100">
        <h1 className="font-display text-4xl font-bold tracking-wide text-slate-100">
          DH Engine
        </h1>
        <img
          src={`${base}/daggerheart-compatible.svg`}
          alt="Daggerheart Compatible"
          className="w-64"
        />
        <ul className="flex flex-col items-center gap-3 text-base">
          {NAV_ROUTES.map((r) => (
            <li key={r.path}>
              <a href={`#${r.path}`} className="text-hope hover:underline">
                {r.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#/credits"
          className="text-xs text-slate-500 hover:underline mt-auto"
        >
          Credits
        </a>
      </div>
    </Layout>
  );
}
