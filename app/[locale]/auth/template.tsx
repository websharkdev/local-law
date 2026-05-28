import { type ReactNode } from "react";

import { AuthTemplateShell } from "@/features/auth/components/auth-template-shell.custom";

const Template = ({
    children,
}: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <AuthTemplateShell>{children}</AuthTemplateShell>
    );
};

export default Template;
