import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import profileImage from "./Profile.png";
import Restaurant from "../src/img/restaurant.svg";
import fashion from "../src/img/fashion.png";
import tech from "../src/img/tech.png";
import Testimonials from "../src/components/testimonials";
import Reveal from "./components/reveal";

import {
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  ChevronRight,
  Facebook,
  Gauge,
  Instagram,
  Linkedin,
  Menu,
  PenLine,
  Phone,
  Send,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";


const queryClient = new QueryClient();

const socials = {
  instagram: "https://www.instagram.com/ali.raza.404",
  linkedin: "https://linkedin.com/in/ali-raza-136691431",
  facebook: "https://www.facebook.com/profile.php?id=61592600831972",
  whatsapp: "https://wa.me/923176635635",
  gmail: "mailto:alirazadigital1@gmail.com",
};

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Services", "services"],
  ["Work", "work"],
  ["Process", "process"],
  ["Contact", "contact"],
] as const;

const services: {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    number: "01",
    title: "Social Media Management",
    description:
      "Manage and improve your social presence with consistent content, planning, publishing, engagement, and brand communication.",
    icon: PenLine,
  },
  {
    number: "02",
    title: "Facebook & Instagram Ads",
    description:
      "Create targeted Meta advertising campaigns designed to reach relevant audiences and support business goals.",
    icon: Target,
  },
  {
    number: "03",
    title: "LinkedIn Marketing",
    description:
      "Build a professional LinkedIn presence through content, audience engagement, and strategic positioning.",
    icon: Linkedin,
  },
  {
    number: "04",
    title: "Social Media Growth",
    description:
      "Develop practical strategies to increase visibility, engagement, audience reach, and brand awareness.",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "Local Business Marketing",
    description:
      "Help local businesses strengthen their online presence and connect with potential customers in their target market.",
    icon: Users,
  },
  {
    number: "06",
    title: "Lead Generation",
    description:
      "Use social media campaigns and targeted advertising to help businesses attract potential customers and generate inquiries.",
    icon: Send,
  },
];

const platforms: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Facebook",
    description:
      "Social presence, content, audience engagement, and advertising.",
    icon: Facebook,
  },
  {
    title: "Instagram",
    description:
      "Content strategy, audience growth, engagement, and Instagram advertising.",
    icon: Instagram,
  },
  {
    title: "Meta Ads",
    description:
      "Campaign creation, audience targeting, optimization, and performance monitoring.",
    icon: BarChart3,
  },
  {
    title: "LinkedIn",
    description:
      "Professional content, business presence, networking, and audience growth.",
    icon: Linkedin,
  },
];

const projects = [
  {
    label: "project 01",
    name: "Tech Startup",
    objective: "LinkedIn Thought Leadership Campaign",
    services:
      "Positioned a B2B SaaS startup's founder as an industry thought leader through strategic LinkedIn content, resulting in 4,200 new followers, 2.3M impressions in 90 days, and 15 qualified enterprise leads directly from social engagement.",
    platform: "LinkedIn",
    img: tech,
  },
  {
    label: "project 02",
    name: "Local Restaurant Chain",
    objective: " Building Community Connection",
    services:
      "Created behind-the-scenes content showcasing family recipes and staff stories, launched weekly specials promoted through Instagram Stories, and partnered with local food bloggers for authentic reviews",
    platform: "Facebook / Instagram",
    img: Restaurant,
  },
  {
    label: "project 03",
    name: "Eco-Friendly Fashion Brand",
    objective: "Growth In 6 Months",
    services:
      "Developed a cohesive visual identity, launched user-generated content campaigns, and implemented strategic influencer partnerships focusing on micro-influencers aligned with sustainability values.",
    platform: " Instagram",
    img: fashion,
  },
];

const processSteps = [
  {
    number: "01",
    title: "Understand",
    copy: "Understand the business, target audience, current online presence, and goals.",
  },
  {
    number: "02",
    title: "Plan",
    copy: "Create a practical social media and advertising strategy.",
  },
  {
    number: "03",
    title: "Execute",
    copy: "Manage content, launch campaigns, and reach the target audience.",
  },
  {
    number: "04",
    title: "Optimize",
    copy: "Review performance, identify opportunities, and continuously improve the strategy.",
  },
];

