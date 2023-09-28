import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "@/hooks/useAxios";
import { Loading, Error, Alert } from "@/layout";
import "./styles/get-products.scss";

const cols = 10;
export const GetProducts = () => {
	const { data, loading, error, refetch } = useAxios();
	const { isSubmitted, refetch: deleteRefetch } = useAxios();
	const [alert, setAlert] = useState({ state: "", message: "" });
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			await refetch("get", "/products/get-products?name&count&weight&price&silverType&catagory&gem&description&customePrice");
		})();
	}, [isSubmitted]);

	const handleEdit = (product) => {
		navigate("./update-product", { state: product });
	};

	const handleDelete = async (id) => {
		const confirm = window.confirm("هل انت متاكد من حذف هذا المنتج؟");
		if (!confirm) return;

		const { data, loading, error } = await deleteRefetch("delete", `/products/delete-product/${id}`);
		setTimeout(() => setAlert(() => ({ state: "", message: "" })), 2000);

		if (!loading && !error) setAlert(() => ({ state: "success", message: data?.success }));
		if (!loading && error) setAlert(() => ({ state: "error", message: data?.error }));
	};

	if (loading) return <Loading />;
	if (error) return <Error />;

	return (
		<div className="get-products">
			{alert?.state === "success" && <Alert success message={alert.message} />}
			{alert?.state === "error" && <Alert error message={alert.message} />}
			<table className="table">
				<thead className="table-head">
					<tr className="head-title text-primary">
						<th colSpan={cols}>عرض المنتجات</th>
					</tr>
					<tr style={{ background: "rgba(147, 14, 132, 0.5)" }}>
						<th>تحكم</th>
						<th>العدد</th>
						<th>الاسم</th>
						<th>الوزن</th>
						<th>سعر الجرام</th>
						<th>الاجمالي</th>
						<th>نوع الفضه</th>
						<th>القسم</th>
						<th>الحجر</th>
						<th>التفاصيل</th>
					</tr>
				</thead>

				<tbody className="table-body">
					{data?.result?.map(({ _id, name, count, weight, price, silverType, customePrice, catagory, gem, description }, i) => (
						<tr key={i} style={{ background: i % 2 ? "" : "rgba(147, 14, 132, 0.1)", color: +count === 0 ? "gray" : +count <= 5 ? "#d78c1b" : "black" }}>
							<td className="controllers">
								<i className="fa fa-trash-alt" onClick={() => handleDelete(_id)} />
								<i className="fa fa-edit" onClick={() => handleEdit({ _id, name, count, weight, price, silverType, customePrice, catagory, gem, description })} />
							</td>
							<td>{count || "لا يوجد"}</td>
							<td>{name}</td>
							<td>{weight}</td>
							<td>{customePrice?.price || price}</td>
							<td>{Math.ceil((+customePrice?.price || +price) * +weight)}</td>
							<td>{customePrice?.silverType || silverType}</td>
							<td>{catagory}</td>
							<td>{gem}</td>
							<td>{description || "لا يوجد"}</td>
						</tr>
					))}
				</tbody>

				<tfoot className="table-foot">
					<tr className="head-title" style={{ background: "rgba(147, 14, 132, 0.5)" }}>
						<th colSpan={cols}>اجمالي سعر المخزن</th>
					</tr>
					<tr className="head-title">
						<th colSpan={cols} style={{ background: "rgba(147, 14, 132, 0.1)" }}>
							{data?.totalPrice?.toLocaleString() || "00,00"} جنيه مصري
						</th>
					</tr>
				</tfoot>
			</table>
		</div>
	);
};
