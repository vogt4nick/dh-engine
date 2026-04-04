import ActionRoller from "./ActionRoller";
import Credits from "./Credits";
import DualityDiceRoller from "./DualityDiceRoller";
import Layout from "./Layout";

export default function App() {
  const path = globalThis.location.pathname;

  if (path === "/credits") {
    return (
      <Layout>
        <Credits />
      </Layout>
    );
  }

  if (path === "/ActionRoller") {
    return (
      <Layout>
        <ActionRoller />
      </Layout>
    );
  }

  if (path === "/DualityDiceRoller") {
    return (
      <Layout>
        <DualityDiceRoller />
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
          src="/daggerheart-compatible.svg"
          alt="Daggerheart Compatible"
          className="w-64"
        />
        <ul className="flex flex-col items-center gap-3 text-base">
          <li>
            <a href="/ActionRoller" className="text-hope hover:underline">
              Action Roll
            </a>
          </li>
          <li>
            <a href="/DualityDiceRoller" className="text-hope hover:underline">
              Roll Duality Dice
            </a>
          </li>
        </ul>
        <a
          href="/credits"
          className="text-xs text-slate-500 hover:underline mt-auto"
        >
          Credits
        </a>
      </div>
    </Layout>
  );
}
