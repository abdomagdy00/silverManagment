import { useEffect, useState } from "react";
import { calenderState } from "@/constants";
import { useAxios } from "@/hooks/useAxios";
import { Table } from "@/components";

export const Today = () => {
	const { data, error, isSubmitted, refetch } = useAxios();
	const [totalSales, setTotalSales] = useState({ sales: 0, buy: 0 });
	const [calender, setCalender] = useState(calenderState.day);

	// Fetch Days Table Data
	useEffect(() => {
		if (!calender) return;
		(async () => await refetch("get", `/sales/get-sales?day=${calender}`))();
	}, [calender]);

	// Get Total Prices For Days Table
	useEffect(() => {
		if (!data) return;

		const _total = data?.orders.map(({ price, weight, count: { buy, sales } }) => {
			return { sales: +price * +weight * +sales, buy: +price * +weight * +buy };
		});

		const total = _total?.reduce(
			(prev, cur) => {
				return { sales: prev.sales + cur.sales, buy: prev.buy + cur.buy };
			},
			{ sales: 0, buy: 0 }
		);
		setTotalSales(() => total);
	}, [data]);

	const tableOptions = {
		headers: ["الاسم", "العدد", "الوزن", "السعر", "الاجمالي", "نوع الفضه", "القسم", "نوع الحجر"],
		footer: ["مشتريات اليوم", "المبيعات اليوم"],
		prices: [totalSales.buy, totalSales.sales],
	};

	return (
		<div className="today-table">
			{isSubmitted && error && <Alert message={error} error />}
			{isSubmitted && !error && data?.success && <Alert message={data.success} success />}

			<h3 className="statistics-title">مبيعات ومشتريات اليوم</h3>

			<label className="calender" htmlFor="calender">
				<input type="date" name="day" id="calender" value={calender} onChange={(e) => setCalender(e.target.value)} />
			</label>

			<Table {...tableOptions}>
				{data
					? data?.orders?.map(({ name, weight, count, price, silverType, catagory, gem }, i) => (
							<tr key={i} style={{ background: i % 2 ? "" : "rgba(147, 14, 132, 0.1)", color: +count === 0 ? "gray" : +count <= 5 ? "#d78c1b" : "black" }}>
								<td style={{ fontWeight: "bold" }}>{name}</td>
								<td>
									<p style={{ color: "green" }}>{+count.buy === 0 ? "0" : `${count.buy}+`}</p>
									<p style={{ color: "red" }}>{+count.sales === 0 ? "0" : `${count.sales}+`}</p>
								</td>
								<td>{weight}</td>
								<td>{price}</td>
								<td>{Math.ceil(+price * +weight)}</td>
								<td>{silverType}</td>
								<td>{catagory}</td>
								<td>{gem}</td>
							</tr>
					  ))
					: null}
			</Table>
		</div>
	);
};
