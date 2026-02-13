import { cn } from "@/lib/utils";


export function FeaturesSectionWithHoverEffects({features}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  images
}) => {
  const container = "absolute right-8 -top-1 z-40 h-20 w-16";
  const effect =
    "relative duration-500 delay-100 shadow-none group-hover/feature:shadow-xl scale-0 group-hover/feature:scale-100 opacity-0 group-hover/feature:opacity-100 group-hover/feature:w-full group-hover/feature:h-full w-16 h-16 overflow-hidden transition-all rounded-md";

  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature items-center md:items-start text-center md:text-left overflow-visible",
        // Add right border to all except last in each row (items 3 and 7)
        index % 4 !== 3 && "lg:border-r dark:border-neutral-800",
        // Add bottom border to first row (items 0-3)
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}

    >
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-4 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-4 w-full">
        <div
          className="absolute left-0 md:left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-red-600 transition-all duration-200 origin-center hidden md:block" />
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-4">
        {description}
      </p>

      {/* Reveal Images on Hover */}
      {images && images.length >= 2 && (
        <>
          <div className={container}>
            <div className={effect}>
              <img
                alt={images[1].alt}
                src={images[1].src}
                className="h-full w-full object-cover" />
            </div>
          </div>
          <div
            className={cn(
              container,
              "translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500 group-hover/feature:translate-x-6 group-hover/feature:translate-y-6 group-hover/feature:rotate-12"
            )}>
            <div className={cn(effect, "duration-200")}>
              <img
                alt={images[0].alt}
                src={images[0].src}
                className="h-full w-full object-cover" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
