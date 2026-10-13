"use client";

import { useEffect, useState } from "react";
import { Schoolbell } from "next/font/google";

const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
});

const CONTRACT_ADDRESS =
  "4duRRwKufXEsMYDRQM8CHheHA9V4p4kiU5UNaPAGpump";

const UNISWAP_URL =
  `https://app.uniswap.org/swap?chain=base&outputCurrency=${CONTRACT_ADDRESS}`;

type Language = "en" | "zh";

const typewriterLines: Record<Language, string[]> = {
  en: [
    "F*CK nigeria",
    "F*CK lagos life",
    "F*CK dangote",
    "F*CK the refinery",
    "F*CK fuel subsidy",
    "F*CK tinubu",
    "F*CK ODUMODU",
    "F*CK ikebe 300",
    "F*CK steven ndukwu",
    "F*CK the american",
    "F*CK apostle qrome",
    "F*CK vdm",
    "F*CK the IPO",
    "F*CK the ticker",
    "F*CK you",
    "F*CK y'all",
    "F*CK me too.",
  ],
  zh: [
    "去他的尼日利亚",
    "去他的拉各斯生活",
    "去他的丹格特",
    "去他的炼油厂",
    "去他的燃油补贴",
    "去他的蒂努布",
    "去他的 steven ndukwu",
    "去他的那个美国人",
    "去他的 apostle qrome",
    "去他的 vdm",
    "去他的 IPO",
    "去他的 ticker",
    "去你的",
    "去你们所有人",
    "也去他的我自己。",
  ],
};

const copy = {
  en: {
    about: "NOT",
    roadmap: "AFFILIATED",
    tokenomics: "WITH",
    data: "DANGOTE",
    buy: "BUY NOW",
    unofficial: "Just vibes",
    economy: "CAN WE MOON THIS or nah?🌕🚀 MAN'S JUST BORED..",

    rageTitle: "WHAT'S RAGEBAITING YOU NOW?",
    rageText: "",
    ragePlaceholder: "WIZKID",
    rageButton: "F*CK IT",
    share: "SHARE ON X",
    clear: "CLEAR",

    contract: "CONTRACT",
    copy: "COPY",
    copied: "COPIED",

    shareText: (rant: string) =>
      `F*CK ${rant}. What's ragebaiting you now? $DNGT`,
  },

  zh: {
    about: "关于",
    roadmap: "路线图",
    tokenomics: "代币经济",
    data: "真实世界数据",
    whitepaper: "白皮书",
    buy: "立即购买",
    unofficial: "非官方",
    economy: "MEME 经济",

    rageTitle: "现在什么最让你火大？",
    rageText: "IPO 季节让你有点感觉？",
    ragePlaceholder: "WIZKID",
    rageButton: "去他的",
    share: "分享到 X",
    clear: "清除",

    contract: "合约",
    copy: "复制",
    copied: "已复制",

    shareText: (rant: string) =>
      `去他的 ${rant}。现在什么最让你火大？$DNGT`,
  },
};

