import { z } from "zod";

export const DELETE_ACCOUNT_CONFIRMATION_PHRASE = "DELETE";

export function createDeleteAccountSchema(accountEmail: string) {
    return z.object({
        email: z
            .string()
            .email("Enter a valid email address")
            .refine((value) => value === accountEmail, {
                message: "Email must match your account email",
            }),
        password: z.string().min(1, "Password is required"),
        confirmationPhrase: z.string().refine((value) => value === DELETE_ACCOUNT_CONFIRMATION_PHRASE, {
            message: `Type ${DELETE_ACCOUNT_CONFIRMATION_PHRASE} to confirm`,
        }),
        understandsDataDeletion: z.boolean().refine(Boolean, {
            message: "Please confirm this acknowledgement",
        }),
        understandsActiveItemsCancellation: z.boolean().refine(Boolean, {
            message: "Please confirm this acknowledgement",
        }),
    });
}

export type DeleteAccountValues = z.input<ReturnType<typeof createDeleteAccountSchema>>;
