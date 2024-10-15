"use client";
import { NavButton } from "./navButton";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useMedia } from "react-use";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

const routes = [
  {
    href: "/",
    lable: "overview",
  },
  {
    href: "/transactions",
    lable: "transactions",
  },
  {
    href: "/accounts",
    lable: "accounts",
  },
  {
    href: "/categories",
    lable: "categories",
  },
  {
    href: "/settings",
    lable: "settings",
  },
];

export const Navigation = () => {
  const pathName = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant={"outline"}
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.href === pathName ? "secondary" : "ghost"}
                onClick={() => onClick(route.href)}
                className="w-full justify-start"
              >
                {route.lable}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto text-white">
      {routes.map((route, index) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.lable}
          isActive={pathName === route.href}
        />
      ))}
    </nav>
  );
};
