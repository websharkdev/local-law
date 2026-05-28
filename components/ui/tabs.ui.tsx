"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import { motion, AnimatePresence } from "motion/react"

import { cn } from "@/lib/utils"
import { EASE_AWWWARDS } from "@/lib/animations.lib"

type TabsListVariant = VariantProps<typeof tabsListVariants>["variant"]
type TabsListSize = VariantProps<typeof tabsListVariants>["size"]
type TabsAnimation = "default" | "fade" | "awwwards"

const AWWWARDS_EASE = EASE_AWWWARDS

const TabsContext = React.createContext<{ animation: TabsAnimation; indicatorId: string; value?: string }>({
    animation: "default",
    indicatorId: "tabs",
})
const TabsListContext = React.createContext<{
    variant: NonNullable<TabsListVariant>;
    size: NonNullable<TabsListSize>;
}>({
    variant: "default",
    size: "default",
})

type TabsProps = React.ComponentProps<typeof TabsPrimitive.Root> & {
    animation?: TabsAnimation;
}

function Tabs({
    animation = "default",
    className,
    orientation = "horizontal",
    value,
    defaultValue,
    onValueChange,
    ...props
}: TabsProps) {
    const [internalActiveTab, setInternalActiveTab] = React.useState(defaultValue)
    const activeTab = value ?? internalActiveTab
    const reactId = React.useId()
    const indicatorId = React.useMemo(
        () => `tabs-${reactId.replaceAll(":", "")}`,
        [reactId]
    )

    const handleValueChange = (val: string) => {
        setInternalActiveTab(val)
        onValueChange?.(val)
    }

    return (
        <TabsContext.Provider value={{ animation, indicatorId, value: activeTab }}>
            <TabsPrimitive.Root
                data-slot="tabs"
                data-orientation={orientation}
                value={value}
                defaultValue={defaultValue}
                onValueChange={handleValueChange}
                className={cn(
                    "group/tabs flex gap-ds-8 data-horizontal:flex-col",
                    className
                )}
                {...props}
            />
        </TabsContext.Provider>
    )
}

