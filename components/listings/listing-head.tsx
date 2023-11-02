"use client"

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import Heading from "../heading";
import HeartButton from "../heart-button";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    ImageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    locationValue,
    ImageSrc,
    id,
    currentUser
}) => {

    const { getByValue } = useCountries();
    const location = getByValue(locationValue)

  return (
    <>
    <Heading
    title={title}
    subtitle={`${location?.region}, ${location?.label}`}
    />
    <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
        alt="Image"
        src={ImageSrc}
        className="object-cover w-full"
        fill
        />
        <div className="absolute top-5 right-5">
            <HeartButton
            listingId={id}
            currentUser={currentUser}
            />
        </div>
    </div>
    </>
  )
}

export default ListingHead;