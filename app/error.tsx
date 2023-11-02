"use client";

import EmptyState from "@/components/empty-state";
import { useEffect } from "react";

interface ErrorStateProps {
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <EmptyState
        title="Something went wrong."
        subtitle="Please refresh!"
        />
    )
};

export default ErrorState;