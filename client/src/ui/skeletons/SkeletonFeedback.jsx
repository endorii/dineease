export const SkeletonFeedback = () => {

    return (
        <>
            <tbody >
                <tr className=" animate-pulse bg-white border-b border-gray-300 text-gray-700 w-full">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-[20%]">
                        <div class="rounded-full bg-slate-300 h-7 "></div>
                    </th>
                    <td className="px-6 py-4 w-[20%]">
                        <div class="rounded-full bg-slate-300 h-7 "></div>
                    </td>
                    <td className="px-6 py-4 w-[50%]">
                        <div class="rounded-full bg-slate-300 h-7 w-full"></div>
                    </td>
                    <td className="px-6 py-4 text-right w-[10%]">
                        <div class="rounded-full bg-slate-300 h-7 "></div>
                    </td>
                </tr>
            </tbody>
        </>
    )
}