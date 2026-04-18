'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Camera,
  ExternalLink,
  Heart,
  MapPin,
  MessageCircleHeart,
  Music2,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  UtensilsCrossed
} from 'lucide-react';

type Locale = 'pt' | 'ko';

const translations = {
  pt: {
    subname: 'Restaurante e Mercearia Coreana',
    headline: 'Sabores da Coreia, uma experiência para viver',
    institutional:
      'No Saíso, você encontra mais do que comida coreana. Aqui, cada detalhe foi pensado para criar uma experiência que conecta sabores, cultura e bons momentos em um só lugar.',
    kculture:
      'Um espaço para quem ama cultura coreana, encontros especiais e ambientes cheios de personalidade.',
    market:
      'Além da experiência no restaurante, você também encontra itens selecionados da mercearia coreana para levar um pedacinho da Coreia com você.',
    ctaReserve: 'Reservar',
    ctaAddress: 'Ver endereço',
    ctaIfood: 'Pedir no iFood',
    nav: ['Experiência', 'Eventos', 'Galeria', 'Avaliações', 'Links rápidos'],
    welcome: '어서 오세요 · Seja bem-vindo',
    moreThanFood: 'Mais que comida',
    moreCards: ['Restaurante Coreano', 'Mercearia Especial', 'Ambiente Instagramável', 'Experiência Cultural'],
    kTitle: 'K-Culture Experience',
    kTagline: 'Seu novo lugar favorito para viver a vibe coreana.',
    eventsTitle: 'Acontece no Saíso',
    galleryTitle: 'Galeria instagramável',
    galleryTagline: 'Seu próximo story favorito começa aqui.',
    marketTitle: 'Mercado Coreano',
    testimonialsTitle: 'Avaliações e prova social',
    quickLinksTitle: 'Acesse em um clique',
    googleCta: 'Nos avalie no Google',
    footerText: 'Saíso é encontro, cultura e sabor em uma experiência coreana contemporânea.'
  },
  ko: {
    subname: '한식 레스토랑 & 마켓',
    headline: '한국의 맛, 특별한 경험',
    institutional:
      '사이소는 단순한 한식당이 아닙니다. 음식, 문화, 분위기가 어우러진 특별한 공간을 제공합니다.',
    kculture: '한국 문화를 사랑하는 사람들을 위한 감각적인 공간.',
    market: '레스토랑 경험뿐 아니라 다양한 한국 마켓 상품도 함께 만나보세요.',
    ctaReserve: '예약하기',
    ctaAddress: '주소 보기',
    ctaIfood: 'iFood 주문하기',
    nav: ['경험', '이벤트', '갤러리', '리뷰', '빠른 링크'],
    welcome: '어서 오세요 · 환영합니다',
    moreThanFood: '음식 그 이상',
    moreCards: ['한식 레스토랑', '프리미엄 마켓', '인스타그래머블 공간', '문화 체험'],
    kTitle: 'K-Culture Experience',
    kTagline: '한국 감성을 즐기는 당신을 위한 새로운 아지트.',
    eventsTitle: '사이소 이벤트',
    galleryTitle: '인스타그래머블 갤러리',
    galleryTagline: '당신의 다음 스토리는 여기에서 시작됩니다.',
    marketTitle: '코리안 마켓',
    testimonialsTitle: '리뷰 & 소셜 프루프',
    quickLinksTitle: '바로가기',
    googleCta: 'Google 리뷰 남기기',
    footerText: '사이소는 맛과 문화, 그리고 특별한 순간이 만나는 공간입니다.'
  }
} as const;

const quickLinks = [
  { href: '#cardapio', labelPt: 'Cardápio', labelKo: '메뉴', subtitlePt: 'Acesse o sistema externo', subtitleKo: '외부 메뉴 보기' },
  { href: '#reserva', labelPt: 'Faça sua reserva', labelKo: '예약하기', subtitlePt: 'Garanta seu lugar', subtitleKo: '자리 예약하기' },
  { href: '#ifood', labelPt: 'Peça no iFood', labelKo: 'iFood 주문', subtitlePt: 'Peça com praticidade', subtitleKo: '편하게 주문하기' },
  { href: '#instagram', labelPt: 'Instagram', labelKo: '인스타그램', subtitlePt: 'Veja novidades diárias', subtitleKo: '매일 업데이트' },
  { href: '#google', labelPt: 'Nos avalie no Google', labelKo: 'Google 리뷰', subtitlePt: 'Compartilhe sua experiência', subtitleKo: '경험을 공유해 주세요' },
  { href: '#endereco', labelPt: 'Endereço', labelKo: '주소', subtitlePt: 'Como chegar ao Saíso', subtitleKo: '사이소 오시는 길' }
];

