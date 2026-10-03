"use client";
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
  "Taxation": "border-t-blue-500 text-blue-700 bg-blue-50",
  "Compliance": "border-t-purple-500 text-purple-700 bg-purple-50",
  "Investor protection": "border-t-emerald-500 text-emerald-700 bg-emerald-50",
  "Operations": "border-t-amber-500 text-amber-700 bg-amber-50",
  "All documents": "border-t-gray-500 text-gray-700 bg-gray-50",
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
        `${d.title} ${d.issuer} ${d.summary}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.title.localeCompare(b.title)
        : b.date.localeCompare(a.date),
    );

  return (
    <div className="min-h-screen bg-[#f8f7f3] pb-24 font-sans">
      
      {/* Professional Hero Banner */}
      <div className="bg-[#232a38] pt-16 pb-28 px-8 border-b border-[#303847]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#303847] rounded flex items-center justify-center text-[#c1b1e4]">
                <Icon name="book" size={20} />
              </div>
              <span className="text-[#a3a9b4] text-[10px] font-bold tracking-[0.15em] uppercase">
                The India Reference Collection
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-normal leading-tight mb-4 tracking-tight">
              Open the source. <br />
              <em className="text-[#c1b1e4] italic">See the whole picture.</em>
            </h1>
            <p className="text-[#b9bec9] text-sm leading-relaxed">
              Official publications, preserved as dated snapshots. Review applicability before client use. The original material. The full context. All in one place.
            </p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="bg-[#1c222e] border border-[#303847] px-6 py-4 rounded text-right">
              <div className="text-3xl font-serif text-white mb-1">{documents.length}</div>
              <div className="text-[#8f97a8] text-[9px] uppercase tracking-widest font-bold">Reference PDFs</div>
            </div>
            
            <a
              href="/documents/provenance.json"
              download
              className="flex items-center gap-2 text-[#c1b1e4] hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider py-2"
            >
              <Icon name="download" size={14} />
              Download Source Manifest
            </a>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 -mt-12 relative z-10 mb-12">
        <div className="bg-white rounded-lg shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-200 p-2 flex flex-col lg:flex-row justify-between items-stretch lg:items-center">
          
          <div className="relative flex-1 flex items-center px-4 py-2 border-b lg:border-b-0 lg:border-r border-gray-100">
            <div className="text-gray-400 mr-3">
              <Icon name="search" size={18} />
            </div>
            <input
              className="w-full bg-transparent border-none text-gray-800 text-sm focus:outline-none focus:ring-0 placeholder-gray-400 py-2"
              placeholder="Search a title, topic or publisher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="text-gray-400 hover:text-gray-600 p-1"
                onClick={() => setSearch("")}
              >
                <Icon name="close" size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 lg:gap-4 p-2 lg:px-6">
            <div className="flex gap-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded text-[11px] font-semibold tracking-wide uppercase transition-all ${
                    filter === c 
                      ? "bg-[#232a38] text-white" 
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            
            <div className="h-6 w-px bg-gray-200 hidden sm:block mx-1"></div>
            
            <div className="flex items-center text-xs font-medium text-gray-500 w-full sm:w-auto justify-between sm:justify-start px-2 sm:px-0">
              <span className="mr-2 uppercase tracking-wider text-[10px] font-bold">Sort by</span>
              <select
                className="bg-transparent text-gray-800 font-semibold focus:outline-none cursor-pointer py-1"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Publication Date</option>
                <option value="name">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Results Info */}
        <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-2">
          <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
            {filtered.length} Document{filtered.length === 1 ? "" : "s"} found
          </span>
          <span className="text-gray-400 text-[9px] uppercase tracking-[0.15em] font-bold hidden sm:block">
            Public Reference &middot; Bank Review Pending
          </span>
        </div>

        {/* Professional Document Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d) => {
              const categoryTheme = categoryColors[d.category] || categoryColors["All documents"];
              const borderColor = categoryTheme.split(' ')[0]; // Gets the border-t-* class
              const textColor = categoryTheme.split(' ')[1]; // Gets the text-* class
              const bgColor = categoryTheme.split(' ')[2]; // Gets the bg-* class

              return (
                <article
                  key={d.id}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-200 flex flex-col h-full overflow-hidden ${borderColor} border-t-[3px]`}
                >
                  <div className="p-6 flex flex-col flex-grow relative">
                    
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-2 py-1 rounded-sm text-[9px] font-bold uppercase tracking-widest ${bgColor} ${textColor}`}>
                        {d.category}
                      </span>
                      <div className="text-gray-300">
                        <Icon name="file" size={20} />
                      </div>
                    </div>
                    
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 block">
                      {d.issuer}
                    </span>
                    
                    <h2 className="text-lg font-serif text-gray-900 mb-3 leading-snug">
                      <button
                        className="text-left focus:outline-none hover:text-[#6356a4] transition-colors"
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
                    
                    <p className="text-gray-500 text-xs leading-relaxed mb-6 flex-grow line-clamp-3">
                      {d.summary}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-semibold text-xs">{d.date}</span>
                        <span className="text-gray-400 text-[9px] uppercase tracking-wider mt-0.5">{d.pages} pages</span>
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
                          className="flex items-center justify-center w-8 h-8 rounded border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors bg-gray-50"
                          title="Read Reference"
                        >
                          <Icon name="arrow" size={14} />
                        </button>
                        <a
                          href={d.file}
                          download
                          className="flex items-center justify-center w-8 h-8 rounded border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors bg-gray-50"
                          title={`Download ${d.title}`}
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
          <div className="bg-white border border-gray-200 rounded-lg p-16 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
              <Icon name="search" size={28} />
            </div>
            <h3 className="text-xl font-serif text-gray-800 mb-2">No documents found</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-md">Try adjusting your search terms or filter selection to find what you're looking for.</p>
            <button
              className="bg-[#232a38] hover:bg-[#303847] text-white px-5 py-2 rounded text-xs font-semibold tracking-wide uppercase transition-colors"
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
      <div className="max-w-4xl mx-auto mt-16 px-6 text-center">
        <div className="inline-flex items-center justify-center w-8 h-8 bg-[#e8e6df] rounded-full text-gray-500 mb-3">
          <Icon name="shield" size={14} />
        </div>
        <p className="text-[9px] text-gray-500 leading-relaxed uppercase tracking-widest font-bold max-w-2xl mx-auto">
          These are public regulatory and tax references, not an approved bank policy set. Historical publications may have later amendments. 
          <Link href="/admin" className="text-gray-700 hover:text-[#6356a4] ml-1 border-b border-gray-300">Review the collection</Link>.
        </p>
      </div>

      <EvidenceDrawer
        key={citation?.documentId ?? "none"}
        citation={citation}
        onClose={() => setCitation(null)}
      />
      
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
