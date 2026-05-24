import { Link } from "react-router-dom";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const NAV_ROUTES = [
  { path: "/ActionRoller", label: "Action Roll" },
  { path: "/DualityDiceRoller", label: "Roll Duality Dice" },
] as const;

export default function Home() {
  return (
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
            <Link to={r.path} className="text-hope hover:underline">
              {r.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to="/credits"
        className="text-xs text-slate-500 hover:underline mt-auto"
      >
        Credits
      </Link>
    </div>
  );
}
