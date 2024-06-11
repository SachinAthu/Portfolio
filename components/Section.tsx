export default function Section({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <section id={id} className="h-[100vh]">
      {children}
    </section>
  );
}
