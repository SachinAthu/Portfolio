export default function Section({ children, id }: { children: React.ReactNode; id: string }) {
  return <section id={id}>{children}</section>;
}
