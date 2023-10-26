import { RefObject } from "react"

import { useEventListener } from "usehooks-ts"

type Handler = (event?: MouseEvent) => void

function useOutsideClick<T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>,
	handler: Handler,
	mouseEvent: "mousedown" | "mouseup" = "mousedown"
): void {
	useEventListener(mouseEvent, (event) => {
		const el = ref?.current
		if (!el || el.contains(event.target as Node)) {
			return
		}
		setTimeout(() => {
			handler(event)
		}, 10)
	})
}

export default useOutsideClick
