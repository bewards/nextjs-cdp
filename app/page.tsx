import Image from "next/image";
import FormCoupon from "@/components/forms/form-coupon";
import EngageSimulateNewGuests from "@/components/engage/engage-simulate-new-guests";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="mx-auto"
          src="/sitecore-cd_nextjs.png"
          alt="Next.js Sitecore CDP logo"
          width={500}
          height={300}
          priority
        />
        <section className="instructions max-w-2xl m-auto">
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Get started by configuring your CDP settings by reviewing the{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">README</code>
            </li>
            <li>Interact with the site and see your Guest data in real-time!</li>
            <ul className="list-disc ms-10">
              <li>Use the IDENTITY form below to convert Visitor to Customer</li>
              <li>Use the search bar to send SEARCH type event</li>
              <li>
                Click the Simulate 10 New Visitors button to kick off Stream Direct HTTPS Requests to create new
                visitors and simulate page views
              </li>
            </ul>
          </ol>
        </section>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <EngageSimulateNewGuests />
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://github.com/bewards/nextjs-cdp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the docs
          </a>
        </div>

        <FormCoupon />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
