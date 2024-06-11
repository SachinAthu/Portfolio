import Link from 'next/link';

type FillUpLinkProps = {
  children: React.ReactNode;
  href: string;
  target?: string;
};

export default function FillUpLink({ children, href, target = '_self' }: FillUpLinkProps) {
  return (
    <Link href={href} target={target} className="block rounded-xl bg-primary px-4 py-2 text-white">
      {children}
    </Link>
  );
}
