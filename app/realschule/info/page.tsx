'use client'

import { useState } from 'react'

const TABS = [
  { id: 'grundlagen',    label: 'Gesprächsführung' },
  { id: 'vorbereitung',  label: 'Vorbereitung' },
  { id: 'koerpersprache',label: 'Körpersprache' },
  { id: 'recht',         label: 'Rechtliches' },
  { id: 'schwierig',     label: 'Schwierige Situationen' },
]

// ─── Inhalts-Komponenten ─────────────────────────────────────────────────────

function GespraechsfuehrungTab() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', fontSize: '1.77rem', fontWeight: 600, color: 'var(--c-dark)', margin: '0 0 1rem' }}>
        Gesprächsführung – Grundlagen
      </h2>
      <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
        Ein gutes Elterngespräch beginnt lange vor dem eigentlichen Termin. Die Lehrkraft übernimmt die Gesprächsführung – nicht autoritär, sondern durch klare Struktur und echte Gesprächsbereitschaft.
      </p>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        Die fünf Gesprächsphasen
      </h3>
      <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
        {[
          ['Begrüßung & Ankommen', 'Atmosphäre schaffen, kurzes Small Talk, Danke für das Kommen.'],
          ['Themeneinführung', 'Anlass des Gesprächs klar und wertfrei benennen. Das Kind in den Mittelpunkt stellen.'],
          ['Dialog & Zuhören', 'Elternperspektive aktiv hören. Gesagtes kurz in eigenen Worten wiederholen. Offene Fragen stellen.'],
          ['Ergebnis & Vereinbarungen', 'Konkrete, umsetzbare Schritte festhalten. Wer macht was bis wann?'],
          ['Abschluss', 'Zusammenfassung, Dank, nächster Kontakt oder Termin.'],
        ].map(([title, text]) => (
          <li key={title} style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: 'var(--c-dark)' }}>{title}:</strong>{' '}
            <span style={{ color: 'rgba(0,0,0,0.6)', fontSize: '0.9rem' }}>{text}</span>
          </li>
        ))}
      </ol>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        Aktives Zuhören
      </h3>
      <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: 0 }}>
        Aktives Zuhören bedeutet: Nicht nur hören, was gesagt wird – sondern auch, was dahintersteckt. Geben Sie das Gesagte kurz in eigenen Worten wieder: „Wenn ich Sie richtig verstehe, meinen Sie …" Das gibt Eltern das Gefühl, wirklich gehört zu werden, und schafft Vertrauen.
      </p>
      <InfoBox>
        <strong>Wichtig:</strong> Das Kind steht im Mittelpunkt – nicht die Eltern-Lehrkraft-Beziehung, nicht der Leistungsvergleich. Jede Aussage kann an der Frage gemessen werden: „Was hilft diesem Kind am meisten?"
      </InfoBox>
    </div>
  )
}

function VorbereitungTab() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', fontSize: '1.77rem', fontWeight: 600, color: 'var(--c-dark)', margin: '0 0 1rem' }}>
        Vorbereitung – Der Schlüssel zum erfolgreichen Gespräch
      </h2>
      <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
        Wer gut vorbereitet in ein Gespräch geht, bleibt auch bei Überraschungen handlungsfähig. Vorbereitung bedeutet nicht, alles kontrollieren zu wollen – sondern einen klaren Kompass zu haben.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        1. Ziel des Gesprächs definieren
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 0.75rem' }}>
        Formulieren Sie vor dem Gespräch eine klare Antwort auf: <em>Was soll nach diesem Gespräch für das Kind besser sein?</em> Das Ziel sollte konkret, lösungsorientiert und realistisch sein – kein Erwartungsmanagement für alle Lebenslagen.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        2. Fakten sammeln – ohne Anklage
      </h3>
      <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
        <li>Konkrete Beschreibungen, keine Urteile: „Hat in den letzten 4 Wochen 3 von 5 Hausaufgaben nicht abgegeben" – nicht „ist faul".</li>
        <li>Leistungsdaten des Kindes bereitstellen (nur eigenes Kind, nicht Klassenvergleich).</li>
        <li>Positive Beobachtungen nicht vergessen – das Gespräch soll kein reines Problemgespräch werden.</li>
      </ul>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        3. Setting bewusst wählen
      </h3>
      <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
        <li>Ruhiger, neutraler Raum – kein Lehrpult als Barriere.</li>
        <li>Stühle auf Augenhöhe, keine Hierarchisierung durch Möblierung.</li>
        <li>Ausreichend Zeit einplanen – niemand mag ein Gespräch, das nach 10 Minuten abrupt endet.</li>
        <li>Handy stumm, Tür geschlossen – Zeichen echter Präsenz.</li>
      </ul>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        4. Wann andere hinzuziehen?
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: 0 }}>
        Schulleitung, Beratungslehrkraft oder Schulsozialarbeit sind keine Eskalationsstufen, sondern Ressourcen. Sinnvoll bei: wiederholten Eskalationen, rechtlichen Androhungen, Hinweisen auf Kindeswohlgefährdung oder wenn Sie sich allein überfordert fühlen.
      </p>
      <InfoBox>
        Eine kurze schriftliche Gesprächsnotiz im Nachgang (Datum, Thema, Vereinbarungen) schützt alle Beteiligten – und hilft Ihnen beim nächsten Gespräch.
      </InfoBox>
    </div>
  )
}

