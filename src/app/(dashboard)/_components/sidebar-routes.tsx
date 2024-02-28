"use client"

import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";
import { Layout, Compass, List, BarChart } from "lucide-react";

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

const teacherRoutes = [
    {
        icon: List,
        label: "Կուրսեր",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Վերլուծություն",
        href: "/teacher/analytics",
    },
]
export const SidebarRoutes = () => {
    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

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