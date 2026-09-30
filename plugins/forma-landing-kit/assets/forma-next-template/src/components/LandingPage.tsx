"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { brand } from "@/config/brand";
import { features, questions, useCases } from "@/data/content";
import { DemoBoardService, ExampleNoteRepository } from "@/services/DemoBoardService";
import type { Collection, DemoNote } from "@/services/DemoBoardService";

const boardService = new DemoBoardService(new ExampleNoteRepository());
const collections: Collection[] = ["All notes", "Ideas", "References"];

function Mark() {
  return <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true"><path d="M5 26V6h22v6H11v5h12v6H11v3Z" fill="currentColor" /><circle cx="26" cy="26" r="3" fill="currentColor" /></svg>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.classList.add("will-reveal");
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { element.classList.add("is-visible"); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className={className} ref={ref}>{children}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header"><a className="wordmark" href="#top" aria-label="Forma home"><Mark />{brand.name}<span className="example-tag">Example</span></a><button className="menu-button" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button><nav id="navigation" className={open ? "navigation open" : "navigation"} aria-label="Main"><a href="#features" onClick={() => setOpen(false)}>The details</a><a href="#use-cases" onClick={() => setOpen(false)}>Made for you</a><a href="#pricing" onClick={() => setOpen(false)}>Example plans</a><a href="#workspace" className="nav-cta" onClick={() => setOpen(false)}>Take a look <span aria-hidden="true">↗</span></a></nav></header>;
}

function NoteCard({ note, onOpen }: { note: DemoNote; onOpen: (note: DemoNote) => void }) {
  return <button className={`note-card ${note.color}`} onClick={() => onOpen(note)} aria-label={`Open ${note.title}`}><span className="note-label">{note.label}<span aria-hidden="true">↗</span></span>{note.id === "02" ? <div className="note-art" aria-hidden="true"><i /><i /><i /></div> : null}<strong>{note.title}</strong><p>{note.text}</p><span className="note-bottom">{note.kind}<span aria-hidden="true">···</span></span></button>;
}

function Workspace() {
  const [collection, setCollection] = useState<Collection>("All notes");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<DemoNote | null>(null);
  const notes = boardService.find(collection, query);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!selected) return;
    openerRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); }
    };
    document.addEventListener("keydown", keyHandler);
    return () => { document.removeEventListener("keydown", keyHandler); openerRef.current?.focus(); };
  }, [selected]);
  return <div className="workspace" id="workspace"><div className="workspace-top"><span className="workspace-brand"><Mark />{brand.name}<span className="workspace-divider" />The studio</span><span className="workspace-status"><i />Interactive example</span></div><div className="workspace-body"><aside className="workspace-sidebar"><span className="sidebar-label">Your space</span>{collections.map(item => <button key={item} className={collection === item ? "collection active" : "collection"} onClick={() => setCollection(item)} aria-pressed={collection === item}><span aria-hidden="true">{item === "All notes" ? "⊞" : item === "Ideas" ? "◇" : "▧"}</span>{item}<span className="collection-count">{boardService.find(item, "").length}</span></button>)}<div className="sidebar-project"><span className="sidebar-label">This week</span><span><i />A slower studio</span><span><i />Autumn collection</span></div><div className="sidebar-foot"><span className="avatar">F</span><span>Your example space<small>Made for exploring</small></span></div></aside><div className="workspace-content"><div className="workspace-heading"><div><span className="tiny-label">A little room to think</span><h2>{collection}</h2></div><label className="search"><span className="sr-only">Search example notes</span><span aria-hidden="true">⌕</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Find something…" /></label></div><div className="notes-grid">{notes.map(note => <NoteCard key={note.id} note={note} onOpen={setSelected} />)}</div>{notes.length === 0 ? <div className="empty-state"><h3>No notes match “{query}”</h3><p>Try “studio”, “light”, or “launch”.</p><button onClick={() => { setQuery(""); setCollection("All notes"); }}>Show all notes <span aria-hidden="true">↗</span></button></div> : null}<div className="workspace-caption"><span>{notes.length} {notes.length === 1 ? "piece" : "pieces"} in this collection</span><span>Example content · No account needed</span></div></div></div>{selected ? <div className="note-backdrop" onClick={() => setSelected(null)}><section className={`note-dialog ${selected.color}`} role="dialog" aria-modal="true" aria-labelledby="note-title" onClick={event => event.stopPropagation()}><button ref={closeRef} className="close-note" onClick={() => setSelected(null)} aria-label="Close note">×</button><span className="tiny-label">{selected.label}</span><h2 id="note-title">{selected.title}</h2><p>{selected.text}</p><p className="dialog-caption">A sample note from the fictional Forma workspace.</p></section></div> : null}</div>;
}

function FeatureIllustration({ variant }: { variant: typeof features[number]["variant"] }) {
  if (variant === "collect") return <div className="illustration collect-art" aria-label="Original illustration of collected notes"><div className="floating-note note-a"><span>Captured thought / 01</span><strong>Leave a little room<br />for the unexpected.</strong><div className="line" /><div className="line short" /></div><div className="floating-note note-b"><div className="art-circle" /><span>Shape study / 02</span></div><div className="floating-note note-c"><span>Next up</span><p>○ Write the first page</p><p>○ Make a small prototype</p><p>● Keep what works</p></div></div>;
  if (variant === "organize") return <div className="illustration organize-art" aria-label="Original illustration of project collections"><div className="collection-stack"><span className="tiny-label">A place for every thread</span><div className="stack-row"><span>◇</span><strong>Things to explore</strong><small>04 pieces</small></div><div className="stack-row"><span>▧</span><strong>The visual direction</strong><small>06 pieces</small></div><div className="stack-row"><span>↗</span><strong>Ready to begin</strong><small>03 pieces</small></div></div><span className="floating-label">Everything in its own time.</span></div>;
  return <div className="illustration plan-art" aria-label="Original illustration of a project plan"><div className="plan-sheet"><span className="tiny-label">Project / Autumn collection</span><h3>One step at a time.</h3><p>Make something small.<br />Make it with care.</p>{["Gather the references", "Find the direction", "Build the first version"].map((step, index) => <div className="plan-step" key={step}><span>{index < 2 ? "✓" : "3"}</span>{step}<small>{index < 2 ? "Done" : "Up next"}</small></div>)}</div></div>;
}

