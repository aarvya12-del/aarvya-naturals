import { InstagramIcon, FacebookIcon } from "@/components/icons/SocialIcons";
import { SOCIAL_LINKS } from "@/config/social";

export default function SocialLinks() {
  const links = [
    { href: SOCIAL_LINKS.instagram, Icon: InstagramIcon, label: "Instagram" },
    { href: SOCIAL_LINKS.facebook, Icon: FacebookIcon, label: "Facebook" },
  ].filter((link) => link.href);

  if (links.length === 0) return null;

  return (
    <div className="hidden items-center gap-3 lg:flex">
      {links.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-[#0B3C8C] hover:text-[#0B3C8C]"
        >
          <Icon size={18} className="text-current" />
        </a>
      ))}
    </div>
  );
}
