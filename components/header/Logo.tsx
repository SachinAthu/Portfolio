import { useLayoutContext } from "@/context/LayoutContext";
import { cn } from "@/lib/common";
import { PageLink } from "..";

export default function Logo() {
  const { isNavOpen } = useLayoutContext();

  return (
    <PageLink
      href={"/"}
      className={cn(
        "flex items-center text-xl font-bold transition-colors duration-500",
        isNavOpen ? "text-zinc-200" : "text-gray-900 dark:text-zinc-200"
      )}
      short>
      <span className="hidden sm:block">SachinAthu</span>
      <span className="sm:hidden">Sachin</span>
      <span className="mx-1 animate-logo dark:animate-logo-d">_</span>
      <span>;</span>
    </PageLink>
  );
}
