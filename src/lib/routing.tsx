import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

const PATH_ALIASES: Record<string, string> = {
  "/faq.html": "/faq",
  "/terms.html": "/terms",
  "/privacy.html": "/privacy",
  "/refunds.html": "/refunds",
  "/feedback.html": "/feedback",
  "/about.html": "/about",
  "/contact.html": "/contact",
  "/fleet.html": "/fleet",
  "/peg.html": "/",
  "/peg": "/",
  "/index.html": "/",
};

export function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  return PATH_ALIASES[path] || path;
}

export function navigate(to: string) {
  const url = new URL(to, window.location.origin);
  if (url.origin !== window.location.origin) {
    window.location.href = to;
    return;
  }

  const next = url.pathname + url.search + url.hash;
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (next !== current) {
    window.history.pushState({}, "", next);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));

  if (url.hash) {
    requestAnimationFrame(() => {
      document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    });
  } else {
    window.scrollTo(0, 0);
  }
}

export function usePath(): string {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const sync = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return path;
}

type LinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
};

export function Link({ href, className, children, onClick }: LinkProps) {
  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return;
    event.preventDefault();
    onClick?.();
    navigate(href);
  };

  return (
    <a href={href} className={className} onClick={handle}>
      {children}
    </a>
  );
}

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const ensure = (name: string, attr: "name" | "property" = "name") => {
      let el = document.head.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      return el;
    };
    ensure("description").content = description;
    ensure("og:title", "property").content = title;
    ensure("og:description", "property").content = description;
  }, [title, description]);
}
