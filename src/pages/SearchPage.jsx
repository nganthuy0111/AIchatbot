import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const mockDocuments = [
  {
    id: 1,
    code: "14/2025/TT-BGDĐT",
    date: "18/07/2025",
    summary:
      "Sửa đổi, bổ sung một số điều của Quy định phòng học bộ môn của cơ sở giáo dục phổ thông ban hành kèm theo Thông tư số 14/2020/TT-BGDĐT ngày 26 tháng 5 năm 2020 của Bộ trưởng Bộ Giáo dục và Đào tạo",
    attachment: true,
    fileUrls: [
      "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/14-bgddt.pdf",
    ],
  },
  {
    id: 2,
    code: "1531/QĐ-TTg",
    date: "15/07/2025",
    summary: "Về việc chuyển Trường Đại học Cần Thơ thành Đại học Cần Thơ",
    attachment: true,
    fileUrls: [
      "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/1531-ttg.signed.pdf",
    ],
  },
  {
    id: 3,
    code: "202/2025/NĐ-CP",
    date: "11/07/2025",
    summary:
      "Quy định chi tiết về điều kiện, trình tự, thủ tục, chương trình giáo dục, việc cấp văn bằng, chứng chỉ thực hiện liên kết giáo dục, giảng dạy chương trình giáo dục tích hợp đối với cơ sở giáo dục mầm non, giáo dục phổ thông công lập của thành phố Hà Nội",
    attachment: true,
    fileUrls: [
      "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/202-cp.signed.pdf",
    ],
  },
  {
    id: 4,
    code: "1485/QĐ-TTg",
    date: "04/07/2025",
    summary:
      "Về việc đổi tên Trường Đại học Công nghiệp Dệt may Hà Nội thành Trường Đại học Công nghiệp và Thương mại Hà Nội",
    attachment: true,
    fileUrls: [
      "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/1485-ttg.signed.pdf",
    ],
  },
  // Dữ liệu mới từ ảnh
  {
    id: 5,
    code: "1483/QĐ-TTg",
    date: "04/07/2025",
    summary:
      "Về việc đổi tên Trường Đại học Kiểm sát Hà Nội thành Trường Đại học Kiểm sát",
    attachment: true,
    fileUrls: [
      "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/1483-ttg.signed.pdf",
    ],
  },
  {
    id: 6,
    code: "171/2025/NĐ-CP",
    date: "30/06/2025",
    summary: "Quy định về đào tạo, bồi dưỡng công chức",
    attachment: true,
    fileUrls: [""],
  },
  {
    id: 7,
    code: "14/2025/TT-BXD",
    date: "30/06/2025",
    summary:
      "Quy định về đào tạo lái xe; bồi dưỡng, kiểm tra, cấp chứng chỉ bồi dưỡng kiến thức pháp luật về giao thông đường bộ",
    attachment: true,
    fileUrls: [
      "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/171nd.signed.pdf",
      "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/14-bxd-kem.pdf",
    ], // 2 tài liệu đính kèm
  },
  {
    id: 8,
    code: "218/2025/QH15",
    date: "26/06/2025",
    summary: "Về phổ cập giáo dục mầm non cho trẻ em từ 3 đến 5 tuổi",
    attachment: true,
    fileUrls: [
      "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/218qh.signed.pdf",
    ],
  },
  {
    id: 9,
    code: "217/2025/QH15",
    date: "26/06/2025",
    summary:
      "Về miễn, hỗ trợ học phí đối với trẻ em mầm non, học sinh phổ thông, người học chương trình giáo dục phổ thông trong cơ sở giáo dục thuộc hệ thống giáo dục quốc dân",
    attachment: true,
    fileUrls: [
      "https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/7/217qh.signed.pdf",
      "",
    ], // 2 tài liệu đính kèm
  },
];

const SearchPage = () => {
  const [year, setYear] = useState("");
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(50);
  const [results, setResults] = useState(mockDocuments);

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock filter
    setResults(
      mockDocuments.filter(
        (doc) =>
          !keyword || doc.summary.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  return (
    <div className="bg-black min-h-screen flex flex-col text-white">
      <Header />
      <main className="flex-1 max-w-5xl mx-auto w-full pt-24 px-4">
        <section className="bg-gray-900 rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400">
            TÌM KIẾM VĂN BẢN
          </h2>
          <form
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
            onSubmit={handleSearch}
          >
            {/* Bỏ filter lĩnh vực và cơ quan ban hành */}
            <div>
              <label className="block text-gray-300 mb-1">Năm ban hành:</label>
              <select
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">-- Tất cả --</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Tìm kiếm:</label>
              <input
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                placeholder="Nhập từ khóa"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">
                Số lượng kết quả:
              </label>
              <input
                type="number"
                className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-white"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                min={1}
                max={100}
              />
            </div>
            <div className="md:col-span-1 flex items-end">
              <button
                type="submit"
                className="bg-green-500 text-black px-8 py-2 rounded-md font-semibold hover:bg-green-600 transition-colors shadow"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </section>
        <section className="bg-gray-900 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400">
            TẤT CẢ VĂN BẢN
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-800 text-gray-300">
                  <th className="py-2 px-4 border-b text-left">Số ký hiệu</th>
                  <th className="py-2 px-4 border-b text-left">
                    Ngày ban hành
                  </th>
                  <th className="py-2 px-4 border-b text-left">Trích yếu</th>
                </tr>
              </thead>
              <tbody>
                {results.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-800">
                    <td className="py-2 px-4 border-b align-top">{doc.code}</td>
                    <td className="py-2 px-4 border-b align-top">{doc.date}</td>
                    <td className="py-2 px-4 border-b align-top">
                      {doc.summary}
                      {doc.attachment &&
                        doc.fileUrls &&
                        doc.fileUrls.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {doc.fileUrls.map((url, idx) => (
                              <a
                                key={idx}
                                href={url || "#"}
                                target={url ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-400 hover:underline text-sm bg-gray-800 px-2 py-1 rounded"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-4 h-4 mr-1 text-red-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828l6.586-6.586M16 5v6a2 2 0 002 2h6"
                                  />
                                </svg>
                                Tài liệu đính kèm
                              </a>
                            ))}
                          </div>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
