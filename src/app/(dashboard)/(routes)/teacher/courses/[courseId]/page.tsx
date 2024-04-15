import { IconBadge } from "@/components/ui/icon-badge";
// import { db } from "@/lib/db";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";
import { PriceForm } from "./_components/price-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/chapters-form";
import { Banner } from "@/components/banner";
import { Actions } from "./_components/actions";

const CourseIdPage = async ({
    params
}: {
    params: {courseId: string}
}) => {
    const { userId } = auth();

    if(!userId) {
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc",
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    });

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    console.log(categories);

    
    if(!course) {
        return redirect("/")
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapters.some(chapter => chapter.isPublished),
    ];

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;

    const comletionText = `(${completedFields}/${totalFields})`

    const isComplete = requiredFields.every(Boolean);

    return ( 
        <>
            {!course.isPublished && (
                <Banner
                    label="Այս դասընթացը հրապարակված չէ, այն տեսանելի չի լինի ուսանողների համար:"
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-2xl font-medium ">
                            Ստեղծել նոր դասընթաց
                        </h1>
                        <span className="text=sm text-slate-700">
                            Լրացրեք բոլոր դաշտերը {comletionText}
                        </span>
                    </div>
                    <Actions
                        disabled={!isComplete}
                        courseId={params.courseId}
                        isPublished={course.isPublished}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className="text-xl">
                                Կարգավորել դասընթացի տեղեկությունները
                            </h2>
                        </div>
                        <TitleForm
                            initialData={course}
                            courseId={course.id}
                            />
                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <ImageForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                            }))}
                            />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={ListChecks}/>
                                <h2 className="text-xl">
                                    Դասընթացի թեմաները
                                </h2>
                            </div>
                            <ChaptersForm
                                initialData={course}
                                courseId={course.id}
                            />
                            <div>
                                <div className="flex mt-6 items-center gap-x-2">
                                    <IconBadge icon={CircleDollarSign}/>
                                    <h2 className="text-xl">
                                        Վաճառեք ձեր դասընթացը
                                    </h2>
                                </div>
                                <PriceForm
                                    initialData={course}
                                    courseId={course.id}
                                />
                            </div>
                            <div>
                                <div className="flex mt-6 items-center gap-x-2">
                                    <IconBadge icon={File}/>
                                    <h2 className="text-xl">
                                        Ռեսուրսներ և ֆայլեր
                                    </h2>
                                </div>
                                <AttachmentForm
                                    initialData={course}
                                    courseId={course.id}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default CourseIdPage;