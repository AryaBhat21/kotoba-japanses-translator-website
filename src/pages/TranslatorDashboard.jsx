import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TranslatorDashboard() {
  const [japaneseText, setJapaneseText] = useState('桜の花びらが\n静かに舞い落ちる');
  const [englishText, setEnglishText] = useState('Cherry blossom petals\nfall quietly, dancing');
  const [politeness, setPoliteness] = useState(4);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const handleRefine = () => {
    // Simulated Mock API response
    setEnglishText('The cherry blossom petals flutter down in silence...');
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/translations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_text: japaneseText,
        translated_text: englishText,
        politeness_level: politeness,
        tags: ['Draft']
      })
    });
    setSaving(false);
  }

  const handleDocumentUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      const response = await fetch('/api/documents/translate', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) throw new Error('Translation failed');
      
      // Parse returned PDF blob and trigger download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Kotoba_Translated_${file.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert('Error translating document: ' + e.message);
    } finally {
      setUploading(false);
      setFile(null); // Clear file
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-surface font-body text-on-surface selection:bg-primary-fixed">
      {/* Background layer */}
      <div className="fixed inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-multiply" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAFRec3X8-YxUUdJZUf9Qm2roE4KxxURicxaPGWUZlE_cr--scBgYfyzYBvfK38GuE87NpsKOdLWNZ7jSRh2W8bKz4-2ObghAaOgnu6wTT9Nvd3FBmnaNdRFVMBGzWU2WPgNBsDMV2HyHt_-ZdaoPWmCNHDrCNihzCvgzQLJgRFQJiodG-LIIkUFdWWhCmVi262Uj7v_PEXPnoAc7Pk3-hFW6COgHjvRORdq_dXaZJF1Vozw74pga7TOG7N5yeGkJOSRT4pDlKnvFA6')"}}></div>

      {/* Top NavBar */}
      <div className="relative z-10">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-outline-variant/10 px-10 py-3 glass-card">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-4 text-on-surface">
              <div className="size-6 text-[var(--color-primary)]">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h2 className="text-on-surface text-xl font-headline font-bold leading-tight tracking-tight">Kotoba</h2>
            </Link>
            <nav className="flex items-center gap-9">
              <Link to="/translate" className="text-on-surface text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Dashboard</Link>
              <Link to="/library" className="text-on-surface text-sm font-medium hover:text-[var(--color-primary)] transition-colors">Manuscript & Library</Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-6">
            <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-surface-container-high/50 text-on-surface border border-outline-variant/10 hover:bg-primary-fixed-dim transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <Link to="/login" className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[var(--color-primary)]" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2UzG9t9LEdUC4E1Apf_p7mesgQDp70Qmu9e831z5UGChKDwZik4dQeNC5aIhCI-aXUj3ZBHNcUsO_IqRXpjBWl0suAwTEQqvAX8gbjzqzwgJ6KD7hUXSitRwOThv3JMcg1vS5cz5DOK4FFm5E6GV95Qrbuzd97L8m12pf0q4kjY6YagEfwrcylhJ2GEXEebReVp9NhpU2X4Kp7lw7IIIkjlAf8Gj7krZSfYIHeCMwH0VONjAcw9gKEXlULYPVpqIhy65SuJgvhTMI')"}}></Link>
          </div>
        </header>
      </div>

      <main className="relative z-10 flex-1 px-8 md:px-20 py-12 max-w-[1400px] mx-auto w-full">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-on-surface editorial-shadow mb-2">Translator Dashboard</h1>
          <p className="text-on-surface-variant text-lg font-medium tracking-wide">Refining Japanese-English Manuscript Craft</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            {/* Split-View Translator */}
            <div className="glass-card rounded-xl p-8 border border-outline-variant/10 neo-shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-headline text-2xl font-bold text-on-surface">Split-View Engine</h3>
                <div className="flex items-center gap-4">
                  <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant text-sm font-bold text-on-surface hover:bg-surface-container-high transition-all">
                    <span className="material-symbols-outlined text-lg">save</span>
                    {saving ? 'Saving...' : 'Save Draft'}
                  </button>
                  <button onClick={handleRefine} className="glow-button bg-[var(--color-primary)] text-white px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">magic_button</span>
                    Refine
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20 rounded-lg overflow-hidden border border-outline-variant/10">
                {/* Japanese Input */}
                <div className="bg-surface-container-lowest/70 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest">
                    <span className="size-2 rounded-full bg-[var(--color-primary)]"></span>
                    Source: Japanese
                  </div>
                  <textarea 
                    className="w-full h-64 bg-transparent border-none focus:ring-0 text-xl font-headline leading-relaxed resize-none p-0 text-on-surface placeholder:text-outline-variant outline-none" 
                    placeholder="ここに日本語を入力してください..."
                    value={japaneseText}
                    onChange={e => setJapaneseText(e.target.value)}
                  ></textarea>
                </div>
                
                {/* English Output */}
                <div className="bg-surface-container-low/70 p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-on-secondary-container text-xs font-bold uppercase tracking-widest">
                    <span className="size-2 rounded-full bg-secondary-fixed-dim"></span>
                    Target: English
                  </div>
                  <div className="w-full h-64 overflow-y-auto text-xl font-body leading-relaxed text-on-surface">
                    <p className="opacity-100 transition-opacity duration-700 whitespace-pre-wrap">{englishText}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Politeness Meter */}
            <div className="glass-card rounded-xl p-8 border border-outline-variant/10">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-headline text-xl font-bold">Politeness Nuance</h4>
                <span className="px-4 py-1 rounded-full bg-primary-fixed-dim text-[var(--color-primary)] bg-[var(--color-primary)]/20 font-bold text-sm uppercase tracking-wider">
                  {politeness === 1 ? 'Casual (Tameguchi)' : 
                   politeness === 2 ? 'Casual/Polite' :
                   politeness === 3 ? 'Polite (Teineigo)' :
                   politeness === 4 ? 'Formal (Desu/Masu)' : 'Exalted (Sonkeigo)'}
                </span>
              </div>
              <div className="px-4">
                <div className="relative w-full h-3 bg-surface-container-highest rounded-full overflow-visible">
                  <input className="polite-slider absolute inset-0 w-full opacity-0 cursor-pointer z-20" max="5" min="1" type="range" value={politeness} onChange={e => setPoliteness(parseInt(e.target.value))}/>
                  <div className="absolute top-1/2 left-0 h-full bg-[var(--color-primary)] rounded-full transform -translate-y-1/2 z-10 transition-all duration-300" style={{width: `${(politeness/5)*100}%`}}></div>
                </div>
              </div>
            </div>

            {/* Document Translation Upload Zone */}
            <div className="glass-card rounded-xl p-8 border border-outline-variant/10 neo-shadow">
              <div className="mb-6">
                <h3 className="font-headline text-2xl font-bold text-on-surface">Document Translator</h3>
                <p className="text-on-surface-variant text-sm mt-1">Upload a Japanese structural document (.pdf or .docx). We'll generate a fully translated English PDF.</p>
              </div>
              
              <div className="border-2 border-dashed border-primary-fixed-dim/40 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-highest/20 transition-all">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-5xl mb-4">description</span>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" 
                  className="hidden" 
                  id="doc-upload" 
                  onChange={(e) => setFile(e.target.files[0])} 
                />
                <label htmlFor="doc-upload" className="cursor-pointer">
                  {file ? (
                    <span className="font-bold text-on-surface block">{file.name}</span>
                  ) : (
                    <>
                      <span className="font-bold text-on-surface block hover:text-[var(--color-primary)] transition-colors">Click to select a document or image</span>
                      <span className="text-xs text-on-surface-variant mt-2 block">Supported: PDF, DOCX, JPG, PNG</span>
                    </>
                  )}
                </label>
              </div>

              {file && (
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={handleDocumentUpload} 
                    disabled={uploading} 
                    className="glow-button bg-[var(--color-primary)] text-white px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg">{uploading ? 'hourglass_top' : 'translate'}</span>
                    {uploading ? 'Translating & Generating PDF...' : 'Convert to English PDF'}
                  </button>
                </div>
              )}
            </div>
          </div>

           {/* Right Side Sidebar */}
           <div className="lg:col-span-4 space-y-10">
            {/* Glossary Flip-Cards Preview */}
            <div className="space-y-6 mt-16">
              <div className="flex items-center justify-between">
                <h4 className="font-headline text-lg font-bold text-on-surface">Daily Vocabulary</h4>
                <Link to="/library" className="text-xs font-bold text-[var(--color-primary)] hover:underline">View All</Link>
              </div>
              <div className="relative h-48 w-full group perspective-1000">
                <div className="relative w-full h-full text-center transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
                  {/* Front */}
                  <div className="absolute inset-0 w-full h-full glass-card rounded-xl flex flex-col items-center justify-center border border-outline-variant/10 [backface-visibility:hidden]">
                    <span className="font-headline text-6xl text-on-surface mb-2">言葉</span>
                    <span className="text-on-surface-variant font-medium text-sm">Kotoba</span>
                  </div>
                  {/* Back */}
                  <div className="absolute inset-0 w-full h-full bg-surface-container-lowest rounded-xl flex flex-col items-center justify-center p-6 border border-primary-fixed-dim [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-on-surface font-headline text-2xl font-bold mb-2">Word / Language</p>
                    <p className="text-on-surface-variant text-sm italic leading-relaxed">"The vessel through which thought becomes expression and intention finds its form."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
