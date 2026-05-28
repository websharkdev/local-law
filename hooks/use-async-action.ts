import { useState } from "react";

export const useAsyncAction = () => {
    const [isLoading, setIsLoading] = useState(false);

    const execute = async (action: () => Promise<void>) => {
        setIsLoading(true);
        try {
            await action();
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, execute };
};
