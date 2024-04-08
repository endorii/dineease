export const SkeletonEmployees = () => {
    return (
        <>
            <tbody>
                <tr className="animate-pulse bg-white border-b border-gray-300 text-gray-700">
                    <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 w-[15%]"
                    >
                        <div className="rounded-full bg-slate-300 h-5"></div>
                    </th>
                    <td className="px-6 py-4 w-[15%]">
                        <div className="rounded-full bg-slate-300 h-4"></div>
                    </td>
                    <td className="px-6 py-4 w-[10%]">
                        <div className="rounded-full bg-slate-300 h-4"></div>
                    </td>
                    <td className="px-6 py-4 w-[15%]">
                        <div className="rounded-full bg-slate-300 h-4"></div>
                    </td>
                    <td className="px-1 py-4 w-[20%]">
                        <div className="rounded-full bg-slate-300 h-4"></div>
                    </td>
                    <td className="px-2 py-1 text-right w-[10%]">
                        <div className="rounded-full bg-slate-300 h-4"></div>
                    </td>
                    <td className="px-2 py-1 text-left w-[10%]">
                        <div className="rounded-full bg-slate-300 h-4"></div>
                    </td>
                </tr>
            </tbody>
        </>
    );
};
