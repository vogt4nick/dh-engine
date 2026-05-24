export default function FormField({
  label,
  ...inputProperties
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5 text-xs font-bold tracking-[0.1em] uppercase text-slate-500">
      {label}
      <input
        className="px-3 py-2.5 text-base bg-slate-800 text-slate-100 border border-slate-700 rounded-lg w-24 focus:outline-none focus:border-slate-500"
        {...inputProperties}
      />
    </label>
  );
}
