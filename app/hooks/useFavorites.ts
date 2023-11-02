"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite= ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {
            let request;
            let message;

            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
                message = 1;

            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
                message = 2;
            } 

            await request();
            router.refresh();
            if (message === 1) {
                toast.success("Removed from favorites");
            } else if (message = 2) {
                toast.success("Added to favorites")
            }
           
        } catch (error) {
            toast.error("Something went wrong.");
        }
    }, [
        currentUser, 
        hasFavorited, 
        listingId, 
        loginModal, 
        router
    ]);

    return { 
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite;