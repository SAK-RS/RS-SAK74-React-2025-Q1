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
    <>
      <section>{children}</section>
      <div className="flex justify-between">
        <section className="w-full">{summary}</section>
        <section>{detail}</section>
      </div>
    </>
  );
}
