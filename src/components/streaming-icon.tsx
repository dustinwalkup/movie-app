import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  443: "/brands/spectrum.webp",
  444: "/brands/paramount.webp",
};

export default function StreamingIcon({
  streamingItem: { source_id, name, web_url },
}: StreamingIconProps) {
  const photoPath: string = streamerIDtoImageMapper[source_id];

  if (!photoPath) {
    return <span>{name}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            alt={name}
            src={photoPath}
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
