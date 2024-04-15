import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
    course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const groupped: { [courseTitle: string]: number} = {};

    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title;
        if(!groupped[courseTitle]) {
            groupped[courseTitle] = 0;
        }
        groupped[courseTitle] += purchase.course.price!;
    });

    return groupped
};

export const getAnalytics = async (userId: string) => {
    try {
        const purchases = await db.purchase.findMany({
            where: {
                course: {
                    userId: userId
                }
            },
            include: {
                course: true,
            }
        });

        const grouppedEarnings = groupByCourse(purchases)
        const data = Object.entries(grouppedEarnings).map(([courseTitle, total]) => ({
            name: courseTitle,
            total: total,
        }));

        const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
        const totalSales = purchases.length;

        return {
            data,
            totalRevenue,
            totalSales,
        }
    } catch (error) {
        console.log("GET_ANALYTICS", error);
        return {
            data: [],
            totalRevenue: 0,
            totalSales: 0,
        }
    }
}