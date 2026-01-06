import { ChevronRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Facebook } from "~/components/icons/facebook";
import { Messenger } from "~/components/icons/messenger";
import { WhatsApp } from "~/components/icons/whatsapp";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 lg:px-0">
      <h1 className="mb-4 font-semibold text-3xl sm:mb-6 lg:mb-8">
        Contact Us
      </h1>
      <div className="flex flex-col space-y-2.5 sm:space-y-4">
        <a
          className="inline-flex cursor-pointer items-center gap-4 rounded-md border p-4 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          href="https://wa.me/8801818703308"
          rel="noopener"
          target="_blank"
        >
          <WhatsApp className="size-4" />
          Whatsapp
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
        <a
          className="inline-flex cursor-pointer items-center gap-4 rounded-md border p-4 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          href="tel:+8801818703308"
          rel="noopener"
          target="_blank"
        >
          <PhoneIcon className="size-4" />
          Phone
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
        <a
          className="inline-flex cursor-pointer items-center gap-4 rounded-md border p-4 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          href="mailto:pixiewearofficial@gmail.com"
          rel="noopener"
          target="_blank"
        >
          <MailIcon className="size-4" />
          Email
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
        <a
          className="inline-flex cursor-pointer items-center gap-4 rounded-md border p-4 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          href="https://www.facebook.com/pixiewearofficial"
          rel="noopener"
          target="_blank"
        >
          <Facebook className="size-4" />
          Facebook
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
        <a
          className="inline-flex cursor-pointer items-center gap-4 rounded-md border p-4 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          href="https://m.me/pixiewearofficial"
          rel="noopener"
          target="_blank"
        >
          <Messenger className="size-4" />
          Messenger
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
      </div>
    </div>
  );
}
