import s from "./corporate.module.css";

/** Concept geometry, deliberately not presented as a supplier product render. */
export function SpaceScene({
  kind = "home",
  animated = false,
}: {
  kind?: string;
  animated?: boolean;
}) {
  if (kind === "plan")
    return (
      <svg
        viewBox="0 0 600 500"
        className={s.scene}
        role="img"
        aria-label="Concept floor plan with furniture placement"
      >
        <rect width="600" height="500" fill="#e4e6db" />
        <g stroke="#c1c5b4" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${60 + i * 60} 40V460 M40 ${50 + i * 50}H560`} />
          ))}
        </g>
        <path
          d="M100 95H500V405H100Z M325 95V250H500 M100 290H240"
          fill="#f4f0e7"
          stroke="#596c53"
          strokeWidth="8"
        />
        <path
          d="M100 320V380 M360 405H420 M325 180V235"
          stroke="#e4e6db"
          strokeWidth="10"
        />
        <path
          d="M100 320A60 60 0 0 1 160 380H100 M360 405A60 60 0 0 1 420 345V405"
          fill="none"
          stroke="#9ca48d"
          strokeWidth="2"
        />
        <rect x="135" y="135" width="130" height="70" rx="8" fill="#8f9c7d" />
        <path
          d="M145 140V195 M200 140V195 M255 140V195"
          stroke="#5d7154"
          strokeWidth="2"
        />
        <rect x="165" y="225" width="85" height="40" rx="6" fill="#b8916c" />
        <rect x="365" y="125" width="95" height="65" fill="#b8916c" />
        <circle cx="410" cy="214" r="16" fill="#8f9c7d" />
        <circle cx="435" cy="328" r="28" fill="#b8916c" />
        <path
          d="M85 95H60V405H85 M100 425V450H500V425"
          fill="none"
          stroke="#8b7961"
          strokeWidth="2"
        />
        <circle cx="140" cy="255" r="12" fill="#788b64" />
      </svg>
    );
  return (
    <svg
      viewBox="0 0 600 500"
      className={`${s.scene} ${animated ? s.animatedScene : ""}`}
      role="img"
      aria-label={
        kind === "work"
          ? "Concept illustration of a shared workspace"
          : kind === "plan"
            ? "Concept illustration of a furniture layout"
            : "Concept illustration of a furnished room"
      }
    >
      <rect width="600" height="500" fill="#e7dfcf" />
      <circle cx="455" cy="110" r="95" fill="#efe9db" />
      <g className={s.roomLines} fill="none" stroke="#8a907b" strokeWidth="1.2">
        <path d="M65 340 300 460 540 335 300 210Z M65 340V145L300 30 540 145V335 M300 30V210" />
        <path
          d="M65 145 300 265 540 145 M140 302 375 422 M220 260 455 380 M145 380 380 252 M225 422 460 293"
          strokeDasharray="4 7"
        />
      </g>
      <g className={s.roomWalls}>
        <path d="M65 145 300 30V210L65 340Z" fill="#d4d5c4" />
        <path d="M300 30 540 145V335L300 210Z" fill="#eee7d7" />
        <path d="M65 340 300 460 540 335 300 210Z" fill="#ded1b9" />
        <path
          d="M103 160 243 91V215L103 285Z"
          fill="#f2eee1"
          stroke="#aab09b"
          strokeWidth="5"
        />
        <path
          d="M173 125V250 M104 221 244 153"
          stroke="#aab09b"
          strokeWidth="3"
        />
        <path d="M335 106 468 170V243L335 178Z" fill="#b9bca4" />
        <path d="M351 124 447 171V215L351 168Z" fill="#727e65" />
      </g>
      <g className={s.roomFurniture}>
        {kind === "work" ? (
          <>
            <path d="M175 273 315 203 449 271 310 345Z" fill="#a48060" />
            <path
              d="M175 273V285L310 357 449 283V271L310 345Z"
              fill="#705b45"
            />
            <path
              d="M193 286V353 M426 295V355 M310 357V408"
              stroke="#4d5b46"
              strokeWidth="9"
            />
            <path
              d="M139 289 192 315V352L139 326Z M337 353 389 327V364L337 391Z"
              fill="#7b886e"
            />
            <path
              d="M141 272 193 298V324L141 298Z M337 333 389 307V335L337 361Z"
              fill="#596c53"
            />
          </>
        ) : (
          <>
            <path d="M116 294 224 240 333 295 226 350Z" fill="#68775c" />
            <path d="M116 294V337L226 394V350Z" fill="#78846a" />
            <path d="M226 350 333 295V337L226 394Z" fill="#50624d" />
            <path
              d="M116 271 224 217 242 226 133 283V316L116 307Z"
              fill="#89947a"
            />
            <path
              d="M135 295 176 274 220 296 179 318Z M183 271 224 250 267 272 227 294Z"
              fill="#a3ac90"
            />
            <path d="M307 329 386 290 456 324 377 365Z" fill="#b98d68" />
            <path
              d="M307 329V342L377 378 456 336V324L377 365Z"
              fill="#987352"
            />
            <path
              d="M322 350V381 M440 345V376"
              stroke="#6c614b"
              strokeWidth="7"
            />
          </>
        )}
        <path d="M465 271 490 283 512 271 489 260Z" fill="#a77a5c" />
        <path
          d="M465 271 471 309 489 319 507 309 512 271 490 283Z"
          fill="#b98f6c"
        />
        <path
          d="M488 275V214 M489 247Q456 235 466 215Q490 218 489 247 M489 234Q510 210 522 219Q519 241 489 249 M488 223Q472 197 486 183Q500 203 488 223"
          fill="#697b5c"
          stroke="#697b5c"
          strokeWidth="3"
        />
      </g>
      <g stroke="#81765e" strokeWidth="1" fill="none">
        <path d="M70 370 290 483 M66 364 74 376 M286 477 294 489 M329 477 547 362 M325 471 333 483 M543 356 551 368" />
      </g>
    </svg>
  );
}
