import Image from "next/image";
import Link from "next/link";

import { StreamingServiceItem } from "@/lib/types";

interface StreamingIconProps {
  streamingItem: StreamingServiceItem;
}

const streamerIDtoImageMapper: Record<number, string> = {
  24: "/brands/amazon.webp",
  26: "/brands/prime.webp",
  122: "/brands/fxnow.avif",
  125: "/brands/fandor.webp",
  126: "/brands/fandor-prime.webp",
  157: "/brands/hulu.webp",
  203: "/brands/netflix.webp",
  272: "/brands/tbs.avif",
  276: "/brands/tnt.avif",
  296: "/brands/tubi.avif",
  307: "/brands/vudu.webp",
  344: "/brands/youtube.webp",
  349: "/brands/apple.webp",
  353: "/brands/trutv.avif",
  365: "/brands/freeve.avif",
  366: "/brands/criterion.webp",
  367: "/brands/kanopy.avif",
  371: "/brands/apple-tv-plus.webp",
  372: "/brands/disney-plus.webp",
  373: "/brands/fubo.webp",
  378: "/brands/amc.webp",
  // 385: "/brands/hbo-via-hulu.webp",
  387: "/brands/max.webp",
  388: "/brands/peacock.webp",
  389: "/brands/peacock-premium.webp",
  390: "/brands/hoopla.webp",
  391: "/brands/plutotv.avif",
  398: "/brands/microsoft-store.webp",
  439: "/brands/plex.webp",
  463: "/brands/plex.webp",
  443: "/brands/spectrum.webp",
  444: "/brands/paramount.webp",
};

const DO_NOT_DISPLAY: number[] = [385];

export default function StreamingIcon({ streamingItem }: StreamingIconProps) {
  const { source_id, name, web_url, price, format, type } = streamingItem;
  const photoPath: string = streamerIDtoImageMapper[source_id];
  const isDisplayPrice = type === "rent" || type === "buy";

  if (DO_NOT_DISPLAY.includes(source_id)) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Link href={web_url} target="_blank" rel="noopener noreferrer">
        {photoPath ? (
          <Image
            alt={name}
            src={photoPath}
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="flex size-10 items-center justify-center truncate rounded-lg bg-gray-500">
            {name}
          </div>
        )}
      </Link>
      {isDisplayPrice && (
        <div className="flex flex-col items-center justify-center text-xs text-gray-400">
          <p>${price?.toFixed(2)}</p>
          <p>{format}</p>
        </div>
      )}
    </div>
  );
}