function KoerperspracheTab() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', fontSize: '1.77rem', fontWeight: 600, color: 'var(--c-dark)', margin: '0 0 1rem' }}>
        Körpersprache – Lesen und bewusst einsetzen
      </h2>
      <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
        In Elterngesprächen wird viel nonverbal kommuniziert – oft mehr als durch Worte. Wer Körpersignale lesen kann, hat einen entscheidenden Vorteil: Er erkennt früh, wenn das Gespräch in eine ungünstige Richtung dreht.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        Signale, die Öffnung zeigen
      </h3>
      <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
        <li>Blickkontakt halten, nicken, sich leicht vorbeugen</li>
        <li>Offene Armhaltung, entspannte Schultern</li>
        <li>Lebhafte Mimik, zustimmendes „hm" oder „ja"</li>
        <li>Fragen stellen und Sätze zu Ende hören lassen</li>
      </ul>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        Signale, die Abwehr oder Anspannung zeigen
      </h3>
      <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
        <li>Arme verschränken, zurücklehnen, Stuhl wegdrehen</li>
        <li>Blick auf Handy oder zur Seite</li>
        <li>Einsilbige Antworten, flacher werdender Tonfall</li>
        <li>Unterbrechen, lauter werden, Gestikulieren mit steigendem Tempo</li>
      </ul>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        Goldene Regel: Beobachten, nicht deuten
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 0.75rem' }}>
        Verschränkte Arme können Abwehr bedeuten – oder dass die Person friert. Wegschauen kann Desinteresse sein – oder tiefes Nachdenken. Niemals eine einzelne Geste als Beweis nehmen. Immer mehrere Signale zusammen lesen.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        Die eigene Körpersprache
      </h3>
      <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
        <li>Aufrecht sitzen, aber nicht steif – zeigt Präsenz ohne Dominanz.</li>
        <li>Blickkontakt halten, ohne zu starren.</li>
        <li>Hände sichtbar, ruhig – kein Stiftrollen oder Fingertrommeln.</li>
        <li>Sprechtempo bei Anspannung bewusst verlangsamen.</li>
        <li>Nicken zeigt: Ich höre Sie – ohne Zustimmung zu bedeuten.</li>
      </ul>
      <InfoBox>
        Körpersignale interaktiv üben: Das Modul <strong>Körpersignale lesen</strong> ist im Gymnasium-Bereich verfügbar.
      </InfoBox>
    </div>
  )
}

