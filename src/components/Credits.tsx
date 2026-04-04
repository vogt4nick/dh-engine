export default function Credits() {
  return (
    <div className="flex flex-col items-center gap-8 px-6 py-12 min-h-screen text-slate-100">
      <h1 className="font-display text-4xl font-bold tracking-wide text-slate-100">
        Credits
      </h1>
      <div className="max-w-prose text-sm text-slate-300 flex flex-col gap-4">
        <p>
          This product includes materials from the Daggerheart System Reference
          Document 1.0, © Critical Role, LLC. under the terms of the Darrington
          Press Community Gaming (DPCGL) License. More information can be found
          at{" "}
          <a
            href="https://www.daggerheart.com/"
            className="text-hope hover:underline"
          >
            daggerheart.com
          </a>
          . There are minor modifications to format and structure by{" "}
          <a
            href="https://github.com/seansbox/daggerheart-srd"
            className="text-hope hover:underline"
          >
            seansbox/daggerheart-srd
          </a>
          .
        </p>
        <p>
          Daggerheart™ and all related marks are trademarks of Critical Role,
          LLC. and are used with permission. This project is not affiliated
          with, endorsed by, or sponsored by Critical Role, LLC. or Darrington
          Press.
        </p>
        <p>Application source code © Nick Vogt. All rights reserved.</p>
      </div>
      <a href="/" className="text-hope hover:underline text-sm">
        ← Back
      </a>
    </div>
  );
}
