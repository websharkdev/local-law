"use client";

import { FileQuestion, MoveLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button.ui";
import { PageCenterLayout } from "@/components/common/page-center-layout.common";

export default function NotFound() {
    const t = useTranslations("Common.notFoundPage");
    const router = useRouter();

    return (
        <PageCenterLayout
            icon={FileQuestion}
            iconClassName="bg-blue-50 text-primary"
            title={t("title")}
            description={t("description")}
            action={
                <Button onClick={() => router.push("/")} className="gap-ds-8">
                    <MoveLeft className="size-ds-20" />
                    {t("backHome")}
                </Button>
            }
        />
    );
}
