import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { cn } from "@/lib/utils"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) throw new Error("useCarousel must be used within a <Carousel />")
  return context
}

function Carousel({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }: React.ComponentProps<"div"> & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: orientation === "horizontal" ? "x" : "y" }, plugins)
  React.useEffect(() => { if (!api || !setApi) return; setApi(api); }, [api, setApi])
  return (
    <CarouselContext.Provider value={{ carouselRef, api, opts, orientation }}>
      <div ref={carouselRef} className={cn("carousel", className)} onMouseDown={e => e.stopPropagation()} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { carouselRef, orientation } = useCarousel()
  return <div ref={carouselRef} className={cn("carousel-content", className)} {...props} />
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  const { orientation } = useCarousel()
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("carousel-item", orientation === "horizontal" ? "carousel-item-h" : "carousel-item-v", className)}
      {...props}
    />
  )
}

export { type CarouselApi, Carousel, CarouselContent, CarouselItem }
