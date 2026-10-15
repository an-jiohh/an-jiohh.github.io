import Image from "next/image";
import { AUTHOR_FOCUS, AUTHOR_NAME, AUTHOR_NAME_EN, AUTHOR_ROLE } from "@/lib/site";
export default function HeroBio() {
  return <section className="home-hero">
    <div className="hero-intro"><div className="hero-copy"><div className="hero-title-row"><h1>{AUTHOR_NAME_EN}<span className="blue-period">.</span></h1></div><div className="hero-summary"><h2>{AUTHOR_NAME} · {AUTHOR_ROLE}</h2></div></div><Image className="hero-character" src="/logo.png" width={280} height={280} alt="손을 흔드는 지호의 블로그 캐릭터" priority /></div>
    <ul className="hero-facts">{AUTHOR_FOCUS.map(focus => <li key={focus}>{focus}</li>)}</ul>
  </section>;
}
