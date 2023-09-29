import { useEffect, useState } from "react";
import { calenderState } from "@/constants";
import { useAxios } from "@/hooks/useAxios";
import { Table } from "@/components";

export const Month = () => {
	const { data, error, isSubmitted, refetch } = useAxios();
	const [calender, setCalender] = useState(calenderState.month);

	useEffect(() => {
		(async () => {
			if (!calender) return;
			await refetch("get", `/sales/get-sales?month=${calender}`);
		})();
	}, [calender]);

	const tableOptions = {
		headers: ["الاسم", "العدد", "الوزن", "السعر", "الاجمالي", "نوع الفضه", "القسم", "نوع الحجر"],
		footer: ["مشتريات اليوم", "المبيعات اليوم"],
		prices: [],
	};

	return (
		<div className="month-table">
			<h3 className="statistics-title">مبيعات ومشتريات الشهر</h3>
			<label className="calender" htmlFor="calender">
				<input type="month" name="month" id="calender" value={calender} onChange={(e) => setCalender(e.target.value)} />
			</label>

			<Table {...tableOptions}>
				{data?.length
					? data[0]?.orders?.map(({ name, weight, count, price, silverType, customePrice, catagory, gem }, i) => (
							<tr key={i} style={{ background: i % 2 ? "" : "rgba(147, 14, 132, 0.1)", color: +count === 0 ? "gray" : +count <= 5 ? "#d78c1b" : "black" }}>
								<td style={{ fontWeight: "bold" }}>{name}</td>
								<td>
									<p style={{ color: "green" }}>{+count.buy === 0 ? "0" : `${count.buy}+`}</p>
									<p style={{ color: "red" }}>{+count.sales === 0 ? "0" : `${count.sales}+`}</p>
								</td>
								<td>{weight}</td>
								<td>{customePrice?.price || price}</td>
								<td>{Math.ceil((+customePrice?.price || +price) * +weight)}</td>
								<td>{customePrice?.silverType || silverType}</td>
								<td>{catagory}</td>
								<td>{gem}</td>
							</tr>
					  ))
					: null}
			</Table>
		</div>
	);
};
