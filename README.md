


# Andy Matuschak Stacked Notes

<div>
    <a href="https://www.loom.com/share/8728602b610243038fa694748ccaf50d">
      <img style="max-width:200px;" src="https://cdn.loom.com/sessions/thumbnails/8728602b610243038fa694748ccaf50d-9c5f0cb44e029c61-full-play.gif">
    </a>
  </div>


My take on stacked tabs view from [Andy Matuschak Notes](https://notes.andymatuschak.org/). [See other example on the note taking app Obsidian.](https://www.linkedin.com/posts/stephango_sometimes-i-forget-to-use-the-tab-stack-view-activity-7202343994670919680-GjSn?utm_source=share&utm_medium=member_desktop)


[See deploy here.](https://andy-tabs.vicentematus.cl/)

## Thought process
- How to deal with File IO operations on Node enviroments?
- Thanks to [@NicolasMontone](https://github.com/NicolasMontone), he recommended using[ Node File IO operations ](https://nodejs.org/api/fs.html#promise-example). [See his code](https://github.com/NicolasMontone/nmontone/blob/52cc3bea5fa6736c5f69b7b6b3aa8383a5af777f/lib/posts.ts#L18-L37). Choose not to.
- Tried using Vite Assets with `import.meta.glob`, saw some Svelte Kit references, but nope.
- Why not use Bun because it's more fun? so ended using [Bun File I/O operations ](https://bun.sh/docs/api/file-io).
- How to parse markdown content from a `File`? use [gray-matter](https://github.com/jonschlinkert/gray-matter)
- How to serve markdown content? using API Routes and parsing them on the server, just return the markdown with 			`'Content-Type': 'text/markdown'`
- How to deal with nodes and backlinks? Not yet.
- What is an [Abstract Syntax Tree (AST)?](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
- How to travel an AST? use [unist-util-visit](https://github.com/syntax-tree/unist-util-visit). [Tried this](https://github.com/vicentematus/svelte-andy/blob/main/src/lib/markdown/renderer.ts#L43-L58): 

```typescript
export function extractHrefs(markdown: string): string[] {
	const links: any = [];
	remark()
		.use(() => (tree) => {
			visit(tree, 'link', (node: Node, index, parent) => {
				// if the url string is not a relative path then return
				//  todo: try to save the files who has external links
				if (node.url.includes('http')) return consola.error('External link found', node.url);

				links.push(node.url);
				console.log({ links });
			});
		})
		.process(markdown, () => {});
	return links;
}
```



## Limitations

- How to deal with the stacked notes reactively on the page?  Because Andy use the queryparams such as https://notes.andymatuschak.org/About_these_notes?stackedNotes=zCMhncA1iSE74MKKYQS5PBZ to deal with it. Currently I deal with then a writable state.
- Should I file hosting for the markdown files?  Because the ID it's using is the slug. Probably will cause some problems in the future, and it's better to GET by ID. Maybe host the markdown files on R2 or Supabase? 
- Andy fetches all backlinks on every note visited. If you visit https://notes.andymatuschak.org/About_these_notes, on the network tab, it will fetch all external references for that note.
- How to fetch all links on a markdown file? then you need to travel an AST (Abstract Syntax Tree).

## Installation


First, [install Bun runtime](https://bun.sh/).
```bash
curl -fsSL https://bun.sh/install | bash
```

Then install dependencies on the root folder:
```bash
bun install
```

Run the dev server. It's important to note on the package.json we are using bunx and --bun commands to ensure Bun is the runtime.

```bash
bun dev
```

## Deployment

Because we are using Bun as a runtime (with the File I/O operations), [Vercel just support Bun Package manager, but not the runtime](https://vercel.com/changelog/bun-install-is-now-supported-with-zero-configuration). Just [Render supports it natively](https://docs.render.com/native-runtimes), or your favorite VPS.