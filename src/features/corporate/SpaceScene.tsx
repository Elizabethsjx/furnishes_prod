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
        <rect width="600" height="500" fill="#F8E8D3" />
        <g stroke="#EDD8C0" strokeWidth="1">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M${60 + i * 60} 40V460 M40 ${50 + i * 50}H560`} />
          ))}
        </g>
        <path
          d="M100 95H500V405H100Z M325 95V250H500 M100 290H240"
          fill="#FFFCF7"
          stroke="#7E5738"
          strokeWidth="8"
        />
        <path
          d="M100 320V380 M360 405H420 M325 180V235"
          stroke="#F8E8D3"
          strokeWidth="10"
        />
        <path
          d="M100 320A60 60 0 0 1 160 380H100 M360 405A60 60 0 0 1 420 345V405"
          fill="none"
          stroke="#9C7249"
          strokeWidth="2"
        />
        <rect x="135" y="135" width="130" height="70" rx="8" fill="#D9B892" />
        <path
          d="M145 140V195 M200 140V195 M255 140V195"
          stroke="#7E5738"
          strokeWidth="2"
        />
        <rect x="165" y="225" width="85" height="40" rx="6" fill="#DDB88C" />
        <rect x="365" y="125" width="95" height="65" fill="#DDB88C" />
        <circle cx="410" cy="214" r="16" fill="#D9B892" />
        <circle cx="435" cy="328" r="28" fill="#DDB88C" />
        <path
          d="M85 95H60V405H85 M100 425V450H500V425"
          fill="none"
          stroke="#7B5E43"
          strokeWidth="2"
        />
        <circle cx="140" cy="255" r="12" fill="#9C7249" />
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
      <rect width="600" height="500" fill="#F8E8D3" />
      <circle cx="455" cy="110" r="95" fill="#F8DDBE" />
      <g className={s.roomLines} fill="none" stroke="#D9B892" strokeWidth="1.2">
        <path d="M65 340 300 460 540 335 300 210Z M65 340V145L300 30 540 145V335 M300 30V210" />
        <path
          d="M65 145 300 265 540 145 M140 302 375 422 M220 260 455 380 M145 380 380 252 M225 422 460 293"
          strokeDasharray="4 7"
        />
      </g>
      <g className={s.roomWalls}>
        <path d="M65 145 300 30V210L65 340Z" fill="#F6DDC2" />
        <path d="M300 30 540 145V335L300 210Z" fill="#FFFCF7" />
        <path d="M65 340 300 460 540 335 300 210Z" fill="#FAF0E3" />
        <path
          d="M103 160 243 91V215L103 285Z"
          fill="#FFFCF7"
          stroke="#D9B892"
          strokeWidth="5"
        />
        <path
          d="M173 125V250 M104 221 244 153"
          stroke="#D9B892"
          strokeWidth="3"
        />
        <path d="M335 106 468 170V243L335 178Z" fill="#F2D3AE" />
        <path d="M351 124 447 171V215L351 168Z" fill="#C99263" />
      </g>
      <g className={s.roomFurniture}>
        {kind === "work" ? (
          <>
            <path d="M175 273 315 203 449 271 310 345Z" fill="#D9B892" />
            <path
              d="M175 273V285L310 357 449 283V271L310 345Z"
              fill="#C99263"
            />
            <path
              d="M193 286V353 M426 295V355 M310 357V408"
              stroke="#7E5738"
              strokeWidth="9"
            />
            <path
              d="M139 289 192 315V352L139 326Z M337 353 389 327V364L337 391Z"
              fill="#F2AE7E"
            />
            <path
              d="M141 272 193 298V324L141 298Z M337 333 389 307V335L337 361Z"
              fill="#7E5738"
            />
          </>
        ) : (
          <>
            <path d="M116 294 224 240 333 295 226 350Z" fill="#D9B892" />
            <path d="M116 294V337L226 394V350Z" fill="#F6DDC2" />
            <path d="M226 350 333 295V337L226 394Z" fill="#C99263" />
            <path
              d="M116 271 224 217 242 226 133 283V316L116 307Z"
              fill="#F2AE7E"
            />
            <path
              d="M135 295 176 274 220 296 179 318Z M183 271 224 250 267 272 227 294Z"
              fill="#FFFCF7"
            />
            <path d="M307 329 386 290 456 324 377 365Z" fill="#D9B892" />
            <path
              d="M307 329V342L377 378 456 336V324L377 365Z"
              fill="#C99263"
            />
            <path
              d="M322 350V381 M440 345V376"
              stroke="#7B5E43"
              strokeWidth="7"
            />
          </>
        )}
        <path d="M465 271 490 283 512 271 489 260Z" fill="#DDB88C" />
        <path
          d="M465 271 471 309 489 319 507 309 512 271 490 283Z"
          fill="#DDB88C"
        />
        <path
          d="M488 275V214 M489 247Q456 235 466 215Q490 218 489 247 M489 234Q510 210 522 219Q519 241 489 249 M488 223Q472 197 486 183Q500 203 488 223"
          fill="#9C7249"
          stroke="#9C7249"
          strokeWidth="3"
        />
      </g>
      <g stroke="#9C7249" strokeWidth="1" fill="none">
        <path d="M70 370 290 483 M66 364 74 376 M286 477 294 489 M329 477 547 362 M325 471 333 483 M543 356 551 368" />
      </g>
    </svg>
  );
}
