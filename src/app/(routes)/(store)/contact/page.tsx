import { ChevronRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Facebook } from "~/components/icons/facebook";
import { Messenger } from "~/components/icons/messenger";
import { WhatsApp } from "~/components/icons/whatsapp";

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <div className="max-w-screen-xl mx-auto p-4 lg:px-0 w-full">
      <h1 className="text-3xl font-semibold mb-4 sm:mb-6 lg:mb-8">Contact Us</h1>
      <div className="flex flex-col space-y-2.5 sm:space-y-4">
        <a 
          target="_blank"
          href="https://wa.me/8801818703308"
          className="hover:bg-accent hover:text-accent-foreground rounded-md p-4 inline-flex items-center gap-4 border transition-colors cursor-pointer font-medium"
        >
          <WhatsApp className="size-4" />
          Whatsapp
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
        <a
          target="_blank"
          href="tel:+8801818703308"
          className="hover:bg-accent hover:text-accent-foreground rounded-md p-4 inline-flex items-center gap-4 border transition-colors cursor-pointer font-medium"
        >
          <PhoneIcon className="size-4" />
          Phone
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
        <a
          target="_blank"
          href="mailto:pixiewearofficial@gmail.com"
          className="hover:bg-accent hover:text-accent-foreground rounded-md p-4 inline-flex items-center gap-4 border transition-colors cursor-pointer font-medium"
        >
          <MailIcon className="size-4" />
          Email
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
        <a
          target="_blank"
          href="https://www.facebook.com/pixiewearofficial"
          className="hover:bg-accent hover:text-accent-foreground rounded-md p-4 inline-flex items-center gap-4 border transition-colors cursor-pointer font-medium"
        >
          <Facebook className="size-4" />
          Facebook
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
        <a
          target="_blank"
          href="https://m.me/pixiewearofficial"
          className="hover:bg-accent hover:text-accent-foreground rounded-md p-4 inline-flex items-center gap-4 border transition-colors cursor-pointer font-medium"
        >
          <Messenger className="size-4" />
          Messenger
          <ChevronRightIcon className="ml-auto size-4" />
        </a>
      </div>
    </div>
  );
}