export default function LaunchPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [copied, setCopied] = useState(false);
  const [rageInput, setRageInput] = useState("");
  const [rageOutput, setRageOutput] = useState("");

  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  const t = copy[language];
  const lines = typewriterLines[language];

  /*
   * ------------------------------------------------------------
   * LANGUAGE
   * ------------------------------------------------------------
   */

  useEffect(() => {
    setLineIndex(0);
    setDisplayedText("");
    setDeleting(false);
    setPaused(false);
  }, [language]);

  /*
   * ------------------------------------------------------------
   * TYPEWRITER
   * ------------------------------------------------------------
   */

  useEffect(() => {
    if (paused) return;

    const current = lines[lineIndex];

    const timer = setTimeout(
      () => {
        if (!deleting) {
          const next = current.slice(
            0,
            displayedText.length + 1,
          );

          setDisplayedText(next);

          if (next === current) {
            setPaused(true);
          }
        } else {
          const next = current.slice(
            0,
            Math.max(0, displayedText.length - 1),
          );

          setDisplayedText(next);

          if (next === "") {
            setDeleting(false);
            setLineIndex(
              (index) => (index + 1) % lines.length,
            );
          }
        }
      },
      deleting ? 85 : 135,
    );

    return () => clearTimeout(timer);
  }, [
    displayedText,
    deleting,
    lineIndex,
    lines,
    paused,
  ]);

  useEffect(() => {
    if (!paused) return;

    const timer = setTimeout(() => {
      setPaused(false);
      setDeleting(true);
    }, 2200);

    return () => clearTimeout(timer);
  }, [paused]);

  /*
   * ------------------------------------------------------------
   * RAGE INPUT
   * ------------------------------------------------------------
   */

  function submitRage() {
    const value = rageInput.trim();

    if (!value) {
      setRageOutput("");
      return;
    }

    setRageOutput(value);
  }

  function clearRage() {
    setRageInput("");
    setRageOutput("");
  }

  function shareRage() {
    const value = rageOutput || rageInput.trim();

    if (!value) return;

    const url =
      `https://twitter.com/intent/tweet?text=` +
      encodeURIComponent(t.shareText(value));

    window.open(
      url,
      "_blank",
      "noopener,noreferrer",
    );
  }

  function handleRageKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      submitRage();
    }
  }

  /*
   * ------------------------------------------------------------
   * COPY CONTRACT
   * ------------------------------------------------------------
   */

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(
        CONTRACT_ADDRESS,
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {}
  }

  return (
    <main
      className={`${schoolbell.className} min-h-screen overflow-hidden bg-black text-white`}
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #000000;
        }

        * {
          box-sizing: border-box;
        }

        ::selection {
          background: rgba(245, 233, 0, 0.22);
          color: #ffffff;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }

          50% {
            transform: translateY(-12px) rotate(2deg);
          }
        }

        .dngt-float {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes cursorBlink {
          0%,
          49% {
            opacity: 1;
          }

          50%,
          100% {
            opacity: 0;
          }
        }

        .typewriter-cursor {
          animation: cursorBlink 0.8s steps(1) infinite;
        }

        @keyframes ragePulse {
          0% {
            transform: scale(1);
          }

          50% {
            transform: scale(0.96) rotate(-1deg);
          }

          100% {
            transform: scale(1);
          }
        }

        .rage-button:active {
          animation: ragePulse 0.12s ease-out;
        }

        .rage-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        .rage-input:focus {
          outline: none;
        }
      `}</style>

      {/* ======================================================
          NAV
      ====================================================== */}

      <nav className="sticky top-4 z-50 mx-auto mt-5 w-[calc(100%-24px)] max-w-6xl rounded-[18px] border border-white/15 bg-white/[0.06] px-3 py-2.5 shadow-[0_18px_60px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:mt-6 sm:w-[calc(100%-32px)] sm:rounded-2xl sm:px-5 sm:py-3 md:px-7">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            aria-label="$DNGT"
            className="shrink-0 text-lg font-black tracking-[-0.08em] text-[#F5E900] transition-opacity hover:opacity-80 sm:text-xl"
          >
            $DNGT
          </a>

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="flex items-center justify-center gap-2 whitespace-nowrap text-[8px] font-black uppercase tracking-[0.04em] text-white/80 sm:gap-3 sm:text-[8px] sm:tracking-[0.16em] md:gap-5">
              <a href="#top" className="transition-colors hover:text-white">
                {t.about}
              </a>
              <a href="#top" className="transition-colors hover:text-white">
                {t.roadmap}
              </a>
              <a href="#top" className="transition-colors hover:text-white">
                {t.tokenomics}
              </a>
              <a href="#top" className="transition-colors hover:text-white">
                {t.data}
              </a>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="flex rounded-lg border border-white/15 bg-white/[0.06] p-0.5">
              <button
                onClick={() => setLanguage("en")}
                className={`flex h-7 min-w-[30px] items-center justify-center rounded-md px-2 text-[8px] font-black transition sm:h-8 sm:min-w-[34px] sm:px-3 sm:text-[9px] ${
                  language === "en"
                    ? "bg-white text-[#7754B2] shadow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => setLanguage("zh")}
                className={`flex h-7 min-w-[30px] items-center justify-center rounded-md px-2 text-[8px] font-black transition sm:h-8 sm:min-w-[34px] sm:px-3 sm:text-[9px] ${
                  language === "zh"
                    ? "bg-white text-[#7754B2] shadow-sm"
                    : "text-white/50 hover:text-white"
                }`}
              >
                中
              </button>
            </div>

            <a
              href={UNISWAP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-white px-3 py-2 text-[8px] font-black text-[#5E449A] shadow-[2px_2px_0_#3F246C] transition hover:-translate-y-0.5 hover:shadow-[2px_3px_0_#3F246C] sm:px-4 sm:text-[9px]"
            >
              {t.buy}
            </a>
          </div>
        </div>
      </nav>

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        id="top"
        className="relative z-10 mx-auto max-w-7xl px-5 pb-32 pt-20 md:px-10 md:pt-28"
      >
        <div className="absolute left-[7%] top-[12%] hidden h-[580px] w-[72%] rotate-[-8deg] rounded-[3rem] border border-white/10 bg-black lg:block" />

        <div className="absolute right-[-4%] top-[18%] hidden h-[500px] w-[40%] rotate-[9deg] rounded-[3rem] border border-white/10 bg-black lg:block" />

        <div className="relative mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.025] shadow-[0_40px_120px_rgba(0,0,0,.55)] backdrop-blur-sm">

            {/* browser header */}

            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-5 py-3 md:px-7">
              <div className="text-[10px] font-black tracking-[-0.04em] text-[#F5E900]">
                $DNGT
              </div>

              <div className="hidden items-center gap-5 text-[7px] font-black uppercase tracking-[0.18em] text-white/50 md:flex">
                <span>{t.about}</span>
                <span>{t.roadmap}</span>
                <span>{t.tokenomics}</span>
                <span>DANGOTE</span>
              </div>

              <a
                href={UNISWAP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-[#6A4AA8] bg-[#7754B2] px-4 py-1.5 text-[8px] font-black shadow-[2px_2px_0_#3F246C]"
              >
                {t.buy}
              </a>
            </div>

            {/* hero content */}

            <div className="relative min-h-[570px] overflow-hidden px-6 pb-12 pt-12 md:px-12">
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-white">
                  <span>{t.unofficial}</span>

                  <span className="h-1 w-1 rounded-full bg-[#F5E900]" />

                  <span className="text-[#F5E900]">
                    no rugging
                  </span>
                </div>

                <h1 className="mt-5 text-[clamp(4rem,14vw,10rem)] font-black leading-[.72] tracking-[-0.1em] text-white">
                  $DNGT
                </h1>

                <div className="mt-4 text-[10px] font-black uppercase tracking-[0.35em] text-white">
                  {t.economy}
                </div>

                {/* typewriter */}

                <div className="mx-auto mt-12 flex min-h-[145px] max-w-5xl items-center justify-center px-2">
                  <div className="text-center text-[clamp(2rem,6vw,5.5rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">
                    {displayedText}

                    <span className="typewriter-cursor ml-1">
                      |
                    </span>
                  </div>
                </div>
              </div>

              {/* mascot */}

              <div className="relative z-20 mx-auto mt-8 flex h-[250px] max-w-md items-end justify-center">
                <div className="dngt-float relative flex h-[220px] w-[260px] items-center justify-center">
                  <img
                    src="/dngt-character.png"
                    alt="DNGT character"
                    className="h-auto w-[260px] object-contain drop-shadow-[10px_10px_0_rgba(255,255,255,.08)]"
                  />
                </div>

                <div className="absolute left-[2%] top-3 rotate-[-8deg] text-[3.8rem] font-black leading-none text-[#F5E900] md:text-[5rem]">
                  $DNGT
                </div>
              </div>

              {/* contract */}

              <div className="relative z-30 mx-auto mt-2 flex max-w-md items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/[0.035] px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,.3)] backdrop-blur-md">
                <div className="min-w-0">
                  <div className="truncate font-mono text-[7px] text-white/60 md:text-[8px]">
                    {CONTRACT_ADDRESS}
                  </div>
                </div>

                <button
                  onClick={copyAddress}
                  className="shrink-0 rounded-md bg-white px-3 py-1.5 text-[8px] font-black text-[#7754B2]"
                >
                  {copied ? t.copied : t.copy}
                </button>
              </div>

              <div className="relative z-30 mx-auto mt-3 flex max-w-md items-center justify-center gap-2 text-center">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F5E900]" />

                <span className="text-[12px] font-black uppercase tracking-[0.22em] text-white">
                  SAME COUNTRY. SAME HEADLINES. DIFFERENT TICKER.
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-[#F5E900]" />
              </div>

              {/* ==================================================
                  RAGEBAIT INPUT
              ================================================== */}

              <div className="relative z-30 mx-auto mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-center shadow-[0_20px_60px_rgba(0,0,0,.25)] backdrop-blur-md">
                <div className="text-[11px] font-black uppercase tracking-[0.22em] text-white">
                  {t.rageTitle}
                </div>

                <div className="mt-2 text-[10px] text-white/40">
                  {t.rageText}
                </div>

                {/* result */}

                {rageOutput && (
                  <div className="mt-6 overflow-hidden rounded-xl border border-[#7754B2]/50 bg-[#7754B2]/10 px-4 py-5">
                    <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/15">
                      DNGT SAYS
                    </div>

                    <div className="mt-2 break-words text-2xl font-black uppercase leading-none tracking-[-0.04em] text-white md:text-4xl">
                      F*CK {rageOutput}
                    </div>

                    <div className="mt-5 flex justify-center gap-2">
                      <button
                        onClick={shareRage}
                        className="rage-button rounded-lg bg-white px-5 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-[#5E449A] shadow-[2px_2px_0_#3F246C] transition hover:-translate-y-0.5"
                      >
                        {t.share}
                      </button>

                      <button
                        onClick={clearRage}
                        className="rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.12em] text-white/60 transition hover:bg-white/10 hover:text-white"
                      >
                        {t.clear}
                      </button>
                    </div>
                  </div>
                )}

                {/* input */}

                <div className="mt-5 flex overflow-hidden rounded-xl border border-white/20 bg-black">
                  <div className="flex items-center pl-4 text-base font-black text-white">
                    F*CK
                  </div>

                  <input
                    value={rageInput}
                    onChange={(event) =>
                      setRageInput(event.target.value)
                    }
                    onKeyDown={handleRageKeyDown}
                    placeholder={t.ragePlaceholder}
                    maxLength={40}
                    className="rage-input min-w-0 flex-1 bg-transparent px-3 py-4 text-base font-black uppercase text-white"
                    type="text"
                    autoComplete="off"
                    spellCheck={false}
                  />

                  <button
                    onClick={submitRage}
                    className="rage-button shrink-0 bg-[#7754B2] px-5 text-[9px] font-black uppercase tracking-[0.1em] text-white shadow-[-2px_0_0_#3F246C] transition hover:bg-[#8866C4]"
                  >
                    {t.rageButton}
                  </button>
                </div>
              </div>



              {/* social circles */}

              <div className="relative z-30 mt-4 flex justify-center gap-2">
                {["𝕏", "◎", "✦", "◈"].map(
                  (icon) => (
                    <a
                      key={icon}
                      href="https://x.com/dngtttt"
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.08] text-sm font-black text-white shadow-[0_8px_24px_rgba(0,0,0,.22)] backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/[0.14]"
                    >
                      {icon}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}