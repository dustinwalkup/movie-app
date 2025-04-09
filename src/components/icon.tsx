import {
  UserIcon,
  MagnifyingGlassIcon,
  ListBulletIcon,
  VideoCameraIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

export type IconName =
  | "magnifying-glass"
  | "list-bullet"
  | "video-camera"
  | "plus"
  | "minus"
  | "user";

export default function Icon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  switch (name) {
    case "magnifying-glass":
      return <MagnifyingGlassIcon className={className} />;
    case "list-bullet":
      return <ListBulletIcon className={className} />;
    case "video-camera":
      return <VideoCameraIcon className={className} />;
    case "user":
      return <UserIcon className={className} />;
    case "plus":
      return <PlusIcon className={className} />;
    case "minus":
      return <MinusIcon className={className} />;
    default:
      return <UserIcon className={className} />;
  }
}
