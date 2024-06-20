import type { ExternalLink } from "$lib/models/links";
import { writable } from "svelte/store";
export const links = writable<ExternalLink[]>([])