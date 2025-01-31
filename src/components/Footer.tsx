interface FooterLink {
  name: string;
  href: string;
  id?: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const Footer = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "auto",
        block: "start",
      });
    }
  };

  const footerLinks: Record<string, FooterSection> = {
    product: {
      title: "Product",
      links: [
        { name: "Features", href: "#features", id: "features" },
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "API Status", href: "#" },
      ],
    },
    socials: {
      title: "Socials",
      links: [
        { name: "Twitter", href: "https://twitter.com/smartscout" },
        { name: "LinkedIn", href: "https://linkedin.com/company/smartscout" },
        { name: "Instagram", href: "https://instagram.com/smartscout" },
        { name: "GitHub", href: "https://github.com/smartscout" },
      ],
    },
  };

  const legalLinks: FooterLink[] = [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Licenses", href: "#" },
  ];

  return (
    <footer className="bg-[#0a0a0a]/80 backdrop-blur-xl mt-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text mb-4">
              Smart Scout
            </h3>
            <p className="text-gray-400 mb-4 max-w-sm">
              Empowering authenticity verification through advanced AI technology.
            </p>
          </div>

          {/* Links sections */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={(e) => (link.id ? handleSmoothScroll(e, link.id) : undefined)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Smart Scout. All rights reserved.
          </p>
          <ul className="flex flex-wrap justify-center md:justify-end gap-6">
            {legalLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-gray-400 text-sm">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
