// This file needs some naughty TS hacks because:
// * Svelte files *do* have a default export
// * But TS doesn't recognise them
// * So we need to ignore these errors
// * Except there is a rule to stop me disabling TS
// * So I need to allow myself to break that rule
// * And then ignore the TS error

/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck because TS doesn't recognise that these files are exporting a default
import Github from '$lib/components/Icons/SVGs/Github.svelte';
import Twitter from '$lib/components/Icons/SVGs/Twitter.svelte';
//@ts-check
export { Github, Twitter };