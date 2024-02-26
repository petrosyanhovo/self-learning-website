"use client"

import { SidebarItem } from "./sidebar-item";
import { Layout, Compass } from "lucide-react";

const guestRoutes = [
    {
        icon: Layout,
        label: "Գլխավոր էջ",
        href: "/",
    },
    {
        icon: Compass,
        label: "Փնտրել",
        href: "/search",
    },
]

export const SidebarRoutes = () => {
    const routes = guestRoutes;
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}