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

export default function StreamingIcon({
  streamingItem: { logo_path, provider_id, provider_name },
}: StreamingIconProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            alt={provider_name}
            key={provider_id}
            src={`https://image.tmdb.org/t/p/w400${logo_path}`}
            width={40}
            height={40}
            className="rounded-lg"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{provider_name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