const events = [
  { badge: 'Em breve', titlePt: 'Noite temática K-Vibe', titleKo: 'K-Vibe 테마 나이트', date: '26/04', descPt: 'Playlist especial, clima vibrante e experiências para compartilhar.', descKo: '특별한 플레이리스트와 감각적인 분위기.' },
  { badge: 'Em breve', titlePt: 'Encontro de fãs', titleKo: '팬 모임', date: '03/05', descPt: 'Um espaço para conexões e bons momentos entre apaixonados por cultura coreana.', descKo: '한국 문화를 사랑하는 사람들의 특별한 만남.' },
  { badge: 'Em breve', titlePt: 'Experiência sazonal', titleKo: '시즌 스페셜', date: '17/05', descPt: 'Ações especiais no salão e no mercado para viver novas descobertas.', descKo: '레스토랑과 마켓에서 즐기는 시즌 한정 경험.' }
];

const testimonials = [
  { name: 'Marina L.', textPt: 'Ambiente lindo, atendimento incrível e uma experiência que dá vontade de voltar toda semana.', textKo: '분위기도 좋고 서비스도 훌륭해서 자주 오고 싶어요.' },
  { name: 'Rafael K.', textPt: 'O Saíso virou nosso ponto de encontro. Perfeito para fotos e para curtir com amigos.', textKo: '사진도 예쁘게 나오고 친구들과 즐기기 좋은 공간이에요.' },
  { name: 'Jisoo P.', textPt: 'A combinação de restaurante e mercearia é maravilhosa. Tudo com identidade e cuidado.', textKo: '레스토랑과 마켓을 함께 즐길 수 있어 정말 만족스러워요.' }
];

