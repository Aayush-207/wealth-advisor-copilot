import sys

new_content = '''"use client";
import { useState } from "react";
import Link from "next/link";
import { documents, type Citation } from "@/lib/knowledge";
import Icon from "@/components/Icon";
import EvidenceDrawer from "@/components/EvidenceDrawer";

const categories = [
  "All documents",
  "Taxation",
  "Compliance",
  "Investor protection",
  "Operations",
];

const categoryColors: Record<string, string> = {
  "Taxation": "bg-blue-50 text-blue-700 border-blue-200",
  "Compliance": "bg-purple-50 text-purple-700 border-purple-200",
  "Investor protection": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Operations": "bg-orange-50 text-orange-700 border-orange-200",
  "All documents": "bg-gray-50 text-gray-700 border-gray-200",
};

export default function Library() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All documents");
  const [sort, setSort] = useState("newest");
  const [citation, setCitation] = useState<Citation | null>(null);

  const filtered = documents
    .filter(
      (d) =>
        (filter === "All documents" || d.category === filter) &&
        ${d.title}  
          .toLowerCase()
          .includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.title.localeCompare(b.title)
        : b.date.localeCompare(a.date),
    );

  return (
    <div className="min-h-screen bg-[#f8f7f3] pb-24">
      {/* Header Section */}
      <div className="relative bg-[#232a38] text-white overflow-hidden pb-32 pt-20 px-8 rounded-b-[40px] shadow-xl">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
          <div className="absolute top-12 -left-24 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
          <span className="text-[#a898c5] text-[10px] font-bold tracking-[0.2em] mb-4 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#a898c5] rotate-45 block"></span>
            The India Reference Collection
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-normal mb-6 tracking-tight text-[#fefcf7]">
            Knowledge, with <em className="text-[#c1b1e4] italic">provenance.</em>
          </h1>
          <p className="text-[#b9bec9] max-w-2xl text-lg mb-8 leading-relaxed">
            The original material. The full context. All in one place. Explore official publications, preserved as dated snapshots to inform your next advisory conversation.
          </p>
          
          <a
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all backdrop-blur-md border border-white/10"
            href="/documents/provenance.json"
            download
          >
            <Icon name="download" size={16} />
            Download Source Manifest
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 -mt-16 relative z-20">
        
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-4 mb-10 flex flex-col lg:flex-row gap-6 justify-between items-center border border-gray-100">
          
          <div className="relative w-full lg:w-1/2 flex items-center group">
            <div className="absolute left-4 text-gray-400 group-focus-within:text-purple-600 transition-colors">
              <Icon name="search" size={20} />
            </div>
            <input
              className="w-full bg-gray-50/50 hover:bg-gray-50 focus:bg-white border border-transparent focus:border-purple-200 text-gray-800 text-sm rounded-xl pl-12 pr-10 py-3.5 transition-all outline-none"
              placeholder="Search a title, topic or publisher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="absolute right-4 text-gray-400 hover:text-gray-600"
                onClick={() => setSearch("")}
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar w-full sm:w-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={whitespace-nowrap px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-2 border }
                >
                  {c}
                  {c === "All documents" && (
                    <span className={px-1.5 py-0.5 rounded-full text-[9px] }>
                      {documents.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="h-8 w-px bg-gray-200 hidden sm:block mx-2"></div>
            
            <select
              className="bg-transparent text-gray-600 text-xs font-medium focus:outline-none cursor-pointer hover:text-gray-900 transition-colors"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Sort: Publication Date</option>
              <option value="name">Sort: Title A-Z</option>
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-end mb-6 px-2">
          <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
            {filtered.length} Document{filtered.length === 1 ? "" : "s"} found
          </span>
          <span className="text-[9px] font-bold tracking-[1.5px] text-gray-400 uppercase hidden sm:block">
            Public Reference · Bank Review Pending
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d, i) => {
              const colorClass = categoryColors[d.category] || categoryColors["All documents"];
              return (
                <article
                  key={d.id}
                  className="group bg-white border border-gray-200/60 rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  style={{ animation: adeIn 0.5s ease-out forwards, animationDelay: ${i * 50}ms, opacity: 0 }}
                >
                  {/* Decorative corner accent */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-gray-50 rounded-full group-hover:scale-150 transition-transform duration-500 z-0"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-5">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-purple-600 group-hover:bg-purple-50 transition-colors">
                        <Icon name="file" size={20} />
                      </div>
                      <span className={px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border }>
                        {d.category}
                      </span>
                    </div>
                    
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                      {d.issuer}
                    </span>
                    
                    <h2 className="text-xl font-serif text-gray-900 mb-3 leading-snug group-hover:text-[#6356a4] transition-colors">
                      <button
                        className="text-left focus:outline-none"
                        onClick={() =>
                          setCitation({
                            documentId: d.id,
                            page: 1,
                            section: "Document overview",
                            summary: d.summary,
                          })
                        }
                      >
                        {d.shortTitle}
                      </button>
                    </h2>
                    
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {d.summary}
                    </p>
                    
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-semibold text-xs">{d.date}</span>
                        <span className="text-gray-400 text-[10px] uppercase tracking-wider mt-0.5">{d.pages} pages · PDF</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setCitation({
                              documentId: d.id,
                              page: 1,
                              section: "Document overview",
                              summary: d.summary,
                            })
                          }
                          className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-[#6356a4] hover:text-white transition-colors"
                          title="Read Reference"
                        >
                          <Icon name="arrow" size={14} />
                        </button>
                        <a
                          href={d.file}
                          download
                          className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                          title={Download }
                        >
                          <Icon name="download" size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
              <Icon name="search" size={32} />
            </div>
            <h3 className="text-2xl font-serif text-gray-800 mb-2">No documents found</h3>
            <p className="text-gray-500 mb-6 max-w-md">We couldn't find any documents matching your search or filter criteria. Try adjusting them.</p>
            <button
              className="bg-[#232a38] hover:bg-[#343b4a] text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-colors"
              onClick={() => {
                setSearch("");
                setFilter("All documents");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Footer Disclaimer */}
      <div className="max-w-4xl mx-auto mt-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 text-gray-400 mb-3">
          <Icon name="shield" size={16} />
        </div>
        <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest font-medium max-w-2xl mx-auto">
          These are public regulatory and tax references, not an approved bank policy set. Historical publications may have later amendments. 
          <Link href="/admin" className="text-gray-500 hover:text-purple-600 ml-1 underline decoration-gray-300 underline-offset-4">Review the collection</Link>.
        </p>
      </div>

      <EvidenceDrawer
        key={citation?.documentId ?? "none"}
        citation={citation}
        onClose={() => setCitation(null)}
      />
      
      <style jsx global>{
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      }</style>
    </div>
  );
}
'''

with open('frontend/src/app/documents/page.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Redesign applied successfully.")
