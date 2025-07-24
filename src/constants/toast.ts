// Toast style and variant constants for the Toast component

export const TOAST_VIEWPORT_CLASS = "fixed top-4 right-4 flex flex-col gap-3 w-[350px] max-w-[calc(100vw-2rem)] m-0 list-none z-[2147483647] outline-none";

export const TOAST_VARIANTS_BASE = "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg bg-white transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full";
export const TOAST_VARIANT_DEFAULT = "border-orange-100 bg-white text-gray-800";
export const TOAST_VARIANT_DESTRUCTIVE = "border-red-100 bg-red-50 text-red-900";
export const TOAST_ACTION_CLASS = "inline-flex h-8 shrink-0 items-center justify-center rounded-md bg-orange-600 px-3 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
export const TOAST_CLOSE_CLASS = "absolute right-2 top-2 rounded-md p-1 text-gray-500 opacity-70 transition-opacity hover:opacity-100 hover:text-orange-600 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-orange-500";
export const TOAST_TITLE_CLASS = "text-sm font-semibold [&+div]:mt-1";
export const TOAST_DESCRIPTION_CLASS = "text-sm text-gray-600";
