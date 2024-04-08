export const SkeletonNeeds = () => {
    return (
        <>
            <tr className=" animate-pulse bg-white border-b border-gray-300 text-gray-700">
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 w-[10%]"
                >
                    <div className="rounded-full bg-slate-300 h-7"></div>
                </th>
                <td className="px-6 py-4 w-[10%]">
                    <div className="rounded-full bg-slate-300 h-7"></div>
                </td>
                <td className="px-6 py-4 w-[30%]">
                    <div className="rounded-full bg-slate-300 h-7"></div>
                </td>
                <td className="px-6 py-4 w-[10%]">
                    <div className="rounded-full bg-slate-300 h-7"></div>
                </td>
                <td className="px-6 py-4 w-[5%]">
                    <div className="rounded-full bg-slate-300 h-7"></div>
                </td>
            </tr>
        </>
    );
};
