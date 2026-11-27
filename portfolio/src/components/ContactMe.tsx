import Link from "next/link";
import { useT } from "../i18n";
import { EmailIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from "./icons";

const CONTACTS = [
  {
    href: "https://github.com/kristinetuazon",
    Icon: GitHubIcon,
    label: "@kristinetuazon",
    extra: "mt-10 lowercase",
  },
  {
    href: "https://www.linkedin.com/in/kristinejanetuazon/",
    Icon: LinkedInIcon,
    label: "@kristinejanetuazon",
  },
  { href: "mailto:kristine.jane.tuazon@gmail.com", Icon: EmailIcon, label: "email" },
  {
    href: "https://www.instagram.com/kristinetuazon/",
    Icon: InstagramIcon,
    label: "@kristinetuazon",
  },
];

const ContactMe = () => {
  const t = useT();
  return (
    <>
      <p className="overflow-hidden font-audreyNormal text-4xl uppercase text-white">
        {t.contact.title}
      </p>
      <p className="overflow-hidden text-center font-audreyNormal text-3xl uppercase text-white">
        {t.contact.sub}
      </p>
      {CONTACTS.map(({ href, Icon, label, extra }) => (
        <Link
          key={href}
          href={href}
          className={`${extra ?? "mt-5"} font-bodyRegular text-xl text-white`}
        >
          <Icon /> {label}
        </Link>
      ))}
    </>
  );
};

export default ContactMe;
