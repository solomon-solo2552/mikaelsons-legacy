import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sendInquiry } from "../api/client";
import OrnamentDivider from "../components/OrnamentDivider";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const propertySlug = searchParams.get("property") || "";

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      // The backend accepts a property PK, not a slug — in this simple
      // version we just send the message along; feel free to look the
      // property up first if you want to link the inquiry to it.
      await sendInquiry(form);
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
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
          <label className="mb-1 block font-display text-xs tracking-wider2 text-gold">PHONE (OPTIONAL)</label>
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

        {status === "sent" && (
          <p className="text-center font-body text-sm text-gold">
            Message received. Someone from the family will be in touch.
          </p>
        )}
        {status === "error" && (
          <p className="text-center font-body text-sm text-burgundy-light">
            Something went wrong — check that the Django server is running on
            port 8000.
          </p>
        )}
      </form>
    </div>
  );
}
