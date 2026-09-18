import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sendInquiry } from "../api/client";
import OrnamentDivider from "../components/OrnamentDivider";
import PageTransition from "../components/PageTransition";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const propertySlug = searchParams.get("property") || "";

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status === "error") setStatus("idle"); // reset error state on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const payload = {
        ...form,
        // Send the slug if the user arrived from a property page.
        // Backend will resolve it to the actual Property.
        ...(propertySlug ? { property_slug: propertySlug } : {}),
      };
      await sendInquiry(payload);
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
  };

  // ----- SUCCESS STATE -----
  if (status === "sent") {
    return (
      <PageTransition>
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <OrnamentDivider className="mx-auto" />

        <span className="mt-8 block eyebrow">RECEIVED</span>
        <h1 className="mt-4 font-display text-4xl text-gold">
          Your Message Has Been Delivered
        </h1>

        <p className="mt-6 font-body text-lg leading-relaxed text-parchment/70">
          Thank you. Someone from the family will respond within one business
          day{propertySlug && (
            <>
              {" "}
              regarding <span className="text-gold">{propertySlug}</span>
            </>
          )}.
        </p>

        <OrnamentDivider className="mx-auto mt-8" />

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/properties" className="btn-primary">
            Browse More Properties
          </a>
          <button onClick={handleReset} className="btn-ghost">
            Send Another Message
          </button>
        </div>
      </div>
      </PageTransition>
    );
  }

  // ----- FORM STATE (idle / sending / error) -----
  return (
    <PageTransition>
    <div className="mx-auto max-w-2xl px-6 py-20">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <span className="eyebrow">GET IN TOUCH</span>
        <h1 className="font-display text-4xl text-parchment">Contact the Estate Office</h1>
        <OrnamentDivider />
        {propertySlug && (
          <p className="font-body text-sm text-parchment/60">
            Regarding: <span className="text-gold">{propertySlug}</span>
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="frame space-y-5 p-8">
        <div>
          <label className="mb-1 block font-display text-xs tracking-wider2 text-gold">NAME</label>
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gold/30 bg-transparent px-4 py-2 font-body text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-display text-xs tracking-wider2 text-gold">EMAIL</label>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gold/30 bg-transparent px-4 py-2 font-body text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-display text-xs tracking-wider2 text-gold">
            PHONE (OPTIONAL)
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gold/30 bg-transparent px-4 py-2 font-body text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block font-display text-xs tracking-wider2 text-gold">MESSAGE</label>
          <textarea
            required
            rows={5}
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gold/30 bg-transparent px-4 py-2 font-body text-parchment focus:border-gold focus:outline-none"
          />
        </div>

        <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>

        {status === "error" && (
          <p className="text-center font-body text-sm text-burgundy-light">
            Something went wrong — check that the Django server is running on
            port 8000.
          </p>
        )}
      </form>
    </div>
    </PageTransition>
  );
}