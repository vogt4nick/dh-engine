export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
      <footer className="py-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Nick Vogt. All rights reserved.
      </footer>
    </div>
  );
}
