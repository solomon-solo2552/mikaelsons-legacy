import { Link } from "react-router-dom";
import OrnamentDivider from "../components/OrnamentDivider";
import PageTransition from "../components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <OrnamentDivider />

        <span className="mt-8 eyebrow">WANDERER'S MISFORTUNE</span>

        <h1 className="mt-4 font-display text-7xl text-gold">404</h1>

        <h2 className="mt-6 font-display text-3xl text-parchment">
          This Corridor Leads Nowhere
        </h2>

        <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-parchment/70">
          The estate you seek has been deeded, renamed, or perhaps never
          existed at all. Either way, no one lives here now.
        </p>

        <OrnamentDivider className="mt-10" />

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link to="/" className="btn-primary">
            Return to the Estate
          </Link>
          <Link to="/properties" className="btn-ghost">
            View the Portfolio
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}