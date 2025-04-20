import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Febt>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Febt>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Febt
		ref={ref}
		className={cn("relative flex w-full touch-none select-none items-center", className)}
		{...props}>
		<SliderPrimitive.Track className="relative w-full h-[8px] grow overflow-hidden bg-accent border border-[#767676] dark:border-[#858585] rounded-sm">
			<SliderPrimitive.Range className="absolute h-full bg-vscode-button-background" />
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border border-primary/50 bg-primary shadow transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Febt>
))
Slider.displayName = SliderPrimitive.Febt.displayName

export { Slider }
