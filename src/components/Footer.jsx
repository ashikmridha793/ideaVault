import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 border-t border-slate-700 pt-12 pb-6 mt-10">
      <div className="w-11/12 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link
              href="/"
              className="md:text-3xl text-2xl font-bold bg-linear-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text tracking-tighter"
            >
              IdeaVault
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-3">
              A community platform to share startup ideas, gather feedback, and discover trending innovation.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ideas" className="text-slate-400 hover:text-indigo-400 transition">
                  Explore Ideas
                </Link>
              </li>
              <li>
                <Link href="/ideas" className="text-slate-400 hover:text-indigo-400 transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/" className="text-slate-400 hover:text-indigo-400 transition">
                  Trending on Home
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Email: support@ideavault.app</li>
              <li>Phone: +880 1XXX-XXXXXX</li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Social
            </h3>
            <div className="space-y-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700 transition"
              >
                <FaXTwitter /> X (Twitter)
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700 transition"
              >
                <FaLinkedin /> LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-700 transition"
              >
                <FaGithub /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-slate-500 gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} IdeaVault. All rights reserved.</p>
          <div className="flex gap-4 text-sm">
            <Link href="/Privacy" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/Terms" className="hover:text-slate-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