function RechtlichesTab() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', fontSize: '1.77rem', fontWeight: 600, color: 'var(--c-dark)', margin: '0 0 1rem' }}>
        Rechtliches – Was Lehrkräfte wissen müssen
      </h2>
      <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
        Rechtliche Grundkenntnisse schützen Sie – und ermöglichen es Ihnen, souverän zu antworten, wenn Eltern mit Forderungen oder Androhungen ins Gespräch gehen.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        Informationsrecht der Eltern
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 0.75rem' }}>
        Sorgeberechtigte Eltern haben das Recht auf schulische Informationen über ihr Kind (Noten, Beobachtungen, Lernfortschritt). Bei getrennt lebenden Eltern: <em>beide</em> Sorgeberechtigten informieren – aber keine Inhalte aus Einzelgesprächen mit dem anderen Elternteil weitergeben.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        Datenschutz im Gespräch
      </h3>
      <ul style={{ paddingLeft: '1.25rem', margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
        <li>Keine Informationen über andere Schüler (Namen, Noten, Verhalten) – DSGVO schützt alle Betroffenen.</li>
        <li>Gesprächsnotizen sind interne Dokumente, keine öffentlichen Akten – trotzdem sorgfältig und sachlich formulieren.</li>
        <li>Eltern haben Einsicht in die Leistungsdaten <em>ihres</em> Kindes, nicht in Klassen- oder Vergleichsdaten.</li>
      </ul>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        § 8a SGB VIII – Kindeswohlgefährdung
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 0.75rem' }}>
        Lehrkräfte sind verpflichtet, bei <em>gewichtigen Anhaltspunkten</em> für eine Kindeswohlgefährdung tätig zu werden: zunächst interne Gefährdungseinschätzung mit Schulleitung und Beratungslehrkraft, bei Bestätigung Einschaltung des Jugendamts. Die Schweigepflicht wird in diesen Fällen durch die Schutzpflicht überwogen.
      </p>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--c-dark)', margin: '1.5rem 0 0.5rem' }}>
        Wenn Eltern mit Klage drohen
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: 0 }}>
        Ruhe bewahren. Keine Versprechungen unter Druck machen. Klar kommunizieren, was in Ihrem Ermessen liegt und was nicht: „Eine Notenänderung liegt nicht in meinem alleinigen Ermessen – das erkläre ich Ihnen gerne." Gespräch dokumentieren. Schulleitung informieren.
      </p>
      <InfoBox>
        Rechtswissen im Quiz trainieren: Das Modul <strong>Rechtswissen</strong> enthält praxisnahe Fallbeispiele zu Datenschutz, Protokollpflicht und Sorgerecht.
      </InfoBox>
      <p style={{ fontSize: '0.8rem', color: 'rgba(0,0,0,0.4)', lineHeight: 1.5, marginTop: '1.5rem', borderTop: '1px solid var(--c-lightgray)', paddingTop: '1rem', margin: '1.5rem 0 0' }}>
        Hinweis: Regelungen können je nach Bundesland abweichen. Die Angaben in diesem Tool orientieren sich am allgemeinen Schulrecht – bitte prüfen Sie landesspezifische Besonderheiten in Ihrem Bundesland.
      </p>
    </div>
  )
}

