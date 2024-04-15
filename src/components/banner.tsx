import { AlertTriangle, CheckCircleIcon } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { IconBadge } from "./ui/icon-badge";

const bannerVariants = cva(
    "border text-center p-4 text-sm flex items-center w-ful",
    {
        variants: {
            variant: {
                warning: "bg-yellow-200/80 border-yellow-30 text-primary",
                success: "bg-emerald-700 border-emerald-800 text-slate-100",
            }
        },
        defaultVariants: {
            variant: "warning"
        }
    }
);

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string;
};

const iconMap = {
    warning: AlertTriangle,
    success: CheckCircleIcon,
}

export const Banner = ({
    label,
    variant,
}: BannerProps) => {
    const Icon = iconMap[variant || "warning"];

    return (
        <div className={cn(bannerVariants({ variant }))}>
            <Icon className="h-4 w-4 mr-2"/>
            {label}
        </div>
    )
}