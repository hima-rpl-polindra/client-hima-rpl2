import alumniData from "../../src/dataMaster/data.json";
export default function MasterDataAlumni() {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className=" text-black px-8">
        <h1 className="text-center">Master Data Alumni</h1>
        <div className="alumni__table container  mb-8">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg  font-semibold mb-4 text-center">
              Daftar Alumni Teknik Informatika
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-400 divide-y divide-gray-200">
                <thead className="bg-gray-100 mb-4">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-black">
                      No
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-black">
                      Nama Alumni
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-black">
                      Perusahaan
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alumniData.map((alumni, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-center whitespace-nowrap text-black">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3  text-center whitespace-nowrap text-black font-medium">
                        {alumni.nama_alumni}
                      </td>
                      <td className="px-4 py-3  text-center whitespace-nowrap text-black">
                        {alumni.perusahaan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
