import Link from "next/link";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="px-4 pt-8 pb-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 max-w-screen-xl mx-auto">
          {/* Company Info */}
          <div className="space-y-2">
            <h3 className="font-alenia uppercase text-xl">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-medium">Company</h4>
            <div className="flex flex-col space-y-1">
              <Link href="/about" className={cn(buttonVariants({ variant: "link" }), "h-auto justify-start px-0 text-muted-foreground")}>
                About Us
              </Link>
              <Link href="/careers" className={cn(buttonVariants({ variant: "link" }), "h-auto justify-start px-0 text-muted-foreground")}>
                Careers
              </Link>
              <Link href="/contact" className={cn(buttonVariants({ variant: "link" }), "h-auto justify-start px-0 text-muted-foreground")}>
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-2">
            <h4 className="font-medium">Support</h4>
            <div className="flex flex-col space-y-1">
              <Link href="/shipping" className={cn(buttonVariants({ variant: "link" }), "h-auto justify-start px-0 text-muted-foreground")}>
                Shipping Policy
              </Link>
              <Link href="/returns" className={cn(buttonVariants({ variant: "link" }), "h-auto justify-start px-0 text-muted-foreground")}>
                Returns & Exchanges
              </Link>
              <Link href="/faq" className={cn(buttonVariants({ variant: "link" }), "h-auto justify-start px-0 text-muted-foreground")}>
                FAQ
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h4 className="font-medium">Legal</h4>
            <div className="flex flex-col space-y-1">
              <Link href="/privacy" className={cn(buttonVariants({ variant: "link" }), "h-auto justify-start px-0 text-muted-foreground")}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={cn(buttonVariants({ variant: "link" }), "h-auto justify-start px-0 text-muted-foreground")}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}