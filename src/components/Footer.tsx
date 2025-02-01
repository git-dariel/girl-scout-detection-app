import { motion } from "framer-motion";

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
        behavior: "smooth",
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
        { name: "Twitter", href: "#" },
        { name: "LinkedIn", href: "#" },
        { name: "Instagram", href: "#" },
        { name: "GitHub", href: "#" },
      ],
    },
  };

  const legalLinks: FooterLink[] = [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Licenses", href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-[#0a0a0a]/80 backdrop-blur-xl mt-24 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Brand section */}
          <motion.div variants={itemVariants}>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text mb-4"
            >
              Smart Scout
            </motion.h3>
            <motion.p variants={itemVariants} className="text-gray-400 mb-4 max-w-sm">
              Empowering authenticity verification through advanced AI technology.
            </motion.p>
          </motion.div>

          {/* Links sections */}
          {Object.values(footerLinks).map((section) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <motion.li key={link.name} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      onClick={(e) => (link.id ? handleSmoothScroll(e, link.id) : undefined)}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-sm text-center md:text-left"
          >
            © {new Date().getFullYear()} Smart Scout. All rights reserved.
          </motion.p>
          <motion.ul
            variants={itemVariants}
            className="flex flex-wrap justify-center md:justify-end gap-6"
          >
            {legalLinks.map((link) => (
              <motion.li key={link.name} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <a
                  href={link.href}
                  className="text-gray-400 text-sm hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </motion.footer>
  );
};
