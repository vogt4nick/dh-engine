export default function Button(
  properties: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button
      {...properties}
      className={`px-10 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-100 font-semibold text-base tracking-widest uppercase border border-slate-600 transition-all duration-150 cursor-pointer ${properties.className ?? ""}`}
    />
  );
}
