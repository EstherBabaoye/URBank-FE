import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

export default function ContactUs() {
  useEffect(() => {
    document.title = "Contact URBank";
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email.trim())
    ) {
      errs.email = "Invalid email address";
    }
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // Start loading

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/contact`,
        form
      );

      if (res.data.message) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        setErrors({ general: res.data.error || "Something went wrong." });
      }
    } catch (err) {
      setErrors({ general: "Failed to send message. Try again later." });
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pt-16 mt-24 mb-24 px-6 max-w-5xl mx-auto"
    >
      <h1 className="text-5xl font-extrabold text-[#051d40] mb-8 text-center drop-shadow-md">
        Get in Touch with URBank
      </h1>

      <p className="text-gray-700 mb-12 text-center max-w-3xl mx-auto leading-relaxed">
        Whether you have questions about our services, need support, or just
        want to say hello, we’re here to assist you. Use the contact details or
        send us a message using the form below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-10 bg-blue-50 p-10 rounded-3xl shadow-lg"
        >
          <ContactInfoItem
            Icon={PhoneIcon}
            title="Phone"
            content="+234 814 047 5605"
            subtext="Mon - Fri, 8am - 5pm"
          />
          <ContactInfoItem
            Icon={EnvelopeIcon}
            title="Email"
            content="urbank-support@nhsurulere.site"
            subtext="We reply within 24-48 hours."
          />
          <ContactInfoItem
            Icon={MapPinIcon}
            title="Office"
            content="URBank Headquarters, 148/150 Bode Thomas Street, Surulere, Lagos, Nigeria"
            subtext="Mon - Fri, 8am - 4pm"
          />

          {/* Map embed placeholder */}
          <div className="mt-8 rounded-xl overflow-hidden shadow-md">
            <iframe
              title="URBank Branch Locations"
              src="https://www.google.com/maps/d/embed?mid=1160OarudgtG5qN4-xnIpX0wuppCQ6xo&ehbc=2E312F"
              className="w-full h-48 md:h-56"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 rounded-3xl shadow-lg"
          noValidate
        >
          <h2 className="text-3xl font-semibold text-[#051d40] mb-6 text-center">
            Send Us a Message
          </h2>

          {errors.general && (
            <div className="mb-6 text-red-500 font-medium text-center">
              {errors.general}
            </div>
          )}

          {submitted && (
            <div className="mb-6 text-green-600 font-medium text-center">
              Thank you for reaching out! We'll get back to you soon.
            </div>
          )}

          <label className="block mb-5">
            <span className="text-gray-700 font-medium">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              } transition`}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name}</p>
            )}
          </label>

          <label className="block mb-5">
            <span className="text-gray-700 font-medium">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              } transition`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 mt-1 text-sm">{errors.email}</p>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Message</span>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className={`mt-1 block w-full rounded-md border px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 resize-none ${
                errors.message
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              } transition`}
              placeholder="Write your message here..."
            />
            {errors.message && (
              <p className="text-red-500 mt-1 text-sm">{errors.message}</p>
            )}
          </label>

          <button
            type="submit"
            className={`w-full ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white font-bold py-3 rounded-full shadow-lg transition`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}

function ContactInfoItem({ Icon, title, content, subtext }) {
  return (
    <div className="flex items-start space-x-4 group">
      <div className="p-3 rounded-full bg-blue-600 text-white group-hover:bg-blue-700 transition">
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-[#051d40] mb-1">{title}</h3>
        <p className="text-gray-800 font-medium">{content}</p>
        <p className="text-gray-500 text-sm">{subtext}</p>
      </div>
    </div>
  );
}