export default function LandingPage() {
  const [locale, setLocale] = useState<Locale>('pt');
  const t = translations[locale];

  const kBlocks = useMemo(
    () => [
      { icon: Camera, pt: 'Espaços para fotos', ko: '포토 스팟' },
      { icon: Music2, pt: 'Atmosfera pop coreana', ko: 'K-POP 감성' },
      { icon: Heart, pt: 'Encontros memoráveis', ko: '특별한 만남' },
      { icon: Sparkles, pt: 'Design urbano premium', ko: '프리미엄 무드' }
    ],
    []
  );

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="section-wrap flex items-center justify-between py-4">
          <div>
            <p className="text-lg font-bold text-saisoDark">Saíso Korean Food Market</p>
            <p className="text-xs text-slate-500">{t.subname}</p>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-700 lg:flex">
            {t.nav.map((item) => (
              <a className="transition hover:text-saisoBlue" href="#" key={item}>
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${locale === 'pt' ? 'bg-saisoBlue text-white' : 'bg-slate-100 text-slate-700'}`}
              onClick={() => setLocale('pt')}
              type="button"
            >
              PT-BR
            </button>
            <button
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${locale === 'ko' ? 'bg-saisoRed text-white' : 'bg-slate-100 text-slate-700'}`}
              onClick={() => setLocale('ko')}
              type="button"
            >
              한국어
            </button>
            <a className="hidden rounded-full bg-saisoBlue px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-600 sm:inline-flex" href="#reserva">
              {t.ctaReserve}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="section-wrap grid gap-8 py-12 md:grid-cols-2 md:py-20" id="reserva">
          <div className="fade-in-up space-y-6">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{t.welcome}</span>
            <h1 className="text-4xl font-bold leading-tight text-saisoDark md:text-5xl">{t.headline}</h1>
            <p className="text-base text-slate-600 md:text-lg">{t.institutional}</p>
            <div className="flex flex-wrap gap-3">
              <a className="rounded-full bg-saisoBlue px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600" href="#reserva">{t.ctaReserve}</a>
              <a className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-saisoBlue hover:text-saisoBlue" href="#endereco">{t.ctaAddress}</a>
              <a className="rounded-full bg-saisoRed px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-500" href="#ifood">{t.ctaIfood}</a>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 shadow-soft">
            <Image alt="Ambiente premium coreano" className="h-full w-full object-cover" height={900} src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80" width={1200} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <p className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">예약 · Reserva | 주소 · Endereço</p>
          </div>
        </section>

        <section className="section-wrap py-12" id="experiencia">
          <h2 className="text-3xl font-bold">{t.moreThanFood}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[UtensilsCrossed, ShoppingBag, Camera, Sparkles].map((Icon, idx) => (
              <article className="rounded-2xl border border-slate-200 p-5 shadow-soft transition hover:-translate-y-1" key={t.moreCards[idx]}>
                <Icon className="mb-4 h-5 w-5 text-saisoBlue" />
                <h3 className="font-semibold">{t.moreCards[idx]}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-14">
          <div className="section-wrap">
            <h2 className="text-3xl font-bold">{t.kTitle}</h2>
            <p className="mt-3 max-w-3xl text-slate-600">{t.kculture} {t.kTagline}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kBlocks.map(({ icon: Icon, pt, ko }) => (
                <div className="rounded-2xl bg-white p-5 shadow-soft" key={pt}>
                  <Icon className="h-5 w-5 text-saisoRed" />
                  <p className="mt-3 font-semibold">{locale === 'pt' ? pt : ko}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap py-14" id="eventos">
          <h2 className="text-3xl font-bold">{t.eventsTitle}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {events.map((event) => (
              <article className="rounded-2xl border border-slate-200 p-5 shadow-soft" key={event.titlePt}>
                <span className="rounded-full bg-saisoBlue/10 px-3 py-1 text-xs font-semibold text-saisoBlue">{event.badge}</span>
                <h3 className="mt-4 font-semibold">{locale === 'pt' ? event.titlePt : event.titleKo}</h3>
                <p className="mt-2 text-sm text-slate-500">{event.date}</p>
                <p className="mt-3 text-sm text-slate-600">{locale === 'pt' ? event.descPt : event.descKo}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 py-14" id="galeria">
          <div className="section-wrap">
            <h2 className="text-3xl font-bold">{t.galleryTitle}</h2>
            <p className="mt-3 text-slate-600">{t.galleryTagline}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                'photo-1473091534298-04dcbce3278c',
                'photo-1517248135467-4c7edcad34c4',
                'photo-1498654896293-37aacf113fd9',
                'photo-1552566626-52f8b828add9',
                'photo-1528605248644-14dd04022da1',
                'photo-1466978913421-dad2ebd01d17',
                'photo-1504674900247-0877df9cc836',
                'photo-1555396273-367ea4eb4db5'
              ].map((id) => (
                <div className="relative h-40 overflow-hidden rounded-2xl" key={id}>
                  <Image alt="Saíso experience" className="h-full w-full object-cover transition duration-300 hover:scale-105" fill sizes="(max-width:768px) 50vw, 25vw" src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap py-14" id="endereco">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
            <h2 className="text-3xl font-bold">{t.marketTitle}</h2>
            <p className="mt-4 max-w-3xl text-slate-600">{t.market}</p>
            <p className="mt-4 text-sm text-slate-500">Snack · Drinks · Ramen · Sweets · Special Finds</p>
            <a className="mt-6 inline-flex rounded-full bg-saisoBlue px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600" href="#endereco">{locale === 'pt' ? 'Visitar o espaço' : '매장 방문하기'}</a>
          </div>
        </section>

        <section className="bg-slate-50 py-14" id="reviews">
          <div className="section-wrap">
            <h2 className="text-3xl font-bold">{t.testimonialsTitle}</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <article className="rounded-2xl bg-white p-5 shadow-soft" key={item.name}>
                  <Star className="h-5 w-5 text-saisoRed" />
                  <p className="mt-4 text-slate-600">“{locale === 'pt' ? item.textPt : item.textKo}”</p>
                  <p className="mt-4 text-sm font-semibold">{item.name}</p>
                </article>
              ))}
            </div>
            <a className="mt-6 inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-saisoRed hover:text-saisoRed" href="#google">{t.googleCta}</a>
          </div>
        </section>

        <section className="section-wrap py-14" id="links">
          <h2 className="text-3xl font-bold">{t.quickLinksTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link) => (
              <a className="group rounded-2xl border border-slate-200 p-5 shadow-soft transition hover:-translate-y-1 hover:border-saisoBlue" href={link.href} key={link.href}>
                <ExternalLink className="h-5 w-5 text-saisoBlue" />
                <p className="mt-4 font-semibold">{locale === 'pt' ? link.labelPt : link.labelKo}</p>
                <p className="text-sm text-slate-500">{locale === 'pt' ? link.subtitlePt : link.subtitleKo}</p>
                <span className="mt-3 inline-flex text-xs font-semibold text-saisoBlue group-hover:underline">{locale === 'pt' ? 'Abrir link' : '링크 열기'}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-10" id="ifood">
        <div className="section-wrap grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold">Saíso Korean Food Market</p>
            <p className="text-sm text-slate-500">{t.subname}</p>
            <p className="mt-3 text-sm text-slate-600">{t.footerText}</p>
          </div>
          <div>
            <p className="font-semibold">Contato</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2"><MessageCircleHeart className="h-4 w-4" /> +55 (11) 99999-0000</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Rua Exemplo, 123 - São Paulo</li>
              <li className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Terça a Domingo</li>
            </ul>
          </div>
          <div className="space-y-2 text-sm">
            <a className="flex items-center gap-2 text-slate-700 hover:text-saisoBlue" href="#reserva"><Store className="h-4 w-4" /> {t.ctaReserve}</a>
            <a className="flex items-center gap-2 text-slate-700 hover:text-saisoBlue" href="#ifood"><ShoppingBag className="h-4 w-4" /> iFood</a>
            <a className="flex items-center gap-2 text-slate-700 hover:text-saisoBlue" href="#instagram"><Camera className="h-4 w-4" /> Instagram</a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-500">© {new Date().getFullYear()} Saíso Korean Food Market. All rights reserved.</p>
      </footer>
    </div>
  );
}
