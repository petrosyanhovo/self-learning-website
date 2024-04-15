"use client"

import { Category } from "@prisma/client";
import {
    FcCursor,
    FcFilmReel,
    FcMultipleDevices,
    FcIdea,
    FcOldTimeCamera,
    FcGlobe,
    FcFilm,
} from "react-icons/fc"
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
    items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
    "Անիմացիա": FcFilm,
    "Գրաֆիկ դիզայն": FcIdea,
    "Եռաչափ մոդելավորում": FcGlobe,
    "Լուսանկարչություն": FcOldTimeCamera,
    "Ծրագրավորում": FcMultipleDevices,
    "Կայքերի մշակում": FcCursor,
    "Ֆիլմերի ստեղծում": FcFilmReel,
}

export const Categories = ({
    items,
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}