import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import confetti from 'canvas-confetti';
import './styles.css';
import catImg from './assets/cat.svg';
import mouseDollImg from './assets/mouse-doll.svg';

const CORRECT_ANSWER = 'chinnu';

const copy = {
  introTitle: 'Okay first… sorryyy 😭',
  introPrompt: 'I know I annoyed you… so tap the cat and beat me for it 😭',
  enough: 'Okay okay enoughhh 😭',
  calmLine: 'Okayyy… hope now you’re not angry on me anymore 🥲',
  forgiveButton: 'Yeah, forgiven 🙄',
  surpriseTitle: 'Good 😌',
  surpriseLine: 'Because I have a small surprise for you…',
  showButton: 'Show me 👀',
  questionLead: 'But first…',
  question: 'Who is your fav one? 😌',
  placeholder: 'Type the name…',
  success: 'Hmmmmm… correct answer 😌',
  dollLine1: 'Heyyy cute lil Mickey Mouseee 🐭',
  dollLine2: 'Hiiiiii 😭😂',
  dollLine3: 'Now smile properly 😌',
  dollLine4: 'Navvesaka msg chey ra laddu gaa 😂',
  finalButton: 'Okayyy 😂',
  finishTitle: 'Mission successful 😌',
  finishLine: 'Okay done 😂 now go message Chinnu.'
};

const wrongMessages = [
  'Wrong answer 😭',
  'Excuse me?? Try again.',
  'Think properly madam 🙄',
  'I’m giving you one more chance 😭'
];

const bonks = ['BONK', 'POW', 'BOOP', '😭', 'BONK!!'];

function App() {
  const [step, setStep] = useState(1);
  const [damage, setDamage] = useState(0);
  const [bonk, setBonk] = useState('');
  const [catHit, setCatHit] = useState(false);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [unlocking, setUnlocking] = useState(false);
  const [dollStage, setDollStage] = useState(0);
  const [boxOpened, setBoxOpened] = useState(false);

  const enough = damage >= 5;

  const bgDots = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);

  const handleCatTap = () => {
    const next = Math.min(damage + 1, 7);
    setDamage(next);
    setBonk(bonks[(next - 1) % bonks.length]);
    setCatHit(false);
    requestAnimationFrame(() => setCatHit(true));
    setTimeout(() => setCatHit(false), 420);
  };

  const checkAnswer = () => {
    if (answer.trim().toLowerCase() === CORRECT_ANSWER.toLowerCase()) {
      setFeedback(copy.success);
      setUnlocking(true);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => {
        setStep(4);
        setTimeout(() => setBoxOpened(true), 350);
        setTimeout(() => setDollStage(1), 1200);
        setTimeout(() => setDollStage(2), 2300);
        setTimeout(() => setDollStage(3), 3400);
        setTimeout(() => setDollStage(4), 4700);
      }, 850);
    } else {
      const msg = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
      setFeedback(msg);
    }
  };

  return (
    <main className="app-shell">
      <div className="background-decor" aria-hidden="true">
        {bgDots.map((i) => <span key={i} className={`dot dot-${(i % 6) + 1}`} />)}
      </div>

      <section className="card" key={step}>
        {step === 1 && (
          <div className="screen fade-in">
            <p className="eyebrow">Tiny apology mission</p>
            <h1>{copy.introTitle}</h1>
            <p className="lead">{enough ? copy.enough : copy.introPrompt}</p>

            <button className="cat-button" onClick={handleCatTap} aria-label="Tap the cat">
              <div className={`cat-wrap ${catHit ? 'cat-hit' : ''}`}>
                <img src={catImg} alt="Cute cartoon cat" className="cat-img" />
                {bonk && <span className={`bonk-text ${catHit ? 'show' : ''}`}>{bonk}</span>}
              </div>
            </button>

            <div className="damage-pill">Damage taken: {damage}</div>

            {enough && (
              <div className="after-hit pop-in">
                <p className="soft-line">{copy.calmLine}</p>
                <button className="primary-btn" onClick={() => setStep(2)}>{copy.forgiveButton}</button>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="screen fade-in">
            <div className="mystery-box mini-box bobbing" aria-hidden="true">
              <div className="box-lid" />
              <div className="box-body">?</div>
            </div>
            <h1>{copy.surpriseTitle}</h1>
            <p className="lead">{copy.surpriseLine}</p>
            <button className="primary-btn" onClick={() => setStep(3)}>{copy.showButton}</button>
          </div>
        )}

        {step === 3 && (
          <div className="screen fade-in">
            <p className="eyebrow">{copy.questionLead}</p>
            <h1>{copy.question}</h1>
            <div className="question-card">
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                placeholder={copy.placeholder}
                autoFocus
              />
              <button className="primary-btn" onClick={checkAnswer} disabled={unlocking}>
                {unlocking ? 'Unlocking…' : 'Check answer'}
              </button>
              {feedback && <p className={`feedback ${unlocking ? 'success' : ''}`}>{feedback}</p>}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="screen fade-in reveal-screen">
            <p className="eyebrow">Surprise unlocked</p>
            <div className={`gift-stage ${boxOpened ? 'opened' : ''}`}>
              <div className="gift-box">
                <div className="gift-lid"><span className="bow">✦</span></div>
                <div className="gift-body" />
                <img src={mouseDollImg} alt="Cute mouse doll" className="mouse-doll" />
              </div>
              <div className="sparkles" aria-hidden="true">✦ ✧ ✦ ✧ ✦</div>
            </div>

            {dollStage >= 1 && (
              <div className="speech pop-in">
                <p>{copy.dollLine1}</p>
                {dollStage >= 2 && <p>{copy.dollLine2}</p>}
                {dollStage >= 3 && <p>{copy.dollLine3}</p>}
                {dollStage >= 4 && <p className="final-line">{copy.dollLine4}</p>}
              </div>
            )}

            {dollStage >= 4 && (
              <button className="primary-btn pop-in" onClick={() => setStep(5)}>{copy.finalButton}</button>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="screen fade-in final-screen">
            <div className="finish-icon">✦</div>
            <h1>{copy.finishTitle}</h1>
            <p className="lead">{copy.finishLine}</p>
            <button className="secondary-btn" onClick={() => {
              setStep(1); setDamage(0); setBonk(''); setAnswer(''); setFeedback(''); setUnlocking(false); setDollStage(0); setBoxOpened(false);
            }}>Replay 😂</button>
          </div>
        )}
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
