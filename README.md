# The World Today — 21 November 2026 in one image

Entry for make.fun competition `news-image-20261121` ($100).
This is the **v2 challenger** entry: one 1024×1024 PNG that sums up
Saturday 21 November 2026's world news — a maroon broadsheet masthead,
one dominant hero (Wall Street's slide into correction), four big cards,
and an "ALSO TODAY" ticker with six more stories — 11 stories in total.

Compared with the v1 entry (SCORED, dev rate 0.962664), v2 fixes the
dating: the three Friday-only items that v1 carried via Saturday
re-publication are dropped, the cricket card now uses the stumps score
(486/4, 118 ahead) instead of the tea-time snapshot, and COP31 is
reported honestly as "no deal yet" rather than "failed".

## The 11 stories

### Hero — Wall Street in Correction
Friday's close in New York (reported Saturday in Asia): the S&P 500 fell
3.7% to 6,910 and the Dow lost 949 points to 48,147 — both in correction,
over 10% below their records. The Nasdaq slid 5.3%, erasing its 2026
gains. Asia fell Friday too — Nikkei −5.1%, Kospi −5.2%, Taiex −6.2% —
as Nvidia slid 14% and Anthropic about 9%.
Sources: AJP (Seoul, 21 Nov 2026), Reuters markets, LA Times 20 Nov 2026,
The Times.

### Card 1 — NATO: Every Inch of Poland
Rutte vowed in Warsaw on Saturday that NATO will defend every inch of
Polish territory, a day after three objects — probably two missiles and
a drone — fell in south-east Poland.
Sources: Reuters, Warsaw, 21 Nov 2026 14:03 UTC.

### Card 2 — 'Chapo Isidro' Caught
Mexican troops captured Fausto Isidro Meza Flores, a top-10 FBI
fugitive, in Sinaloa on Friday night; the arrest was announced on
Saturday morning. The US had offered a $5m reward.
Sources: Reuters, AP, CNN, 21 Nov 2026.

### Card 3 — Peru Quake 6.7
Magnitude 6.7 (USGS) hit central Peru at 00:09 UTC near Carhuamayo,
108 km deep. Felt strongly in Lima; no deaths or serious damage so far.
Sources: Reuters 21 Nov 2026, AFP via NAMPA, USGS.

### Card 4 — Rahul's SENA Century
KL Rahul's 136 at Basin Reserve made him the first India opener with a
Test hundred in all four SENA nations. India closed on 486/4, 118 ahead.
Sources: Reuters, ESPNcricinfo, ICC, 21 Nov 2026.

### Also today
- COP31: good deal or no deal — talks in overtime, no text yet
  (Reuters, 21 Nov 2026).
- Timor quake 6.8 strikes the Banda Sea; no tsunami threat
  (Reuters / USGS, 21 Nov 2026, 09:42 UTC).
- Drones hit Russian ship Sparta II in the Gulf of Finland
  (Reuters, Helsinki, 21 Nov 2026).
- Killer-robot rules put off to 2028 after UN talks
  (AP, 21 Nov 2026).
- Gaza aid van strike kills 3; WCK denies link, IDF cites militants
  (Reuters, Jerusalem, 21 Nov 2026).
- Migrant-bail scam lives on after $811m fine (BBC, 21 Nov 2026).

## Render locally

```sh
cd entry-21b
python3 render21b.py        # writes entry.png (1024x1024, < 1 MiB)
sha256sum entry.png         # run twice: the hash must not change
```

Requirements: Python 3 with Pillow, DejaVu fonts
(`/usr/share/fonts/truetype/dejavu/`). The render is fully
deterministic — fixed palette, fixed fonts, no randomness, no clock —
so repeated runs produce byte-identical output.

## Run the entrypoint

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
sha256sum out/entry.png entry.png   # both hashes must match
```

`main.ts` needs no network: it validates the bundled PNG (magic bytes
+ 1 MiB cap), copies it to `MAKEFUN_OUTPUT_DIR` (default `/output`),
reads it back and verifies the copy is byte-identical.

## License

MIT — see `LICENSE`.
