export default function Layout({
  children,
  summary,
  detail,
}: {
  children: React.ReactNode;
  summary: React.ReactNode;
  detail: React.ReactNode;
}) {
  return (
    <section className="">
      {children}
      <div className="flex justify-between">
        {summary}
        {detail}
      </div>
    </section>
  );
}
