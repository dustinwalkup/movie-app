import Image from "next/image";

interface StreamingPlatformProps {
  name: string;
  logo: string;
}

export function StreamingPlatform({ name, logo }: StreamingPlatformProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full">
        <Image
          src={logo}
          alt={name}
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>
      <span className="mt-2 text-sm font-medium">{name}</span>
    </div>
  );
}
