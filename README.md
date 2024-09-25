


# Andy Matuschak Stacked Notes


My take on stacked tabs view from [Andy Matuschak Notes](https://notes.andymatuschak.org/). Trying to implement them. [See other example on the note taking app Obsidian.](https://www.linkedin.com/posts/stephango_sometimes-i-forget-to-use-the-tab-stack-view-activity-7202343994670919680-GjSn?utm_source=share&utm_medium=member_desktop)


## limitations

- How to deal with the stacked notes reactively on the page?  Because Andy use the queryparams such as https://notes.andymatuschak.org/About_these_notes?stackedNotes=zCMhncA1iSE74MKKYQS5PBZ to deal with it.
- Should I host the markdown files?  Because using the Slug will cause some problems in the future, and its better to GET by ID. Maybe host the markdown files on R2 or Supabase? I don't know if Vercel will handle the folder operations. Maybe a VPS?



## Installation

Install Bun as runtime.

Then with the --bun flag, run the dev server. This is important because we use the Bun I/O File API to parse the markdown files.

bun --bun run dev