function SchwierigeSituationenTab() {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)', fontSize: '1.77rem', fontWeight: 600, color: 'var(--c-dark)', margin: '0 0 1rem' }}>
        Schwierige Situationen – Handlungsoptionen
      </h2>
      <p style={{ fontSize: '0.95rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.7, margin: '0 0 1.25rem' }}>
        Kein Elterngespräch verläuft immer reibungslos. Die folgenden Muster und Formulierungen helfen, auch in herausfordernden Momenten handlungsfähig zu bleiben.
      </p>

      <SituationsBlock title="Aggressive oder vorwurfsvolle Eltern">
        <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
          <li>Ruhe bewahren – kein Gegenangriff, keine Verteidigung.</li>
          <li>Verständnis zeigen, ohne nachzugeben: „Ich höre, dass Sie das sehr belastet."</li>
          <li>Grenzen klar und freundlich setzen: „In diesem Gespräch möchte ich, dass wir respektvoll miteinander umgehen."</li>
          <li>Bei anhaltender Eskalation: Pause vorschlagen oder Gespräch vertagen.</li>
        </ul>
      </SituationsBlock>

      <SituationsBlock title="Weinende oder emotional überforderte Eltern">
        <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
          <li>Mitgefühl zeigen – kurze Pause, Taschentuch anbieten.</li>
          <li>Nicht in die Seelsorgerrolle rutschen: nach angemessener Zeit behutsam zurücklenken.</li>
          <li>Fokus auf das Kind: „Was braucht [Kindname] gerade am meisten?"</li>
          <li>Bei anhaltender Überforderung: Beratungslehrkraft oder Schulsozialarbeit empfehlen.</li>
        </ul>
      </SituationsBlock>

      <SituationsBlock title="Schweigsame oder passive Eltern">
        <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
          <li>Offene Fragen stellen: „Was ist Ihnen bei diesem Gespräch besonders wichtig?"</li>
          <li>Pausen wirklich aushalten – nicht sofort auffüllen.</li>
          <li>Sprachbarriere berücksichtigen: einfache Sätze, visuelle Unterstützung, ggf. Dolmetscherdienst anfragen.</li>
          <li>Keine voreiligen Deutungen: Schweigen kann viele Ursachen haben.</li>
        </ul>
      </SituationsBlock>

      <SituationsBlock title="Übergriffige oder fordernd-kontrollierende Eltern">
        <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)', lineHeight: 1.8 }}>
          <li>Eigene Rolle und Zuständigkeiten klar benennen.</li>
          <li>Forderungen ernst nehmen, ohne sie sofort zu erfüllen: „Ich nehme das mit und werde das prüfen."</li>
          <li>Eigene Grenzen benennen, ohne sich zu entschuldigen.</li>
          <li>Bei Dokumentationsandrohungen oder Klageandrohungen: Schulleitung informieren.</li>
        </ul>
      </SituationsBlock>

      <InfoBox>
        <strong>Deeskalationsformel:</strong> „Ich höre, dass Ihnen das sehr wichtig ist. Lassen Sie uns gemeinsam schauen, was heute für [Kindname] machbar ist." – Verständnis + Fokus auf das Kind + konkreter nächster Schritt.
      </InfoBox>
    </div>
  )
}

// ─── Hilfs-Komponenten ────────────────────────────────────────────────────────

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(15,123,108,0.06)', border: '1px solid rgba(15,123,108,0.15)',
      borderRadius: '8px', padding: '1rem 1.25rem', marginTop: '1.5rem',
    }}>
      <p style={{ fontSize: '0.875rem', color: 'var(--c-dark)', margin: 0, lineHeight: 1.6 }}>
        {children}
      </p>
    </div>
  )
}

function SituationsBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--c-teal)', margin: '0 0 0.5rem' }}>
        {title}
      </h3>
      {children}
    </div>
  )
}

// ─── Haupt-Komponente ─────────────────────────────────────────────────────────

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState('grundlagen')

  return (
    <>
      <header style={{
        background: 'var(--c-header)', padding: '2rem 2rem 2.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <p style={{
          fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--c-teal-light)',
          marginBottom: '0.5rem', marginTop: 0,
        }}>
          Realschule · Info
        </p>
        <h1 style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
          fontWeight: 400, color: '#fff', lineHeight: 1.15, margin: 0,
        }}>
          Grundlagen & Infoseiten
        </h1>
      </header>

      <div style={{
        background: '#fff', borderBottom: '1px solid var(--c-lightgray)',
        padding: '0 2rem',
        display: 'flex', gap: '0', overflowX: 'auto',
      }}>
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.875rem 1.25rem',
                fontSize: '0.875rem', fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--c-teal)' : 'rgba(0,0,0,0.5)',
                background: 'none', border: 'none',
                borderBottom: isActive ? '2px solid var(--c-teal)' : '2px solid transparent',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <main style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
        <div style={{
          background: '#fff', borderRadius: '10px',
          border: '1px solid var(--c-lightgray)',
          padding: '2rem',
        }}>
          {activeTab === 'grundlagen'    && <GespraechsfuehrungTab />}
          {activeTab === 'vorbereitung'  && <VorbereitungTab />}
          {activeTab === 'koerpersprache'&& <KoerperspracheTab />}
          {activeTab === 'recht'         && <RechtlichesTab />}
          {activeTab === 'schwierig'     && <SchwierigeSituationenTab />}
        </div>
      </main>
    </>
  )
}