const tabsListVariants = cva(
    "group/tabs-list inline-flex items-center text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
    {
        variants: {
            variant: {
                default: "w-full justify-center gap-ds-4 rounded-ds-12 border border-ink/8 bg-white p-ds-4",
                primary: "w-full justify-center gap-ds-4 rounded-ds-12 border border-ink/8 bg-white p-ds-4",
                secondary: "justify-start gap-ds-0 border-0 bg-transparent p-ds-0",
                line: "w-fit justify-start gap-ds-2 rounded-none bg-transparent p-ds-0",
                inverse: "w-full gap-ds-2 rounded-ds-10 border-0 bg-transparent p-ds-0",
                underline: "w-full gap-ds-0 rounded-none border-0 border-b border-ink/5 bg-transparent px-ds-20 py-ds-0",
            },
            size: {
                default: "",
                sm: "",
                lg: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const tabsTriggerVariants = cva(
    "group/tabs-trigger cursor-pointer disabled:cursor-not-allowed relative inline-flex items-center justify-center gap-ds-6 border border-transparent whitespace-nowrap transition-colors group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start hover:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-ds-16",
    {
        variants: {
            variant: {
                default: "flex-1 rounded-ds-8 px-ds-6 py-ds-2 font-medium text-ink hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary",
                primary: "flex-1 rounded-ds-8 px-ds-6 py-ds-2 font-medium text-ink hover:text-primary data-[state=active]:border-primary data-[state=active]:text-primary",
                secondary: "h-ds-40 flex-none rounded-ds-10 border-0 px-ds-16 py-ds-10 text-center font-normal text-ink/60 hover:text-ink/60 data-[state=active]:font-medium data-[state=active]:text-primary",
                line: "flex-none rounded-none px-ds-12 pt-ds-0 pb-ds-16 font-normal text-ink/60 data-[state=active]:font-medium data-[state=active]:text-ink",
                inverse: "flex-none rounded-ds-12 border-none px-ds-16 py-ds-9 font-normal text-white hover:text-white data-[state=active]:text-white",
                underline: "h-ds-46 flex-1 rounded-none border-0 border-b-2 border-transparent bg-transparent p-ds-0 pt-ds-12 font-medium text-ink hover:text-ink data-[state=active]:border-b-primary data-[state=inactive]:text-ink/60",
            },
            size: {
                default: "h-ds-42 text-ds-16",
                sm: "text-ds-14",
                lg: "text-ds-16",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const tabsTriggerBackgroundVariants = cva("absolute z-0", {
    variants: {
        variant: {
            default: "inset-ds-0 rounded-ds-8 border border-primary/12 bg-primary/8",
            primary: "inset-ds-0 rounded-ds-8 border border-primary/12 bg-primary/8",
            secondary: "inset-ds-0 rounded-ds-10 border-0 bg-primary/8",
            line: "right-ds-0 bottom-ds-0 left-ds-0 h-ds-2 rounded-t-full bg-primary",
            inverse: "inset-ds-0 rounded-ds-12 border-0 bg-white/10 backdrop-blur",
            underline: "hidden",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

function TabsList({
    className,
    variant = "default",
    size = "default",
    ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
    VariantProps<typeof tabsListVariants>) {
    return (
        <TabsListContext.Provider value={{ variant: variant ?? "default", size: size ?? "default" }}>
            <TabsPrimitive.List
                data-slot="tabs-list"
                data-variant={variant}
                data-size={size}
                className={cn(tabsListVariants({ variant, size }), className)}
                {...props}
            />
        </TabsListContext.Provider>
    )
}

function TabsTrigger({
    className,
    children,
    value,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    const context = React.useContext(TabsContext)
    const listContext = React.useContext(TabsListContext)
    const isActive = context.value === value

    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            value={value}
            className={cn(
                tabsTriggerVariants({ variant: listContext.variant, size: listContext.size }),
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            {isActive ? (
                <TabsTriggerBackground
                    layoutId={context.animation === "fade" ? undefined : `${context.indicatorId}-active-tab`}
                    animation={context.animation}
                    variant={listContext.variant}
                />
            ) : null}
        </TabsPrimitive.Trigger>
    )
}

function TabsTriggerBackground({
    animation,
    layoutId,
    variant,
}: {
    animation: TabsAnimation;
    layoutId?: string;
    variant: NonNullable<TabsListVariant>;
}) {
    return (
        <motion.div
            data-slot="tabs-trigger-background"
            layoutId={layoutId}
            initial={animation === "awwwards"
                ? { opacity: 0, scale: 0.86, filter: "blur(var(--ds-4))" }
                : { opacity: 0 }}
            animate={animation === "awwwards"
                ? { opacity: 1, scale: 1, filter: "blur(0)" }
                : { opacity: 1 }}
            transition={
                animation === "fade"
                    ? { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                    : animation === "awwwards"
                        ? {
                            duration: 0.48,
                            ease: AWWWARDS_EASE,
                            layout: {
                                duration: 0.56,
                                ease: AWWWARDS_EASE,
                            },
                            opacity: {
                                duration: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                            },
                        }
                        : {
                            type: "spring",
                            bounce: 0.15,
                            duration: 0.5,
                        }
            }
            className={tabsTriggerBackgroundVariants({ variant })}
        />
    )
}

function TabsContents({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
            {...props}
        >
            <AnimatePresence mode="wait">
                {children}
            </AnimatePresence>
        </div>
    )
}

function TabsContent({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
    const context = React.useContext(TabsContext)
    const animationProps = React.useMemo(() => {
        if (context.animation === "fade") {
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
            }
        }

        if (context.animation === "awwwards") {
            return {
                initial: { opacity: 0, y: "var(--ds-14)", scale: 0.985, filter: "blur(var(--ds-8))" },
                animate: { opacity: 1, y: 0, scale: 1, filter: "blur(0)" },
                exit: { opacity: 0, y: "calc(-1 * var(--ds-8))", scale: 0.99, filter: "blur(var(--ds-6))" },
                transition: {
                    duration: 0.48,
                    ease: AWWWARDS_EASE,
                    opacity: { duration: 0.24, ease: [0.16, 1, 0.3, 1] as const },
                },
            }
        }

        return {
            initial: { opacity: 0, x: "var(--ds-10)", filter: "blur(var(--ds-4))" },
            animate: { opacity: 1, x: 0, filter: "blur(0)" },
            exit: { opacity: 0, x: "calc(-1 * var(--ds-10))", filter: "blur(var(--ds-4))" },
            transition: {
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1] as const,
            },
        }
    }, [context.animation])

    return (
        <TabsPrimitive.Content
            asChild
            data-slot="tabs-content"
            className={cn("outline-none", className)}
            {...props}
        >
            <motion.div
                key={props.value}
                {...animationProps}
            >
                {props.children}
            </motion.div>
        </TabsPrimitive.Content>
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsContents, tabsListVariants }
