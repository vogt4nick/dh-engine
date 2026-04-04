export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      <footer className="py-4 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} Nick Vogt. All rights reserved.
      </footer>
    </div>
  );
}
