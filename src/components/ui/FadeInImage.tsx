import { useState, useTransition } from 'react';
import { cn } from '@/src/lib/utils';

interface FadeInImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  imageClassName?: string;
}

export const FadeInImage = ({
  src,
  alt,
  className,
  containerClassName,
  imageClassName,
  loading = "lazy",
  ...props
}: FadeInImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [, startTransition] = useTransition();

  const handleLoad = () => {
    startTransition(() => {
      setIsLoaded(true);
    });
  };

  return (
    <div className={cn("relative overflow-hidden bg-white/[0.02] w-full h-full", containerClassName)}>
      {/* Dynamic elegant shimmer overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-950 flex items-center justify-center animate-pulse">
          <div className="w-5 h-5 rounded-full border border-white/10 border-t-brand-blue animate-spin" />
        </div>
      )}
      
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        referrerPolicy="no-referrer"
        className={cn(
          "transition-all duration-1000 ease-out",
          isLoaded 
            ? "opacity-100 scale-100 blur-0" 
            : "opacity-0 scale-[1.03] blur-sm",
          imageClassName || className
        )}
        {...props}
      />
    </div>
  );
};
