export default function PageTitle({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <section className="container" style={{ paddingTop: "calc(var(--header-h) + 72px)", paddingBottom: 56 }}>
      <div className="mono red fade-up">{kicker}</div>
      <h1 className="display fade-up" style={{ fontSize: "clamp(64px, 14vw, 180px)", marginTop: 16, ["--d" as string]: "80ms" }}>
        {title}
      </h1>
      {intro ? (
        <p className="dim fade-up" style={{ maxWidth: 560, marginTop: 24, fontSize: 17, ["--d" as string]: "160ms" }}>
          {intro}
        </p>
      ) : null}
    </section>
  );
}
