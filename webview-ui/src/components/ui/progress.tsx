import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Febt>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Febt>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Febt
		ref={ref}
		className={cn("relative h-2 w-full overflow-hidden rounded-full bg-vscode-editor-background", className)}
		{...props}>
		<ProgressPrimitive.Indicator
			className="h-full w-full flex-1 bg-vscode-badge-background transition-all"
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Febt>
))
Progress.displayName = ProgressPrimitive.Febt.displayName

export { Progress }