function Pricing() {
  const [annual, setAnnual] = useState(false);
  return <section className="pricing-section section" id="pricing"><Reveal><div className="section-heading"><span className="eyebrow">An example, clearly priced</span><h2>Start small.<br /><em>Make room as you grow.</em></h2><p>Sample plans for the fictional Forma product.<br />No purchase or subscription is available.</p></div><div className="billing-switch" role="group" aria-label="Example billing period"><button aria-pressed={!annual} className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Monthly</button><button aria-pressed={annual} className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Yearly <span>Example</span></button></div><div className="pricing-grid"><article className="price-card"><span className="eyebrow">A personal space</span><h3>Individual</h3><p>For the project you keep coming back to.</p><div className="price">€{annual ? "7" : "9"}<span>/ month</span></div><small>{annual ? "Example: €84 billed yearly" : "Example monthly price"}</small><a href="#workspace" className="button secondary">Explore this example <span>↗</span></a><ul><li>A place for notes and references</li><li>Collections around your projects</li><li>A quieter starting point</li></ul></article><article className="price-card featured"><span className="eyebrow">A shared direction</span><h3>Small studio</h3><p>For a few people making something together.</p><div className="price">€{annual ? "14" : "18"}<span>/ person / month</span></div><small>{annual ? "Example: €168 per person billed yearly" : "Example monthly price per person"}</small><a href="#workspace" className="button">Explore this example <span>↗</span></a><ul><li>Shared notes and project context</li><li>Room for ideas from the whole team</li><li>A clear next step for the work</li></ul></article></div><p className="pricing-note">Illustrative prices and feature descriptions. Replace with your actual offer before launch.</p></Reveal></section>;
}

export function LandingPage() {
  return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><section className="hero" id="top"><div className="hero-orbit" aria-hidden="true" /><div className="hero-copy"><span className="eyebrow"><i />A place for the work in progress</span><h1>{brand.headline[0]}<br /><em>{brand.headline[1]}</em></h1><p>{brand.description}</p><a href="#workspace" className="button">{brand.cta}<span aria-hidden="true">↗</span></a><div className="hero-caption">A fictional notes app. A real starting point for your site.</div></div><Reveal className="workspace-wrap"><Workspace /></Reveal><div className="hero-bottom"><span>Gather a thought.</span><span aria-hidden="true">✳</span><span>Give it a little space.</span><span aria-hidden="true">✳</span><span>Make something of it.</span></div></section><section className="intro section" id="features"><Reveal><span className="eyebrow">Less scattered. More considered.</span><h2>Good work starts<br />with a little <em>headspace.</em></h2><p>A note here. A reference there. One small next step.<br />A place to see the pieces, and what they could become.</p></Reveal></section><div className="feature-sections">{features.map((feature, index) => <section className={`feature-section section ${index % 2 ? "reverse" : ""}`} key={feature.number}><Reveal className="feature-layout"><div className="feature-copy"><span className="feature-index">{feature.number} / {feature.label}</span><h2>{feature.title}</h2><p>{feature.description}</p><a href="#workspace" className="text-link">Try the workspace <span aria-hidden="true">↗</span></a></div><FeatureIllustration variant={feature.variant} /></Reveal></section>)}</div><section className="statement section"><Reveal><span className="eyebrow">A small design philosophy</span><p>“Keep the useful things close.<br /><em>Let the rest fall quiet.</em>”</p><span className="statement-credit">The idea behind the Forma example</span></Reveal></section><section className="use-cases section" id="use-cases"><Reveal><div className="section-heading"><span className="eyebrow">Whatever you are making</span><h2>Find your kind of <em>space.</em></h2></div><div className="use-case-grid">{useCases.map(item => <article key={item.title}><span className="use-case-symbol" aria-hidden="true">{item.symbol}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></Reveal></section><Pricing /><section className="faq-section section" id="faq"><Reveal className="faq-layout"><div><span className="eyebrow">A few useful answers</span><h2>Before you<br /><em>make it yours.</em></h2><p>This is a working website template<br />with a fictional example brand.</p></div><div className="faq-list">{questions.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></Reveal></section><section className="final-cta section"><Reveal><span className="eyebrow">Your next idea belongs somewhere</span><h2>Make a little room.<br /><em>See what happens.</em></h2><a href="#workspace" className="button">Explore the example <span aria-hidden="true">↗</span></a></Reveal></section></main><footer className="footer"><div className="footer-top"><div><a className="wordmark" href="#top"><Mark />{brand.name}</a><p>A little room for what comes next.</p></div><nav aria-label="Footer"><a href="#features">The details</a><a href="#pricing">Example plans</a><a href="#faq">About this template</a><a href="#workspace">Try the example ↗</a></nav></div><div className="footer-meta"><span>{brand.demoNotice}</span><a href="#top">Back to the top ↑</a></div><div className="footer-word" aria-hidden="true">forma.</div></footer></>;
}
