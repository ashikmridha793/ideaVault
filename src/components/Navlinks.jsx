import Link from "next/link";
import { usePathname } from "next/navigation";

const Navlinks = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={`font-medium transition-colors ${
        isActive
          ? "text-indigo-600 dark:text-indigo-300"
          : "text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-300"
      }`}
    >
      {children}
    </Link>
  );
};

export default Navlinks;
