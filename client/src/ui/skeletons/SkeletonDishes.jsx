export const SkeletonDishes = () => {
    return (
        <>
            <tr className=" animate-pulse bg-white border-b border-gray-300 text-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 w-[30%]">
                    <div class="rounded-full bg-slate-300 h-5"></div>
                </th>
                <td className="px-6 py-4">
                    <div class="rounded-full bg-slate-300 h-5"></div>
                </td>
                <td className="px-6 py-4 w-[5%]">
                    <div class="rounded-full bg-slate-300 h-5"></div>
                </td>
                <td className="px-6 py-4 w-[5%]">
                    <div class="rounded-full bg-slate-300 h-5"></div>
                </td>
                <td className="px-6 py-4 w-[5%]">
                    <div class="rounded-full bg-slate-300 h-5"></div>
                </td>
            </tr>
        </>
    )
}