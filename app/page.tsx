"use client";

import { useMemo, useState } from "react";
import {
  Critique,
  Idea,
  Script,
  chooseWinningIdea,
  craftScript,
  critiqueScript,
  generateIdeas,
  improveScript,
  killWeakIdeas,
  scoreIdea
} from "../lib/generator";

type RunResult = {
  runId: string;
  time: string;
  allIdeas: Idea[];
  casualties: Idea[];
  survivors: Idea[];
  winner: Idea;
  scriptDraft: Script;
  critiques: Critique[];
  refined: Script;
};

const formatScore = (value: number) => value.toFixed(1);

const severityColor: Record<Critique["severity"], string> = {
  high: "var(--negative)",
  medium: "var(--warning)",
  low: "var(--muted)"
};

export default function Page() {
  const [result, setResult] = useState<RunResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const ideas = generateIdeas();
      const { survivors, casualties } = killWeakIdeas(ideas);
      const winner = chooseWinningIdea(survivors);
      const scriptDraft = craftScript(winner);
      const critiques = critiqueScript(scriptDraft);
      const refined = improveScript(scriptDraft, critiques);

      setResult({
        runId: crypto.randomUUID(),
        time: new Date().toLocaleTimeString(),
        allIdeas: ideas,
        casualties,
        survivors,
        winner,
        scriptDraft,
        critiques,
        refined
      });
      setIsGenerating(false);
    }, 200);
  };

  const underperformancePlan = useMemo(
    () => [
      "If retention dips at second interrupt, swap structure for a confession carousel.",
      "If hook watch-through < 65%, pivot to a POV narrative calling out the viewer's last secret.",
      "Never recycle the same villain archetype twice—rotate between mentor, sibling, lover, therapist.",
      "Catalogue comments for phrases viewers repeat; weaponize the fear they expose in the next hook."
    ],
    []
  );

  return (
    <main>
      <div className="badge">Autonomous attention warfare • Psychology & human behavior</div>
      <section className="section">
        <h1>Agentic YouTube Growth Strategist</h1>
        <p className="tagline">
          This system manufactures psychologically uncomfortable hooks, executes the ruthless kill process, critiques itself without mercy, and adapts before the algorithm has time to punish repetition.
        </p>
        <div style={{ marginTop: "1.8rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? "Interrogating viewers…" : result ? "Generate another operation" : "Launch the operation"}
          </button>
        </div>
      </section>

      {result && (
        <>
          <section className="section">
            <h2>Idea Generation • 5 dark provocations</h2>
            <div className="grid three">
              {result.allIdeas.map((idea) => {
                const killed = result.casualties.some((c) => c.id === idea.id);
                return (
                  <article key={idea.id} className="card" style={{ opacity: killed ? 0.45 : 1 }}>
                    <h3>{killed ? "Eliminated" : "Contender"}</h3>
                    <div>
                      <strong>{idea.title}</strong>
                      <p>{idea.whyStop}</p>
                    </div>
                    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", fontSize: "0.78rem", color: "var(--muted)" }}>
                      <span>Discomfort {formatScore(idea.discomfort)}</span>
                      <span>Curiosity {formatScore(idea.curiosity)}</span>
                      <span>Novelty {formatScore(idea.novelty)}</span>
                      <span>Score {formatScore(scoreIdea(idea))}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="section">
            <h2>Strategic kill • 3 casualties</h2>
            {result.casualties.length === 0 ? (
              <p>All ideas survived. Generate again and aim sharper.</p>
            ) : (
              <ul className="analysis-list">
                {result.casualties.map((idea) => (
                  <li key={idea.id}>
                    <strong>{idea.title}</strong>
                    <span>{idea.hook}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="section">
            <h2>Chosen weapon • emotionally unsafe hook</h2>
            <div className="highlight">
              <p style={{ fontSize: "1.2rem", marginBottom: "0.6rem" }}>{result.winner.hook}</p>
              <p style={{ color: "var(--muted)", marginBottom: "0.4rem" }}>{result.winner.angle}</p>
              <p style={{ color: "var(--muted)" }}>Pattern interrupts engineered:</p>
              <ul style={{ margin: "0.4rem 0 0", paddingLeft: "1.2rem" }}>
                {result.winner.patternInterrupts.map((interrupt, index) => (
                  <li key={index}>{interrupt}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section">
            <h2>Draft script • raw escalation</h2>
            <article className="script-block">
              <h3>Hook (first 3 seconds)</h3>
              <pre>{result.scriptDraft.hook}</pre>
              {result.scriptDraft.beats.map((beat, index) => (
                <div key={index}>
                  <h3>{beat.label}</h3>
                  <pre>{beat.content}</pre>
                </div>
              ))}
              <div>
                <h3>Takeaway</h3>
                <pre>{result.scriptDraft.takeaway}</pre>
              </div>
            </article>
          </section>

          <section className="section">
            <h2>Brutal self-critique</h2>
            <ul className="analysis-list">
              {result.critiques.map((critique, index) => (
                <li key={index} style={{ borderColor: severityColor[critique.severity] }}>
                  <strong style={{ color: severityColor[critique.severity] }}>{critique.severity.toUpperCase()}</strong>
                  <div>
                    <p style={{ margin: 0 }}>{critique.note}</p>
                    <p style={{ margin: "0.2rem 0 0", color: "var(--muted)" }}>{critique.remedy}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h2>Refined script • deploy-ready</h2>
            <article className="script-block">
              <h3>Hook (first 3 seconds)</h3>
              <pre>{result.refined.hook}</pre>
              {result.refined.beats.map((beat, index) => (
                <div key={index}>
                  <h3>{beat.label}</h3>
                  <pre>{beat.content}</pre>
                </div>
              ))}
              <div>
                <h3>Takeaway</h3>
                <pre>{result.refined.takeaway}</pre>
              </div>
            </article>
            <p className="outcome">One strong takeaway secured. Growth beats volume.</p>
          </section>

          <section className="section">
            <h2>Failure protocol • adapt or die</h2>
            <ul className="analysis-list">
              {underperformancePlan.map((item, index) => (
                <li key={index}>
                  <strong>Adaptive move {index + 1}</strong>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </main>
  );
}
