"use client";

import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import { cn } from "~/lib/utils";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/40 p-4 sm:p-0">
      <div className="px-4 pt-8 pb-4">
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-2">
            <h3 className="font-alenia text-xl uppercase">{siteConfig.name}</h3>
            <p className="text-muted-foreground text-sm">
              {siteConfig.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-medium">Company</h4>
            <div className="flex flex-col space-y-1">
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto justify-start px-0 text-muted-foreground"
                )}
                href="/about"
              >
                About Us
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto justify-start px-0 text-muted-foreground"
                )}
                href="/careers"
              >
                Careers
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto justify-start px-0 text-muted-foreground"
                )}
                href="/contact"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-2">
            <h4 className="font-medium">Support</h4>
            <div className="flex flex-col space-y-1">
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto justify-start px-0 text-muted-foreground"
                )}
                href="/shipping"
              >
                Shipping Policy
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto justify-start px-0 text-muted-foreground"
                )}
                href="/returns"
              >
                Returns & Exchanges
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto justify-start px-0 text-muted-foreground"
                )}
                href="/faq"
              >
                FAQ
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h4 className="font-medium">Legal</h4>
            <div className="flex flex-col space-y-1">
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto justify-start px-0 text-muted-foreground"
                )}
                href="/privacy"
              >
                Privacy Policy
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: "link" }),
                  "h-auto justify-start px-0 text-muted-foreground"
                )}
                href="/terms"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-4 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
