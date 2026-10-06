import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../utils/portfolioData';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: null });

    try {
      const endpoint = `${API_URL}/api/contact`;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Unable to send message.');
      }

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '', website: '' });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'Unable to send message. Click direct email below to send instantly!'
      });
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Editorial Section Header in lowercase - 05 / contact */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="font-display text-2xl sm:text-3xl font-bold tracking-wider text-cyan-400">
            05 /
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display lowercase tracking-wider text-zinc-100">
            contact
          </h2>
          <div className="flex-1 h-[1px] bg-white/[0.08] ml-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Typography & Direct Channels */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight text-white leading-tight">
              let's build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600">
                something.
              </span>
            </h3>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light max-w-md">
              Whether you want to discuss gameplay mechanics, real-time systems, web applications, or collaborative opportunities—reach out anytime.
            </p>

            {/* Direct Channel Badges with Instagram included */}
            <div className="space-y-3.5 pt-2">
              {/* Direct Mailto */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                data-cursor="hover"
                className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#0b1120]/70 hover:border-cyan-400/40 hover:bg-white/[0.02] transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono lowercase tracking-widest text-zinc-500 block mb-1">
                    primary email
                  </span>
                  <span className="font-mono text-sm sm:text-base text-zinc-200 group-hover:text-cyan-300 transition-colors lowercase">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <span className="font-mono text-zinc-500 group-hover:text-white transition-colors">
                  ↗
                </span>
              </a>

              {/* Instagram */}
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#0b1120]/70 hover:border-cyan-400/40 hover:bg-white/[0.02] transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono lowercase tracking-widest text-zinc-500 block mb-1">
                    instagram
                  </span>
                  <span className="font-mono text-sm sm:text-base text-zinc-200 group-hover:text-cyan-300 transition-colors lowercase">
                    @purushotham0307
                  </span>
                </div>
                <span className="font-mono text-zinc-500 group-hover:text-white transition-colors">
                  ↗
                </span>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#0b1120]/70 hover:border-white/[0.2] hover:bg-white/[0.02] transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono lowercase tracking-widest text-zinc-500 block mb-1">
                    source code & commits
                  </span>
                  <span className="font-mono text-sm text-zinc-200 group-hover:text-white transition-colors lowercase">
                    github.com/purushotham030706
                  </span>
                </div>
                <span className="font-mono text-zinc-500 group-hover:text-white transition-colors">
                  ↗
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#0b1120]/70 hover:border-white/[0.2] hover:bg-white/[0.02] transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono lowercase tracking-widest text-zinc-500 block mb-1">
                    professional network
                  </span>
                  <span className="font-mono text-sm text-zinc-200 group-hover:text-white transition-colors lowercase">
                    linkedin.com/in/purushotham-m-61b35937a
                  </span>
                </div>
                <span className="font-mono text-zinc-500 group-hover:text-white transition-colors">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-2xl border border-white/[0.1] bg-[#090e1a] p-6 sm:p-10 shadow-2xl">
              <h4 className="font-mono text-xs lowercase tracking-wider text-cyan-400 mb-6 font-semibold">
                dispatch direct message
              </h4>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Honeypot anti-spam field (hidden from real users) */}
                <div style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0 }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono lowercase text-zinc-400 mb-2">
                    name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="jane doe"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 font-mono text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono lowercase text-zinc-400 mb-2">
                    email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 font-mono text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono lowercase text-zinc-400 mb-2">
                    message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="hello puru, i came across your portfolio..."
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 font-mono text-sm transition-colors resize-none"
                  />
                </div>

                {status.error && (
                  <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-400">
                    {status.error}
                  </div>
                )}

                {status.success && (
                  <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-400">
                    message sent successfully! i will get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  data-cursor="hover"
                  className="w-full py-3.5 rounded-lg bg-white text-black font-mono text-xs font-semibold tracking-wider lowercase hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                  {status.loading ? 'transmitting...' : 'transmit message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
