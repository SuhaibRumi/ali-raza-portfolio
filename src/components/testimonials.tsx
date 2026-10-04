import Reveal from "./reveal";

const testimonials = [
  {
    quote:
      "Ali completely transformed our Instagram strategy. Within just 3 months our engagement doubled, and we started getting direct orders through DMs.",
    name: "Ahmed Khan",
    business: "Founder, Urban Threads",
  },
  {
    quote:
      "From the content calendar to reels and captions, everything was handled professionally. Our Facebook and Instagram reach has grown many times over.",
    name: "Sara Malik",
    business: "Marketing Lead, Bloom Cafe",
  },
  {
    quote:
      "The return on our social media ads has been outstanding. Ali delivers on time and shares a clear report every week. Highly recommended.",
    name: "Hamza Raza",
    business: "Owner, FitZone Gym",
  },
];

export default function Testimonials() {
  return (
    <section
      className="tint-section section-pad"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-wide">
        <Reveal>
          <span className="eyebrow">Client feedback</span>
          <h2 id="testimonials-heading" className="display section-heading">
            What clients say.
          </h2>
        </Reveal>
        <div className="testimonial-grid" style={{ marginTop: "52px" }}>
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={`reveal-delay-${index}`}>
              <article
                className="testimonial-card"
                data-testid={`card-testimonial-${index + 1}`}
              >
                <div>
                  <div className="quote-mark" aria-hidden="true">
                    “
                  </div>
                  <blockquote>{item.quote}</blockquote>
                </div>
                <div className="testimonial-author">
                  <span className="author-avatar" aria-hidden="true">
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    {item.name}
                    <br />
                    <small>{item.business}</small>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}