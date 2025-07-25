import React, { useEffect, useState } from "react";
import { apiChatbotLawClient } from "../api/axios";

const LegalDocumentList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiChatbotLawClient.get("/Legal");
        setData(Array.isArray(res.data) ? res.data : []);
      } catch {
        setError("Failed to load legal clauses.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-black">Legal Clauses</h2>
      {loading ? (
        <div className="text-gray-700">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-4">
          {data.map((chapter) => (
            <div key={chapter.id} className="mb-4">
              <div className="font-bold text-green-700 text-lg mb-2">
                {chapter.title}
              </div>
              {chapter.clauses && chapter.clauses.length > 0 && (
                <div className="ml-4 space-y-2">
                  {chapter.clauses.map((clause) => (
                    <div key={clause.id}>
                      <div className="font-semibold text-black">
                        {clause.title}
                      </div>
                      {clause.clauseItems && clause.clauseItems.length > 0 && (
                        <ul className="ml-4 list-disc text-gray-700">
                          {clause.clauseItems.map((item, idx) => (
                            <li key={item.id || idx}>
                              {typeof item === "object" && item !== null
                                ? item.text || JSON.stringify(item)
                                : item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LegalDocumentList;
