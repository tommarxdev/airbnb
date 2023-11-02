"use client";

import { Listing, Reservation } from "@prisma/client"
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import { useCallback, useMemo } from "react";
import { format }  from "date-fns";
import Image from "next/image";
import HeartButton from "../heart-button";
import Button from "../button";

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
  };

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {

    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]);

        const price = useMemo(() => {
            if (reservation) {
                return reservation.totalPrice;
            }

            return data.price;

        }, [reservation, data.price]);

        const reservationDate = useMemo(() => {
            if(!reservation) {
                return null;
            }

            const start = new Date(reservation.startDate);
            const end = new Date(reservation.endDate);

            return `${format(start, "PP")} - ${format(end, "PP")}`

        }, [reservation]);

  return (
    <div 
    onClick={() => router.push(`/listings/${data.id}`)}
    className="col-span-1 cursor-pointer group"
    >
        <div className="flex flex-col gap-2 w-full">
            <div className="aspect-square w-full  relative overflow-hiddden rounded-xl">
                <Image
                 src={data.ImageSrc}
                 alt="Listing"
                 className="object-cover h-full w-full group-hover:scale-110 transition rounded-lg"
                 fill
                />
                <div className="absolute top-3 right-3">
                    <HeartButton 
                     listingId={data.id}
                     currentUser={currentUser}
                     />
                </div>
            </div>
            <div className="font-semibold text-lg mt-5 xs:mt-4 md:mt-2 lg:mt-2 xl:mt-2 2xl:mt-2">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationDate || data.category}
            </div>
            <div className="flex flex-row items-center gap-1">
                <div className="font-semibold">
                    $ {price}
                </div>
                {!reservation && (
                    <div className="font-light">
                        night
                    </div>
                )}
            </div>
            {onAction && actionLabel && (
                <Button
                 disabled={disabled}
                 label={actionLabel}
                 onClick={handleCancel}
                 small
                 />
            )}
        </div>
    </div>
  )
}

export default ListingCard;