const benefits: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "Business-Focused",
    copy: "Strategies built around actual business objectives.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Targeted Advertising",
    copy: "Focus on reaching audiences relevant to the business.",
    icon: Target,
  },
  {
    title: "Practical Experience",
    copy: "1+ year of hands-on social media and advertising experience.",
    icon: Gauge,
  },
  {
    title: "Personal Attention",
    copy: "Work directly with the person managing the strategy and campaigns.",
    icon: Users,
  },
  {
    title: "Local Business Focus",
    copy: "Understanding the challenges local businesses face when building an online presence.",
    icon: ShieldCheck,
  },
];

function AnchorLink({
  label,
  id,
  onNavigate,
  className = "",
}: {
  label: string;
  id: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={onNavigate}
      data-testid={`link-nav-${id}`}
    >
      {label}
    </a>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      className="social-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      data-testid={`link-social-${label.toLowerCase()}`}
    >
      {children}
    </a>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav-shell ${scrolled ? "scrolled" : ""}`}>
      <div className="container-wide">
        <div className="nav-inner">
          <a
            className="brand"
            href="#home"
            onClick={closeMenu}
            data-testid="link-brand-home"
          >
            <span className="brand-mark" aria-hidden="true">
              AR
            </span>
            <span className="brand-copy">
              <span className="brand-name">Ali Raza</span>
              <span className="brand-role">Social Media Manager</span>
            </span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            {navItems.map(([label, id]) => (
              <AnchorLink key={id} label={label} id={id} />
            ))}
          </nav>
          <div className="nav-socials" aria-label="Social links">
            <a
              className="nav-social"
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              data-testid="link-navbar-instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              className="nav-social"
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-testid="link-navbar-linkedin"
            >
              <Linkedin size={14} />
            </a>
          </div>
          <a
            className="nav-talk"
            href={socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            data-testid="link-navbar-whatsapp"
          >
            Let&apos;s Talk <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, id]) => (
              <AnchorLink
                key={id}
                label={label}
                id={id}
                onNavigate={closeMenu}
              />
            ))}
            <a
              className="mobile-cta"
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              data-testid="link-mobile-whatsapp"
            >
              Let&apos;s Talk <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="container-wide hero-grid">
        <Reveal>
          <span className="eyebrow">
            Social Media Manager · Paid Ads Specialist
          </span>
          <h1 id="hero-heading" className="display">
            I help local businesses grow through <em>social media</em> &amp;
            paid ads.
          </h1>
          <p className="hero-copy">
            I help local businesses build a stronger online presence, reach the
            right audience, and turn social media into a growth channel through
            strategic content and targeted advertising.
          </p>
          <div className="hero-actions">
            <a
              className="button-primary"
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="link-hero-whatsapp"
            >
              <Phone size={15} aria-hidden="true" />
              Call Now{" "}
            </a>
            <AnchorLink
              label="View My Work"
              id="work"
              className="button-secondary"
            />
          </div>
          <div className="hero-proof" aria-label="Professional highlights">
            <div className="proof-item">
              <span className="proof-value">1+ Year</span>
              <span className="proof-label">Experience</span>
            </div>
            <div className="proof-item">
              <span className="proof-value">Meta Ads</span>
              <span className="proof-label">Campaigns</span>
            </div>
            <div className="proof-item">
              <span className="proof-value">Instagram</span>
              <span className="proof-label">Content &amp; Ads</span>
            </div>
            <div className="proof-item">
              <span className="proof-value">LinkedIn</span>
              <span className="proof-label">Marketing</span>
            </div>
          </div>
        </Reveal>
        <Reveal className="profile-stage" delay="reveal-delay-2">
          <div className="profile-orbit" aria-hidden="true" />
          <div className="profile-card">
            <img src={profileImage} alt="Muhammad Ali Raza" />
          </div>
          <div className="float-card float-one">
            <BarChart3 size={16} aria-hidden="true" /> Meta Ads
          </div>
          <div className="float-card float-two">
            <Instagram size={16} aria-hidden="true" /> Instagram
          </div>
          <div className="float-card float-three">
            <Linkedin size={16} aria-hidden="true" /> LinkedIn
          </div>
          <div className="float-card float-four">
            <TrendingUp size={16} aria-hidden="true" /> Social Growth
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Areas of expertise">
      <div className="container-wide trust-inner">
        <div className="trust-intro">
          <strong>Practical marketing support</strong> for businesses building
          their next chapter online.
        </div>
        {[
          "Meta Ads",
          "Content Strategy",
          "Audience Targeting",
          "Lead Generation",
        ].map((item) => (
          <div className="trust-item" key={item}>
            <span className="trust-dot" aria-hidden="true" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  const skills = [
    "Meta Ads",
    "Facebook Ads",
    "Instagram Ads",
    "LinkedIn",
    "Social Media",
    "Local Business Growth",
    "Lead Generation",
    "Content Strategy",
  ];
  return (
    <section
      className="light-section section-pad"
      id="about"
      aria-labelledby="about-heading"
    >
      <div className="container-wide">
        <div className="section-top">
          <Reveal>
            <span className="eyebrow">A little about the work</span>
            <h2 id="about-heading" className="display section-heading">
              Helping businesses build a stronger digital presence.
            </h2>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <p className="section-copy">
              Clear thinking, useful content, and advertising that begins with
              understanding the business — not with chasing vanity metrics.
            </p>
          </Reveal>
        </div>
        <div className="about-grid">
          <Reveal>
            <div className="about-aside">
              <div className="about-number">1+</div>
              <p>
                Years of practical experience helping local businesses show up
                with more clarity and consistency online.
              </p>
            </div>
          </Reveal>
          <Reveal className="about-copy" delay="reveal-delay-1">
            <p>
              I'm Muhammad Ali Raza, a Social Media Manager with 1+ year of
              hands-on experience helping local businesses improve their social
              media presence and reach the audiences that actually matter.
            </p>
            <p>
              I work with tech, outfits, restaurants,clinics, fast food and
              service businesses to build a social presence that does more than
              look good it brings in real convserion.
            </p>
            <div className="skill-list" aria-label="Skills">
              {skills.map((skill) => (
                <span className="skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section
      className="tint-section section-pad"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">Ways I can help</span>
          <h2 id="services-heading" className="display section-heading">
            What I can do for your business.
          </h2>
        </Reveal>
        <div className="service-grid" style={{ marginTop: "52px" }}>
          {services.map(({ number, title, description, icon: Icon }, index) => (
            <Reveal
              key={number}
              delay={`reveal-delay-${Math.min(index % 4, 3)}`}
            >
              <article
                className="service-card"
                data-testid={`card-service-${number}`}
              >
                <div className="card-topline">
                  <span className="card-number">{number}</span>
                  <span className="icon-box">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  return (
    <section
      className="light-section section-pad"
      id="platforms"
      aria-labelledby="platforms-heading"
    >
      <div className="container-wide">
        <div className="section-top">
          <Reveal>
            <span className="eyebrow">Where the work happens</span>
            <h2 id="platforms-heading" className="display section-heading">
              Platforms I work with.
            </h2>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <p className="section-copy">
              Each platform has a different job. The strategy should make those
              roles work together, rather than copy-pasting the same message
              everywhere.
            </p>
          </Reveal>
        </div>
        <div className="platform-grid">
          {platforms.map(({ title, description, icon: Icon }, index) => (
            <Reveal key={title} delay={`reveal-delay-${index}`}>
              <article
                className="platform-card"
                data-testid={`card-platform-${title.toLowerCase().replace(" ", "-")}`}
              >
                <span className="platform-icon">
                  <Icon size={18} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work({ onSelect }: { onSelect: (index: number) => void }) {
  return (
    <section
      className="work-section section-pad"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="container-wide">
        <div className="section-top">
          <Reveal>
            <h2 id="work-heading" className="display section-heading">
              Selected work, ready for real case studies.
            </h2>
          </Reveal>
          <Reveal delay="reveal-delay-1">
            <p className="section-copy">
              Actual project details will make this section stronger. These
              placeholders keep the structure honest and easy to replace when
              the work is ready to share.
            </p>
          </Reveal>
        </div>
        <div className="work-grid">
          {projects.map((project, index) => (
            <Reveal
              key={project.label}
              className="project-card"
              delay={`reveal-delay-${index}`}
            >
              <article>
                <div className="project-visual">
                  <img src={project.img} alt={project.name} />
                </div>
                <div className="project-body">
                  <span className="project-tag">{project.label}</span>
                  <h3>{project.name}</h3>
                  <div className="project-summary">
                    <span>{project.objective}</span>
                    <span className="project-platform">{project.platform}</span>
                  </div>
                  <button
                    className="project"
                    type="button"
                    onClick={() => onSelect(index)}
                    data-testid={`button-case-study-${index + 1}`}
                  >
                    View Case Study{" "}
                    <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Results() {
  const cards = [
    ["1+ Year", "Practical Experience"],
    ["Meta", "Ads & Campaign Management"],
    ["3 Platforms", "Facebook · Instagram · LinkedIn"],
    ["Local Businesses", "Growth & Social Presence"],
  ];
  return (
    <section
      className="light-section section-pad"
      id="results"
      aria-labelledby="results-heading"
    >
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">Experience, without inflated numbers</span>
          <h2 id="results-heading" className="display section-heading">
            Focused on real business growth.
          </h2>
        </Reveal>
        <div className="results-grid" style={{ marginTop: "52px" }}>
          {cards.map(([value, label], index) => (
            <Reveal key={value} delay={`reveal-delay-${index}`}>
              <article className="result-card">
                <div className="result-value">{value}</div>
                <div className="result-label">{label}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section
      className="tint-section section-pad"
      id="process"
      aria-labelledby="process-heading"
    >
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">A clear working rhythm</span>
          <h2 id="process-heading" className="display section-heading">
            My approach.
          </h2>
        </Reveal>
        <div className="process-wrap" style={{ marginTop: "57px" }}>
          <div className="process-line" aria-hidden="true" />
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal key={step.number} delay={`reveal-delay-${index}`}>
                <article className="process-step">
                  <div className="process-number">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyWork() {
  return (
    <section
      className="light-section section-pad"
      id="why"
      aria-labelledby="why-heading"
    >
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">The difference is in the details</span>
          <h2 id="why-heading" className="display section-heading">
            Why businesses work with me.
          </h2>
        </Reveal>
        <div className="benefit-grid" style={{ marginTop: "52px" }}>
          {benefits.map(({ title, copy, icon: Icon }, index) => (
            <Reveal key={title} delay={`reveal-delay-${index}`}>
              <article className="benefit-card">
                <Icon className="benefit-icon" size={20} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

<Testimonials />
function CTA() {
  return (
    <section className="cta-band section-pad" aria-labelledby="cta-heading">
      <div className="container-wide cta-inner">
        <Reveal>
          <span className="eyebrow">Start with a conversation</span>
          <h2 id="cta-heading" className="display">
            Ready to grow your business online?
          </h2>
          <p className="section-copy">
            Let&apos;s build a stronger social presence, reach the right
            audience, and turn social media into an opportunity for your
            business.
          </p>
        </Reveal>
        <Reveal className="cta-actions" delay="reveal-delay-1">
          <a
            className="button-primary"
            href={socials.whatsapp}
            target="_blank"
            rel="noreferrer"
            data-testid="link-cta-whatsapp"
          >
            Chat on WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            className="button-secondary"
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            data-testid="link-cta-linkedin"
          >
            Connect on LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const updateField = (field: keyof typeof form, value: string) => {
    setSubmitted(false);
    setForm((current) => ({ ...current, [field]: value }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className="contact-section section-pad"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="container-wide contact-grid">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 id="contact-heading" className="display section-heading">
            Let&apos;s talk about your business.
          </h2>
          <p className="section-copy">
            Have a business that needs a stronger social media presence?
            Let&apos;s start a conversation.
          </p>
          <div className="contact-options">
            <a
              className="contact-option"
              href={socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="link-contact-whatsapp"
            >
              <span className="contact-icon">
                <WhatsAppIcon size={17} />
              </span>
              <span className="contact-text">
                <span>WhatsApp</span>
                <strong>03176635635</strong>
              </span>
            </a>
            <a
              className="contact-option"
              href={socials.gmail}
              target="_blank"
              rel="noreferrer"
              data-testid="link-contact-gmail"
            >
              <span className="contact-icon">
                <Send size={17} aria-hidden="true" />
              </span>
              <span className="contact-text">
                <span>Email</span>
                <strong>alirazadigital1@gmail.com</strong>
              </span>
            </a>
          </div>
        </Reveal>
        <Reveal delay="reveal-delay-1">
          <form
            className="contact-form"
            onSubmit={handleSubmit}
            aria-label="Contact Muhammad Ali Raza"
          >
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                data-testid="input-contact-name"
              />
            </div>
            <div className="field">
              <label htmlFor="business">Business Name</label>
              <input
                id="business"
                name="business"
                value={form.business}
                onChange={(event) =>
                  updateField("business", event.target.value)
                }
                data-testid="input-contact-business"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                data-testid="input-contact-email"
              />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone / WhatsApp</label>
              <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                data-testid="input-contact-phone"
              />
            </div>
            <div className="field full">
              <label htmlFor="service">Service Needed</label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={(event) => updateField("service", event.target.value)}
                data-testid="select-contact-service"
              >
                <option value="">Select a service</option>
                <option>Social Media Management</option>
                <option>Facebook &amp; Instagram Ads</option>
                <option>LinkedIn Marketing</option>
                <option>Lead Generation</option>
                <option>Something else</option>
              </select>
            </div>
            <div className="field full">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                data-testid="textarea-contact-message"
              />
            </div>
            <div className="form-footer">
              <span
                className={submitted ? "success-message" : "form-note"}
                role={submitted ? "status" : undefined}
                data-testid={
                  submitted ? "status-form-success" : "text-form-note"
                }
              >
                {submitted
                  ? "Thanks — your message is ready for a follow-up conversation."
                  : "No hard sell. Just a clear first conversation."}
              </span>
              <button
                className="button-primary"
                type="submit"
                data-testid="button-contact-submit"
              >
                {submitted ? "Message Ready" : "Send Message"}{" "}
                <Send size={14} aria-hidden="true" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer-grid">
          <div>
            <a className="brand" href="#home" data-testid="link-footer-brand">
              <span className="brand-mark" aria-hidden="true">
                AR
              </span>
              <span className="brand-copy">
                <span className="brand-name">Muhammad Ali Raza</span>
                <span className="brand-role">Social Media Manager</span>
              </span>
            </a>
            <p className="footer-desc">
              Helping local businesses build a stronger social presence and
              reach more customers through strategic social media and paid
              advertising.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <nav className="footer-nav" aria-label="Footer navigation">
              {[
                ["Home", "home"],
                ["About", "about"],
                ["Services", "services"],
                ["Work", "work"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                <AnchorLink key={id} label={label} id={id} />
              ))}
            </nav>
          </div>
          <div>
            <h3>Find me online</h3>
            <div className="social-row">
              <SocialIconLink href={socials.instagram} label="Instagram">
                <Instagram size={15} aria-hidden="true" />
              </SocialIconLink>
              <SocialIconLink href={socials.linkedin} label="LinkedIn">
                <Linkedin size={15} aria-hidden="true" />
              </SocialIconLink>
              <SocialIconLink href={socials.facebook} label="Facebook">
                <Facebook size={15} aria-hidden="true" />
              </SocialIconLink>
              <SocialIconLink href={socials.whatsapp} label="WhatsApp">
                <WhatsAppIcon size={15} />
              </SocialIconLink>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Muhammad Ali Raza. All rights reserved.</span>
          <span>
            Social Media Manager | Meta Ads &amp; LinkedIn Growth Specialist
          </span>
        </div>
      </div>
    </footer>
  );
}

function CaseStudyModal({
  project,
  onClose,
}: {
  project: (typeof projects)[number];
  onClose: () => void;
}) {
  return (
    <div className="case-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="case-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-modal-heading"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="case-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close case study"
          data-testid="button-close-case-study"
        >
          <X size={15} />
        </button>
        <h2 id="case-modal-heading" className="display">
          {project.name}
        </h2>
        <div className="case-modal-content">
          <img
            src={project.img}
            alt={project.name}
            className="case-modal-img"
          />
          <div className="case-modal-grid">
            <span>
              <b>Goal</b>
              {project.objective}
            </span>
            <span>
              <b>Services</b>
              {project.services}
            </span>
            <span>
              <b>Platform</b>
              {project.platform}
            </span>
            <span>
              <b>Results</b>[Campaign Results]
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  return (
    <div className="site-shell">
      <a
        href="#main-content"
        className="skip-link"
        data-testid="link-skip-content"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <Platforms />
        <Work onSelect={setSelectedProject} />
        <Results />
        <Process />
        <WhyWork />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <a
        className="whatsapp-float"
        href={socials.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        data-testid="link-floating-whatsapp"
      >
        <WhatsAppIcon size={25} />
      </a>
      {selectedProject !== null && (
        <CaseStudyModal
          project={projects[selectedProject]}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
