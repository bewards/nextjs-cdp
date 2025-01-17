"use client";

import { useEngageStore } from "@/providers/engage-provider-store";
import { FormEvent, useState } from "react";
import { hashText } from "@/utils/stringHelpers";

const FormCoupon = () => {
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("RENO");
  const { engage } = useEngageStore((store) => store);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    // Handle form submission, e.g., send data to an API
    console.log("Form submitted:", { email, interest });

    if (engage) {
      const uuid = hashText(email);
      console.log(`Sending FormCoupon data to Engage API. UUID (from email): ${uuid}`);
      engage
        .identity(
          {
            email,
            channel: "WEB",
            currency: "USD",
            language: "en",
            page: "home",
            identifiers: [
              {
                id: uuid,
                provider: process.env.NEXT_PUBLIC_ENGAGE_IDENTITY || "",
              },
            ],
          },
          {
            interests: [interest],
          }
        )
        .then((response) => {
          console.log("Engage identity event response", response);
          if (response?.status === "OK") {
            setSuccessMessage(
              `IDENTITY event sent successfully to CPD! Check CDP Guest ref ${
                response.ref
              } or Browser ID ${engage.getBrowserId()}`
            );
          } else {
            setSuccessMessage("Error! Please check your CDP settings and try again.");
          }
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xxl mx-auto p-6 rounded-md shadow-md">
        <legend className="text-4xl font-extrabold dark:text-white mb-3">🆔 IDENTITY event</legend>
        <div className="mb-4">
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Choose Your Home Improvement Interest for 20% Off Your Next Order!
          </label>
          <select
            id="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="RENO">Renovations</option>
            <option value="WOODWORKING">Wood Working</option>
            <option value="PLUMBING">Plumbing</option>
            <option value="ELECTRICAL">Electrical</option>
          </select>
        </div>
        {/* Email and Message fields */}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email (provide a fake@mailinator.com email)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
          Submit
        </button>
      </form>
      {successMessage && <p className="text-emerald-500 text-center mt-4">{successMessage}</p>}
    </>
  );
};

export default FormCoupon;
